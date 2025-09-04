// Comprehensive Tax Calculation Engine for AY 2025-26 - TaxGenius.in
// Built with TypeScript and modern architecture

export interface TaxInputs {
  annualSalary: number
  hra: number
  rentPaid: number
  providentFund: number
  lifeInsurance: number
  elss: number
  homeLoanInterest: number
  medicalInsurance: number
  educationLoan: number
  nps: number
  professionalTax: number
  employerNPS: number
  agniveerCorpus: number
  isMetro: boolean
}

export interface TaxResults {
  grossIncome: number
  standardDeduction: number
  hraExemption?: number
  section80C?: number
  section80D?: number
  section24?: number
  section80E?: number
  section80CCD1B?: number
  section80CCD2?: number
  section80CCH2?: number
  totalDeductions: number
  taxableIncome: number
  incomeTax: number
  surcharge: number
  cess: number
  totalTax: number
  netIncome: number
  effectiveRate: string
  rebateApplied?: boolean
}

interface TaxSlab {
  upto?: number
  from?: number
  to?: number
  above?: number
  rate: number
}

interface ProcessedSlab {
  min: number
  max: number
  rate: number
}

interface SurchargeConfig {
  from?: number
  to?: number
  above?: number
  rate: number
}

// Tax Configuration Object (Externalized for easy updates)
const TAX_CONFIG = {
  taxYear: "AY2025-26",
  slabs: {
    oldRegime: [
      { upto: 250000, rate: 0 },
      { from: 250001, to: 500000, rate: 5 },
      { from: 500001, to: 1000000, rate: 20 },
      { above: 1000000, rate: 30 }
    ] as TaxSlab[],
    newRegime: [
      { upto: 300000, rate: 0 },
      { from: 300001, to: 600000, rate: 5 },
      { from: 600001, to: 900000, rate: 10 },
      { from: 900001, to: 1200000, rate: 15 },
      { from: 1200001, to: 1500000, rate: 20 },
      { above: 1500000, rate: 30 }
    ] as TaxSlab[]
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
  ] as SurchargeConfig[],
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
      section16: { standardDeduction: 75000 }, // Updated for Budget 2025
      allowedDeductions: ["80CCD(2)", "80CCH(2)"],
      disallowed: "All other Chapter VIA deductions"
    }
  }
};

// Modern Tax Slab Processing with Functional Programming
const processOldRegimeSlabs = (): ProcessedSlab[] => TAX_CONFIG.slabs.oldRegime.map((slab: TaxSlab) => ({
  min: slab.from || 0,
  max: slab.to || (slab.above ? Infinity : slab.upto || 0),
  rate: slab.rate / 100
}));

const processNewRegimeSlabs = (): ProcessedSlab[] => TAX_CONFIG.slabs.newRegime.map((slab: TaxSlab) => ({
  min: slab.from || 0,
  max: slab.to || (slab.above ? Infinity : slab.upto || 0),
  rate: slab.rate / 100
}));

const oldTaxSlabs = processOldRegimeSlabs();
const newTaxSlabs = processNewRegimeSlabs();

// Utility Functions with Modern TypeScript Features
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function calculateIncomeTaxFromSlabs(taxableIncome: number, taxSlabs: Array<{min: number, max: number, rate: number}>): number {
  return taxSlabs.reduce((tax, slab) => {
    if (taxableIncome > slab.min) {
      const taxableAmountInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
      return tax + (taxableAmountInSlab * slab.rate);
    }
    return tax;
  }, 0);
}

function calculateSurchargeAmount(incomeTax: number, taxableIncome: number): number {
  const surchargeConfig = TAX_CONFIG.surcharge.find((s: SurchargeConfig) => {
    if (s.to) {
      return taxableIncome >= (s.from || 0) && taxableIncome <= s.to;
    } else {
      return taxableIncome >= (s.above || 0);
    }
  });
  return surchargeConfig ? incomeTax * (surchargeConfig.rate / 100) : 0;
}

function calculateHRAExemptionAmount(salary: number, hra: number, rentPaid: number, isMetro = false): number {
  if (!hra || !rentPaid) return 0;
  
  const basicSalary = salary * 0.5; // Assuming basic is 50% of salary
  const metroRate = isMetro ? 0.5 : 0.4; // 50% for metro, 40% for non-metro
  
  return Math.max(0, Math.min(
    hra,
    rentPaid - (basicSalary * 0.1),
    basicSalary * metroRate
  ));
}

// Enhanced Marginal Relief with Precise Implementation
function applyMarginalReliefCalculation(taxableIncome: number, calculatedTax: number, isNewRegime = false): number {
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
export function calculateOldRegimeTax(inputs: TaxInputs): TaxResults {
  const {
    annualSalary, hra, rentPaid, providentFund, lifeInsurance, elss,
    homeLoanInterest, medicalInsurance, educationLoan, nps, 
    professionalTax = 0, isMetro = false, employerNPS = 0
  } = inputs;

  // Section 16 Deductions
  const standardDeduction = TAX_CONFIG.deductions.oldRegime.section16.standardDeduction;
  const professionalTaxDeduction = Math.min(professionalTax, 2500);

  // HRA Exemption (Section 10(13A))
  const hraExemption = calculateHRAExemptionAmount(annualSalary, hra, rentPaid, isMetro);

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
  let incomeTax = calculateIncomeTaxFromSlabs(taxableIncome, oldTaxSlabs);
  
  // Apply marginal relief and rebate
  incomeTax = applyMarginalReliefCalculation(taxableIncome, incomeTax, false);
  
  // Calculate surcharge if applicable
  const surcharge = calculateSurchargeAmount(incomeTax, taxableIncome);
  const taxWithSurcharge = incomeTax + surcharge;
  
  // Health and Education Cess
  const cess = taxWithSurcharge * (TAX_CONFIG.cess.rate / 100);
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
export function calculateNewRegimeTax(inputs: TaxInputs): TaxResults {
  const {
    annualSalary, employerNPS = 0, agniveerCorpus = 0,
    professionalTax = 0
  } = inputs;

  // Limited deductions in new regime
  const standardDeduction = TAX_CONFIG.deductions.newRegime.section16.standardDeduction;
  const professionalTaxDeduction = Math.min(professionalTax, 2500);
  
  // Only allowed deductions in new regime
  const section80CCD2 = employerNPS; // Employer NPS contribution
  const section80CCH2 = agniveerCorpus; // Agniveer Corpus Fund

  const totalDeductions = standardDeduction + professionalTaxDeduction + 
                         section80CCD2 + section80CCH2;

  const taxableIncome = Math.max(0, annualSalary - totalDeductions);
  let incomeTax = calculateIncomeTaxFromSlabs(taxableIncome, newTaxSlabs);
  
  // Apply marginal relief and rebate for new regime
  incomeTax = applyMarginalReliefCalculation(taxableIncome, incomeTax, true);
  
  // Calculate surcharge if applicable
  const surcharge = calculateSurchargeAmount(incomeTax, taxableIncome);
  const taxWithSurcharge = incomeTax + surcharge;
  
  // Health and Education Cess
  const cess = taxWithSurcharge * (TAX_CONFIG.cess.rate / 100);
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
