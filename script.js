// Tax calculation functions for FY 2025-26 (Budget 2025)

// Old Tax Regime Tax Slabs (FY 2025-26) - Unchanged
const oldTaxSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 0.05 },
    { min: 500000, max: 1000000, rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 }
];

// New Tax Regime Tax Slabs (FY 2025-26) - Updated with Budget 2025
const newTaxSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 0.05 },
    { min: 700000, max: 1000000, rate: 0.10 },
    { min: 1000000, max: 1200000, rate: 0.15 },
    { min: 1200000, max: 1500000, rate: 0.20 },
    { min: 1500000, max: Infinity, rate: 0.30 }
];

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function calculateIncomeTax(taxableIncome, taxSlabs) {
    let tax = 0;
    
    for (let slab of taxSlabs) {
        if (taxableIncome > slab.min) {
            const taxableAmountInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
            tax += taxableAmountInSlab * slab.rate;
        }
    }
    
    return tax;
}

// Marginal Relief under Section 87A (Budget 2025)
function applyMarginalRelief(taxableIncome, calculatedTax, isNewRegime = false) {
    if (isNewRegime) {
        // Budget 2025: Marginal relief for income between ₹12-12.75 lakh
        if (taxableIncome > 1200000 && taxableIncome <= 1275000) {
            const excessAmount = taxableIncome - 1200000;
            const marginalReliefTax = excessAmount; // Tax cannot exceed the excess amount
            return Math.min(calculatedTax, marginalReliefTax);
        }
    } else {
        // Old regime: Existing marginal relief for income up to ₹5 lakh
        if (taxableIncome > 250000 && taxableIncome <= 500000) {
            const excessAmount = taxableIncome - 250000;
            const marginalReliefTax = excessAmount; // Tax cannot exceed the excess amount
            return Math.min(calculatedTax, marginalReliefTax);
        }
    }
    
    return calculatedTax;
}

function calculateHRAExemption(salary, hra, rentPaid) {
    if (hra === 0 || rentPaid === 0) return 0;
    
    const basicSalary = salary * 0.5; // Assuming basic is 50% of salary
    const hraExemption = Math.min(
        hra,
        rentPaid - (basicSalary * 0.1),
        basicSalary * 0.5 // Assuming non-metro city (50% of basic)
    );
    
    return Math.max(0, hraExemption);
}

function calculateOldRegimeTax(inputs) {
    const {
        annualSalary,
        hra,
        rentPaid,
        providentFund,
        lifeInsurance,
        elss,
        homeLoanInterest,
        medicalInsurance,
        educationLoan,
        nps
    } = inputs;

    // Calculate HRA exemption
    const hraExemption = calculateHRAExemption(annualSalary, hra, rentPaid);
    
    // Standard deduction
    const standardDeduction = 50000;
    
    // 80C deductions (max 1.5 lakh)
    const section80C = Math.min(150000, providentFund + lifeInsurance + elss);
    
    // Other deductions
    const section80D = Math.min(25000, medicalInsurance); // Health insurance
    const section24 = Math.min(200000, homeLoanInterest); // Home loan interest
    const sectionEducationLoan = educationLoan; // Education loan interest (no limit)
    const section80CCD1B = Math.min(50000, nps); // NPS additional deduction
    
    const totalDeductions = standardDeduction + hraExemption + section80C + 
                           section80D + section24 + sectionEducationLoan + section80CCD1B;
    
    const taxableIncome = Math.max(0, annualSalary - totalDeductions);
    let incomeTax = calculateIncomeTax(taxableIncome, oldTaxSlabs);
    
    // Apply marginal relief for old regime
    incomeTax = applyMarginalRelief(taxableIncome, incomeTax, false);
    
    const cess = incomeTax * 0.04; // 4% cess
    const totalTax = incomeTax + cess;
    const netIncome = annualSalary - totalTax;
    
    return {
        grossIncome: annualSalary,
        totalDeductions,
        taxableIncome,
        incomeTax,
        cess,
        totalTax,
        netIncome
    };
}

function calculateNewRegimeTax(inputs) {
    const { 
        annualSalary,
        hra,
        rentPaid,
        providentFund,
        medicalInsurance,
        nps 
    } = inputs;
    
    // Standard deduction in new regime (FY 2025-26)
    const standardDeduction = 75000;
    
    // New regime deductions for FY 2025-26 (Budget 2025)
    let allowedDeductions = standardDeduction;
    
    // Employer's contribution to EPF is not taxable (this is automatic)
    // Employee PF contribution is not allowed as deduction in new regime
    
    // Family pension deduction (if applicable) - up to ₹15,000 or 1/3rd of pension
    // This is typically not applicable for salaried employees
    
    // Leave Travel Allowance (LTA) exemption - for actual travel
    // This is typically handled by employer and not counted in gross salary
    
    // House Rent Allowance - very limited exemption in new regime
    // Only for certain conditions and very limited amount
    if (hra > 0 && rentPaid > 0 && annualSalary <= 1500000) {
        // Minimal HRA benefit in new regime (much more restrictive)
        const limitedHRAExemption = Math.min(
            calculateHRAExemption(annualSalary, hra, rentPaid) * 0.2, // Only 20% of old regime calculation
            25000 // Maximum ₹25,000 per year
        );
        allowedDeductions += limitedHRAExemption;
    }
    
    // Medical insurance premium - very limited benefit for senior citizens
    if (medicalInsurance > 0) {
        // Only for senior citizen parents/self if 60+ years
        // For this calculator, we'll assume general case with no benefit
        // allowedDeductions += 0; // No general medical insurance benefit
    }
    
    // Interest on deposits in savings account up to ₹10,000 (Section 80TTA/80TTB)
    // This is typically minimal and we'll skip for simplicity
    
    const taxableIncome = Math.max(0, annualSalary - allowedDeductions);
    let incomeTax = calculateIncomeTax(taxableIncome, newTaxSlabs);
    
    // Apply Budget 2025 marginal relief for new regime (₹12-12.75 lakh)
    incomeTax = applyMarginalRelief(taxableIncome, incomeTax, true);
    
    const cess = incomeTax * 0.04; // 4% cess
    const totalTax = incomeTax + cess;
    const netIncome = annualSalary - totalTax;
    
    return {
        grossIncome: annualSalary,
        standardDeduction,
        totalDeductions: allowedDeductions,
        taxableIncome,
        incomeTax,
        cess,
        totalTax,
        netIncome
    };
}

function updateResults(oldResults, newResults) {
    // Update Old Regime results
    document.getElementById('oldGrossIncome').textContent = formatCurrency(oldResults.grossIncome);
    document.getElementById('oldDeductions').textContent = formatCurrency(oldResults.totalDeductions);
    document.getElementById('oldTaxableIncome').textContent = formatCurrency(oldResults.taxableIncome);
    document.getElementById('oldIncomeTax').textContent = formatCurrency(oldResults.incomeTax);
    document.getElementById('oldCess').textContent = formatCurrency(oldResults.cess);
    document.getElementById('oldTotalTax').textContent = formatCurrency(oldResults.totalTax);
    document.getElementById('oldNetIncome').textContent = formatCurrency(oldResults.netIncome);
    
    // Update New Regime results
    document.getElementById('newGrossIncome').textContent = formatCurrency(newResults.grossIncome);
    document.getElementById('newDeductions').textContent = formatCurrency(newResults.totalDeductions);
    document.getElementById('newTaxableIncome').textContent = formatCurrency(newResults.taxableIncome);
    document.getElementById('newIncomeTax').textContent = formatCurrency(newResults.incomeTax);
    document.getElementById('newCess').textContent = formatCurrency(newResults.cess);
    document.getElementById('newTotalTax').textContent = formatCurrency(newResults.totalTax);
    document.getElementById('newNetIncome').textContent = formatCurrency(newResults.netIncome);
    
    // Calculate comparison
    const taxDifference = oldResults.totalTax - newResults.totalTax;
    const recommendedRegime = taxDifference > 0 ? 'New Regime' : 'Old Regime';
    const annualSavings = Math.abs(taxDifference);
    
    document.getElementById('taxDifference').textContent = formatCurrency(taxDifference);
    document.getElementById('recommendedRegime').textContent = recommendedRegime;
    document.getElementById('annualSavings').textContent = formatCurrency(annualSavings);
    
    // Highlight better option
    const oldCard = document.querySelector('.old-regime');
    const newCard = document.querySelector('.new-regime');
    
    oldCard.classList.remove('better-option');
    newCard.classList.remove('better-option');
    
    if (recommendedRegime === 'Old Regime') {
        oldCard.classList.add('better-option');
    } else {
        newCard.classList.add('better-option');
    }
    
    // Change tax difference color based on which is better
    const taxDiffElement = document.getElementById('taxDifference');
    if (taxDifference > 0) {
        taxDiffElement.style.color = '#27ae60'; // Green for savings with new regime
    } else {
        taxDiffElement.style.color = '#e74c3c'; // Red for savings with old regime
    }
}

function getInputValues() {
    return {
        annualSalary: parseFloat(document.getElementById('annualSalary').value) || 0,
        hra: parseFloat(document.getElementById('hra').value) || 0,
        rentPaid: parseFloat(document.getElementById('rentPaid').value) || 0,
        providentFund: parseFloat(document.getElementById('providentFund').value) || 0,
        lifeInsurance: parseFloat(document.getElementById('lifeInsurance').value) || 0,
        elss: parseFloat(document.getElementById('elss').value) || 0,
        homeLoanInterest: parseFloat(document.getElementById('homeLoanInterest').value) || 0,
        medicalInsurance: parseFloat(document.getElementById('medicalInsurance').value) || 0,
        educationLoan: parseFloat(document.getElementById('educationLoan').value) || 0,
        nps: parseFloat(document.getElementById('nps').value) || 0
    };
}

function calculateTax() {
    const inputs = getInputValues();
    
    if (inputs.annualSalary === 0) {
        alert('Please enter your annual salary to calculate tax.');
        return;
    }
    
    const oldResults = calculateOldRegimeTax(inputs);
    const newResults = calculateNewRegimeTax(inputs);
    
    updateResults(oldResults, newResults);
    
    // Scroll to results
    document.querySelector('.results-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add event listeners for real-time calculation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Add small delay to avoid too frequent calculations
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                const annualSalary = parseFloat(document.getElementById('annualSalary').value) || 0;
                if (annualSalary > 0) {
                    calculateTax();
                }
            }, 500);
        });
    });
    
    // Sample calculation for demo - shows Budget 2025 marginal relief benefit
    document.getElementById('annualSalary').value = '1250000'; // ₹12.5 lakh to demonstrate marginal relief
    document.getElementById('hra').value = '250000';
    document.getElementById('rentPaid').value = '200000';
    document.getElementById('providentFund').value = '60000';
    document.getElementById('lifeInsurance').value = '25000';
    document.getElementById('elss').value = '50000';
    document.getElementById('homeLoanInterest').value = '150000';
    document.getElementById('medicalInsurance').value = '25000';
    
    // Calculate with sample data
    calculateTax();
});

// Add some interactive features
function addTooltips() {
    const tooltips = {
        'annualSalary': 'Your total annual salary including all components',
        'hra': 'House Rent Allowance received from employer',
        'rentPaid': 'Actual rent paid for accommodation',
        'providentFund': 'Employee contribution to Provident Fund',
        'lifeInsurance': 'Premium paid for life insurance policies',
        'elss': 'Investment in Equity Linked Savings Scheme',
        'homeLoanInterest': 'Interest paid on home loan (max ₹2 lakh)',
        'medicalInsurance': 'Premium for health insurance (max ₹25,000)',
        'educationLoan': 'Interest on education loan (no limit)',
        'nps': 'Additional contribution to National Pension System'
    };
    
    Object.keys(tooltips).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltips[id];
        }
    });
}

// Initialize tooltips when page loads
document.addEventListener('DOMContentLoaded', addTooltips);
