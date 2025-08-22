// Comprehensive Tax Calculation Engine for AY 2025-26 - TaxGenius.in
// Built with modern ES6+ features and future-ready architecture

// Tax Configuration Object (Externalized for easy updates)
const TAX_CONFIG = {
    taxYear: "AY2025-26",
    slabs: {
        oldRegime: [
            { upto: 250000, rate: 0 },
            { from: 250001, to: 500000, rate: 5 },
            { from: 500001, to: 1000000, rate: 20 },
            { above: 1000000, rate: 30 }
        ],
        newRegime: [
            { upto: 300000, rate: 0 },
            { from: 300001, to: 600000, rate: 5 },
            { from: 600001, to: 900000, rate: 10 },
            { from: 900001, to: 1200000, rate: 15 },
            { from: 1200001, to: 1500000, rate: 20 },
            { above: 1500000, rate: 30 }
        ]
    },
    rebate87A: {
        oldRegime: { limit: 500000, rebate: 12500 },
        newRegime: { 
            limit: 1200000, 
            description: "Tax payable up to 1200000 fully rebated; marginal relief applies above 12L" 
        }
    },
    cess: { rate: 4, type: "Health and Education Cess" },
    surcharge: [
        { from: 5000000, to: 10000000, rate: 10 },
        { from: 10000001, to: 20000000, rate: 15 },
        { from: 20000001, to: 50000000, rate: 25 },
        { above: 50000000, rate: 37 }
    ],
    deductions: {
        oldRegime: {
            section16: { standardDeduction: 50000, professionalTaxMax: 2500 },
            chapterVIA: {
                section80C: { limit: 150000, types: ["PF", "PPF", "LIC", "ELSS"] },
                section80D: { limit: 25000, senior: 50000 },
                section80E: { limit: "No limit" },
                section80G: { limit: "50%-100% of donation" },
                section80CCD1B: { limit: 50000 }
            }
        },
        newRegime: {
            section16: { standardDeduction: 50000 },
            allowedDeductions: ["80CCD(2)", "80CCH(2)"],
            disallowed: "All other Chapter VIA deductions"
        }
    },
    exemptions: {
        oldRegime: {
            HRA: { rule: "10(13A) + Rule 2A", calculation: "least of actual HRA, rent minus 10% salary, 40/50% of salary" },
            LTA: { rule: "10(5) + Rule 2B", limit: "2 journeys in 4-year block" },
            gratuity: { limit: 2000000 },
            leaveEncashment: { limit: 300000 }
        },
        newRegime: {
            HRA: { allowed: false },
            LTA: { allowed: false },
            gratuity: { allowed: true, limit: 2000000 },
            leaveEncashment: { allowed: true, limit: 300000 }
        }
    },
    perquisites: {
        specifiedEmployeePerquisite: { oldLimit: 50000, newLimit: 400000 },
        overseasMedicalTreatment: { exemptLimit: 800000 }
    }
};

// Modern Tax Slab Processing with Functional Programming
const processOldRegimeSlabs = () => TAX_CONFIG.slabs.oldRegime.map(slab => ({
    min: slab.from || 0,
    max: slab.to || (slab.above ? Infinity : slab.upto),
    rate: slab.rate / 100
}));

const processNewRegimeSlabs = () => TAX_CONFIG.slabs.newRegime.map(slab => ({
    min: slab.from || 0,
    max: slab.to || (slab.above ? Infinity : slab.upto),
    rate: slab.rate / 100
}));

const oldTaxSlabs = processOldRegimeSlabs();
const newTaxSlabs = processNewRegimeSlabs();

// Utility Functions with Modern JavaScript Features
class TaxCalculatorUtils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    static calculateIncomeTax(taxableIncome, taxSlabs) {
        return taxSlabs.reduce((tax, slab) => {
            if (taxableIncome > slab.min) {
                const taxableAmountInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
                return tax + (taxableAmountInSlab * slab.rate);
            }
            return tax;
        }, 0);
    }

    static calculateSurcharge(incomeTax, taxableIncome) {
        const surchargeConfig = TAX_CONFIG.surcharge.find(s => 
            taxableIncome >= s.from && (s.to ? taxableIncome <= s.to : taxableIncome >= s.above)
        );
        return surchargeConfig ? incomeTax * (surchargeConfig.rate / 100) : 0;
    }

    static calculateHRAExemption(salary, hra, rentPaid, isMetro = false) {
        if (!hra || !rentPaid) return 0;
        
        const basicSalary = salary * 0.5; // Assuming basic is 50% of salary
        const metroRate = isMetro ? 0.5 : 0.4; // 50% for metro, 40% for non-metro
        
        return Math.max(0, Math.min(
            hra,
            rentPaid - (basicSalary * 0.1),
            basicSalary * metroRate
        ));
    }
}

// Advanced Tax Calculation Classes with Modern Architecture
class TaxRegimeCalculator {
    constructor(config) {
        this.config = config;
    }

    // Enhanced Marginal Relief with Precise Implementation
    applyMarginalRelief(taxableIncome, calculatedTax, isNewRegime = false) {
        if (isNewRegime) {
            // New Regime: Complete rebate up to ₹12L, marginal relief from ₹12L-₹12.75L
            if (taxableIncome <= 1200000) {
                return 0; // Complete rebate up to ₹12 lakh
            }
            if (taxableIncome <= 1275000) {
                const excessAmount = taxableIncome - 1200000;
                return Math.min(calculatedTax, excessAmount);
            }
        } else {
            // Old Regime: Section 87A rebate
            if (taxableIncome <= 500000) {
                return Math.max(0, calculatedTax - 12500);
            }
        }
        return calculatedTax;
    }

    // Comprehensive Old Regime Calculation
    calculateOldRegimeTax(inputs) {
        const {
            annualSalary, hra, rentPaid, providentFund, lifeInsurance, elss,
            homeLoanInterest, medicalInsurance, educationLoan, nps, 
            professionalTax = 0, isMetro = false, employerNPS = 0
        } = inputs;

        // Section 16 Deductions
        const standardDeduction = this.config.deductions.oldRegime.section16.standardDeduction;
        const professionalTaxDeduction = Math.min(professionalTax, 2500);

        // HRA Exemption (Section 10(13A))
        const hraExemption = TaxCalculatorUtils.calculateHRAExemption(annualSalary, hra, rentPaid, isMetro);

        // Chapter VIA Deductions
        const section80C = Math.min(150000, providentFund + lifeInsurance + elss);
        const section80D = Math.min(25000, medicalInsurance);
        const section24 = Math.min(200000, homeLoanInterest);
        const section80E = educationLoan; // No limit
        const section80CCD1B = Math.min(50000, nps);
        const section80CCD2 = employerNPS; // Employer NPS contribution (no limit)

        const totalDeductions = standardDeduction + professionalTaxDeduction + hraExemption + 
                               section80C + section80D + section24 + section80E + 
                               section80CCD1B + section80CCD2;

        const taxableIncome = Math.max(0, annualSalary - totalDeductions);
        let incomeTax = TaxCalculatorUtils.calculateIncomeTax(taxableIncome, oldTaxSlabs);
        
        // Apply marginal relief and rebate
        incomeTax = this.applyMarginalRelief(taxableIncome, incomeTax, false);
        
        // Calculate surcharge if applicable
        const surcharge = TaxCalculatorUtils.calculateSurcharge(incomeTax, taxableIncome);
        const taxWithSurcharge = incomeTax + surcharge;
        
        // Health and Education Cess
        const cess = taxWithSurcharge * (this.config.cess.rate / 100);
        const totalTax = taxWithSurcharge + cess;
        
        return {
            grossIncome: annualSalary,
            standardDeduction,
            hraExemption,
            section80C,
            section80D,
            section24,
            section80E,
            section80CCD1B,
            section80CCD2,
            totalDeductions,
            taxableIncome,
            incomeTax,
            surcharge,
            cess,
            totalTax,
            netIncome: annualSalary - totalTax,
            effectiveRate: (totalTax / annualSalary * 100).toFixed(2)
        };
    }

    // Comprehensive New Regime Calculation
    calculateNewRegimeTax(inputs) {
        const {
            annualSalary, employerNPS = 0, agniveerCorpus = 0,
            professionalTax = 0
        } = inputs;

        // Limited deductions in new regime
        const standardDeduction = this.config.deductions.newRegime.section16.standardDeduction;
        const professionalTaxDeduction = Math.min(professionalTax, 2500);
        
        // Only allowed deductions in new regime
        const section80CCD2 = employerNPS; // Employer NPS contribution
        const section80CCH2 = agniveerCorpus; // Agniveer Corpus Fund

        const totalDeductions = standardDeduction + professionalTaxDeduction + 
                               section80CCD2 + section80CCH2;

        const taxableIncome = Math.max(0, annualSalary - totalDeductions);
        let incomeTax = TaxCalculatorUtils.calculateIncomeTax(taxableIncome, newTaxSlabs);
        
        // Apply marginal relief and rebate for new regime
        incomeTax = this.applyMarginalRelief(taxableIncome, incomeTax, true);
        
        // Calculate surcharge if applicable
        const surcharge = TaxCalculatorUtils.calculateSurcharge(incomeTax, taxableIncome);
        const taxWithSurcharge = incomeTax + surcharge;
        
        // Health and Education Cess
        const cess = taxWithSurcharge * (this.config.cess.rate / 100);
        const totalTax = taxWithSurcharge + cess;

        return {
            grossIncome: annualSalary,
            standardDeduction,
            section80CCD2,
            section80CCH2,
            totalDeductions,
            taxableIncome,
            incomeTax,
            surcharge,
            cess,
            totalTax,
            netIncome: annualSalary - totalTax,
            effectiveRate: (totalTax / annualSalary * 100).toFixed(2),
            rebateApplied: taxableIncome <= 1200000
        };
    }
}

// Initialize the tax calculator
const taxCalculator = new TaxRegimeCalculator(TAX_CONFIG);

// Modern UI Controller with Enhanced Features
class TaxCalculatorUI {
    static updateResults(oldResults, newResults) {
        // Update Old Regime results with enhanced details
        document.getElementById('oldGrossIncome').textContent = TaxCalculatorUtils.formatCurrency(oldResults.grossIncome);
        document.getElementById('oldDeductions').textContent = TaxCalculatorUtils.formatCurrency(oldResults.totalDeductions);
        document.getElementById('oldTaxableIncome').textContent = TaxCalculatorUtils.formatCurrency(oldResults.taxableIncome);
        document.getElementById('oldIncomeTax').textContent = TaxCalculatorUtils.formatCurrency(oldResults.incomeTax);
        document.getElementById('oldCess').textContent = TaxCalculatorUtils.formatCurrency(oldResults.cess);
        document.getElementById('oldTotalTax').textContent = TaxCalculatorUtils.formatCurrency(oldResults.totalTax);
        document.getElementById('oldNetIncome').textContent = TaxCalculatorUtils.formatCurrency(oldResults.netIncome);
        
        // Update New Regime results with enhanced details
        document.getElementById('newGrossIncome').textContent = TaxCalculatorUtils.formatCurrency(newResults.grossIncome);
        document.getElementById('newDeductions').textContent = TaxCalculatorUtils.formatCurrency(newResults.totalDeductions);
        document.getElementById('newTaxableIncome').textContent = TaxCalculatorUtils.formatCurrency(newResults.taxableIncome);
        document.getElementById('newIncomeTax').textContent = TaxCalculatorUtils.formatCurrency(newResults.incomeTax);
        document.getElementById('newCess').textContent = TaxCalculatorUtils.formatCurrency(newResults.cess);
        document.getElementById('newTotalTax').textContent = TaxCalculatorUtils.formatCurrency(newResults.totalTax);
        document.getElementById('newNetIncome').textContent = TaxCalculatorUtils.formatCurrency(newResults.netIncome);
        
        // Enhanced comparison with detailed insights
        const taxDifference = oldResults.totalTax - newResults.totalTax;
        const recommendedRegime = taxDifference > 0 ? 'New Regime' : 'Old Regime';
        const annualSavings = Math.abs(taxDifference);
        const savingsPercentage = ((annualSavings / oldResults.grossIncome) * 100).toFixed(2);
        
        document.getElementById('taxDifference').textContent = TaxCalculatorUtils.formatCurrency(taxDifference);
        document.getElementById('recommendedRegime').textContent = recommendedRegime;
        document.getElementById('annualSavings').textContent = TaxCalculatorUtils.formatCurrency(annualSavings);
        
        // Add savings percentage if element exists
        const savingsPercentageElement = document.getElementById('savingsPercentage');
        if (savingsPercentageElement) {
            savingsPercentageElement.textContent = `${savingsPercentage}%`;
        }
        
        // Highlight better option with enhanced visual feedback
        const oldCard = document.querySelector('.old-regime');
        const newCard = document.querySelector('.new-regime');
        
        oldCard?.classList.remove('better-option');
        newCard?.classList.remove('better-option');
        
        if (recommendedRegime === 'Old Regime') {
            oldCard?.classList.add('better-option');
        } else {
            newCard?.classList.add('better-option');
        }
        
        // Enhanced tax difference styling
        const taxDiffElement = document.getElementById('taxDifference');
        if (taxDiffElement) {
            taxDiffElement.style.color = taxDifference > 0 ? '#27ae60' : '#e74c3c';
            taxDiffElement.style.fontWeight = 'bold';
        }

        // Show rebate information for new regime
        if (newResults.rebateApplied) {
            this.showRebateNotification();
        }
    }

    static showRebateNotification() {
        const notification = document.createElement('div');
        notification.className = 'rebate-notification';
        notification.innerHTML = `
            <i class="fas fa-gift"></i>
            <span>🎉 You qualify for complete tax rebate under new regime!</span>
        `;
        
        // Remove existing notification if any
        const existing = document.querySelector('.rebate-notification');
        if (existing) existing.remove();
        
        // Add to results section
        const resultsSection = document.querySelector('.results-section');
        resultsSection?.insertBefore(notification, resultsSection.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => notification?.remove(), 5000);
    }

    static getInputValues() {
        return {
            annualSalary: parseFloat(document.getElementById('annualSalary')?.value) || 0,
            hra: parseFloat(document.getElementById('hra')?.value) || 0,
            rentPaid: parseFloat(document.getElementById('rentPaid')?.value) || 0,
            providentFund: parseFloat(document.getElementById('providentFund')?.value) || 0,
            lifeInsurance: parseFloat(document.getElementById('lifeInsurance')?.value) || 0,
            elss: parseFloat(document.getElementById('elss')?.value) || 0,
            homeLoanInterest: parseFloat(document.getElementById('homeLoanInterest')?.value) || 0,
            medicalInsurance: parseFloat(document.getElementById('medicalInsurance')?.value) || 0,
            educationLoan: parseFloat(document.getElementById('educationLoan')?.value) || 0,
            nps: parseFloat(document.getElementById('nps')?.value) || 0,
            professionalTax: parseFloat(document.getElementById('professionalTax')?.value) || 0,
            employerNPS: parseFloat(document.getElementById('employerNPS')?.value) || 0,
            agniveerCorpus: parseFloat(document.getElementById('agniveerCorpus')?.value) || 0,
            isMetro: document.getElementById('isMetro')?.checked || false
        };
    }

    static addAdvancedTooltips() {
        const tooltips = {
            annualSalary: 'Total annual salary including all components (Basic + DA + HRA + Allowances)',
            hra: 'House Rent Allowance received from employer (if any)',
            rentPaid: 'Actual rent paid for accommodation (required for HRA exemption)',
            providentFund: 'Employee contribution to Provident Fund (typically 12% of basic)',
            lifeInsurance: 'Premium paid for life insurance policies (Section 80C)',
            elss: 'Investment in Equity Linked Savings Scheme (Section 80C)',
            homeLoanInterest: 'Interest paid on home loan (max ₹2 lakh under Section 24)',
            medicalInsurance: 'Premium for health insurance (max ₹25,000 under Section 80D)',
            educationLoan: 'Interest on education loan (no limit under Section 80E)',
            nps: 'Additional contribution to National Pension System (max ₹50,000 under Section 80CCD(1B))',
            professionalTax: 'Professional tax paid as per state laws (max ₹2,500)',
            employerNPS: 'Employer contribution to NPS (allowed in both regimes)',
            agniveerCorpus: 'Agniveer Corpus Fund contribution (allowed in new regime)',
            isMetro: 'Check if you live in metro city (affects HRA calculation - 50% vs 40%)'
        };
        
        Object.entries(tooltips).forEach(([id, tooltip]) => {
            const element = document.getElementById(id);
            if (element) {
                element.title = tooltip;
                element.setAttribute('data-tooltip', tooltip);
            }
        });
    }
}

// Main calculation function with enhanced error handling
function calculateTax() {
    try {
        const inputs = TaxCalculatorUI.getInputValues();
        
        if (inputs.annualSalary === 0) {
            alert('Please enter your annual salary to calculate tax.');
            return;
        }
        
        if (inputs.annualSalary < 0 || inputs.annualSalary > 100000000) {
            alert('Please enter a valid annual salary between ₹0 and ₹10 crores.');
            return;
        }
        
        const oldResults = taxCalculator.calculateOldRegimeTax(inputs);
        const newResults = taxCalculator.calculateNewRegimeTax(inputs);
        
        TaxCalculatorUI.updateResults(oldResults, newResults);
        
        // Smooth scroll to results with enhanced animation
        document.querySelector('.results-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Analytics tracking (future enhancement)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'tax_calculation', {
                'salary_range': getSalaryRange(inputs.annualSalary),
                'recommended_regime': oldResults.totalTax > newResults.totalTax ? 'new' : 'old'
            });
        }
        
    } catch (error) {
        console.error('Tax calculation error:', error);
        alert('An error occurred during tax calculation. Please check your inputs and try again.');
    }
}

// Helper function for analytics
function getSalaryRange(salary) {
    if (salary <= 500000) return '0-5L';
    if (salary <= 1000000) return '5-10L';
    if (salary <= 1500000) return '10-15L';
    if (salary <= 2500000) return '15-25L';
    return '25L+';
}

// Modern Event Handling and Application Initialization
class TaxCalculatorApp {
    constructor() {
        this.debounceTimer = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.loadSampleData();
            TaxCalculatorUI.addAdvancedTooltips();
            this.setupProgressiveEnhancement();
        });
    }

    setupEventListeners() {
        // Real-time calculation with optimized debouncing
        const inputs = document.querySelectorAll('input[type="number"], input[type="checkbox"]');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => this.debouncedCalculation());
            input.addEventListener('change', () => this.debouncedCalculation());
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                calculateTax();
            }
        });

        // Form validation
        inputs.forEach(input => {
            if (input.type === 'number') {
                input.addEventListener('blur', () => this.validateInput(input));
            }
        });
    }

    debouncedCalculation() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            const annualSalary = parseFloat(document.getElementById('annualSalary')?.value) || 0;
            if (annualSalary > 0) {
                calculateTax();
            }
        }, 300); // Reduced debounce time for better UX
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const max = parseFloat(input.getAttribute('max')) || Infinity;
        const min = parseFloat(input.getAttribute('min')) || 0;

        if (value > max) {
            input.value = max;
            this.showValidationMessage(input, `Maximum value is ${max.toLocaleString('en-IN')}`);
        } else if (value < min) {
            input.value = min;
            this.showValidationMessage(input, `Minimum value is ${min}`);
        }
    }

    showValidationMessage(input, message) {
        // Remove existing message
        const existingMessage = input.parentNode.querySelector('.validation-message');
        if (existingMessage) existingMessage.remove();

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = 'validation-message';
        messageEl.textContent = message;
        messageEl.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 4px;';
        
        input.parentNode.appendChild(messageEl);
        
        // Auto-remove after 3 seconds
        setTimeout(() => messageEl.remove(), 3000);
    }

    loadSampleData() {
        // Load optimized sample data showcasing new regime benefits
        const sampleData = {
            annualSalary: '1100000',
            hra: '220000',
            rentPaid: '180000',
            providentFund: '60000',
            lifeInsurance: '30000',
            elss: '60000',
            homeLoanInterest: '180000',
            medicalInsurance: '25000',
            educationLoan: '40000',
            nps: '50000'
        };

        Object.entries(sampleData).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.value = value;
        });

        // Trigger calculation
        setTimeout(() => calculateTax(), 100);
    }

    setupProgressiveEnhancement() {
        // Add modern features if supported
        if ('IntersectionObserver' in window) {
            this.setupScrollAnimations();
        }

        if ('serviceWorker' in navigator) {
            // Future: Service worker for offline functionality
            console.log('Service Worker support detected');
        }

        // Setup theme handling
        this.setupThemeToggle();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.regime-card, .comparison-card').forEach(card => {
            observer.observe(card);
        });
    }

    setupThemeToggle() {
        // Future enhancement: Dark mode toggle
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        prefersDark.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }
}

// Enhanced utility functions for future features
const TaxCalculatorEnhancements = {
    // Future: Export results to PDF
    async exportToPDF() {
        if (typeof html2pdf === 'undefined') {
            console.log('PDF export library not loaded');
            return;
        }
        
        const resultsSection = document.querySelector('.results-section');
        const opt = {
            margin: 1,
            filename: 'tax-calculation-results.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(resultsSection).save();
    },

    // Future: Save calculation history
    saveCalculation() {
        const inputs = TaxCalculatorUI.getInputValues();
        const timestamp = new Date().toISOString();
        
        const calculation = {
            id: Date.now(),
            timestamp,
            inputs,
            results: {
                old: taxCalculator.calculateOldRegimeTax(inputs),
                new: taxCalculator.calculateNewRegimeTax(inputs)
            }
        };

        const history = JSON.parse(localStorage.getItem('taxCalculationHistory') || '[]');
        history.unshift(calculation);
        
        // Keep only last 10 calculations
        if (history.length > 10) {
            history.splice(10);
        }
        
        localStorage.setItem('taxCalculationHistory', JSON.stringify(history));
    },

    // Future: Load calculation from history
    loadCalculation(calculationId) {
        const history = JSON.parse(localStorage.getItem('taxCalculationHistory') || '[]');
        const calculation = history.find(c => c.id === calculationId);
        
        if (calculation) {
            Object.entries(calculation.inputs).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                }
            });
            
            calculateTax();
        }
    },

    // Future: Share calculation via URL
    generateShareableLink() {
        const inputs = TaxCalculatorUI.getInputValues();
        const params = new URLSearchParams(inputs);
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }
};

// Initialize the application
const app = new TaxCalculatorApp();

// Global functions for backward compatibility
window.calculateTax = calculateTax;
window.TaxCalculatorEnhancements = TaxCalculatorEnhancements;

// Future: Performance monitoring
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}
