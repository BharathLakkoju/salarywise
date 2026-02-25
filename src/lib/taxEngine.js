// Tax Calculation Engine – FY 2025-26 (AY 2026-27)
// All amounts in ₹ (INR)

// ─── New Regime Slabs ───
const NEW_REGIME_SLABS = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 0.05 },
  { min: 800000, max: 1200000, rate: 0.10 },
  { min: 1200000, max: 1600000, rate: 0.15 },
  { min: 1600000, max: 2000000, rate: 0.20 },
  { min: 2000000, max: 2400000, rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
];

// ─── Old Regime Slabs ───
const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

const NEW_REGIME_STD_DEDUCTION = 75000;
const OLD_REGIME_STD_DEDUCTION = 50000;
const CESS_RATE = 0.04;

// ─── Slab-based tax calculation ───
function calcSlabTax(taxableIncome, slabs) {
  let tax = 0;
  for (const slab of slabs) {
    if (taxableIncome <= slab.min) break;
    const taxableInSlab = Math.min(taxableIncome, slab.max) - slab.min;
    tax += taxableInSlab * slab.rate;
  }
  return tax;
}

// ─── Surcharge ───
function calcSurcharge(tax, totalIncome) {
  if (totalIncome <= 5000000) return 0;
  if (totalIncome <= 10000000) return tax * 0.10;
  if (totalIncome <= 20000000) return tax * 0.15;
  if (totalIncome <= 50000000) return tax * 0.25;
  return tax * 0.37;
}

// Marginal relief for surcharge (simplified)
function calcSurchargeWithMarginalRelief(tax, totalIncome) {
  const surcharge = calcSurcharge(tax, totalIncome);
  // Apply marginal relief at each threshold
  const thresholds = [5000000, 10000000, 20000000, 50000000];
  for (const t of thresholds) {
    if (totalIncome > t && totalIncome <= t * 1.1) {
      const excessIncome = totalIncome - t;
      const taxAtThreshold = calcSlabTax(t, totalIncome > 1200000 ? OLD_REGIME_SLABS : NEW_REGIME_SLABS);
      const surchargeAtThreshold = calcSurcharge(taxAtThreshold, t);
      const totalTaxWithSurcharge = tax + surcharge;
      const totalTaxAtThreshold = taxAtThreshold + surchargeAtThreshold;
      const marginalReliefTax = totalTaxAtThreshold + excessIncome;
      if (marginalReliefTax < totalTaxWithSurcharge) {
        return marginalReliefTax - tax;
      }
    }
  }
  return surcharge;
}

// ─── Cess ───
function applyCess(taxPlusSurcharge) {
  return taxPlusSurcharge * CESS_RATE;
}

// ─── HRA Exemption (Old Regime) ───
export function calcHRAExemption(basicAnnual, hraReceived, rentPaid, isMetro) {
  if (!hraReceived || !rentPaid || rentPaid <= 0) return 0;
  const a = hraReceived;
  const b = rentPaid - 0.10 * basicAnnual;
  const c = isMetro ? 0.50 * basicAnnual : 0.40 * basicAnnual;
  return Math.max(0, Math.min(a, b, c));
}

// ─── New Regime Tax ───
export function calcNewRegimeTax(grossIncome) {
  const stdDeduction = NEW_REGIME_STD_DEDUCTION;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);

  let slabTax = calcSlabTax(taxableIncome, NEW_REGIME_SLABS);

  // Rebate u/s 87A: If taxable income ≤ ₹12,00,000 → no tax (rebate up to ₹60,000)
  if (taxableIncome <= 1200000) {
    slabTax = Math.max(0, slabTax - 60000);
  }

  const surcharge = calcSurcharge(slabTax, taxableIncome);
  const cess = applyCess(slabTax + surcharge);
  const totalTax = slabTax + surcharge + cess;

  return {
    regime: 'new',
    grossIncome,
    stdDeduction,
    totalDeductions: stdDeduction,
    taxableIncome,
    slabTax,
    rebate: taxableIncome <= 1200000 ? Math.min(slabTax, 60000) : 0,
    surcharge,
    cess,
    totalTax: Math.round(totalTax),
    monthlyTax: Math.round(totalTax / 12),
    annualTakeHome: Math.round(grossIncome - totalTax),
    monthlyTakeHome: Math.round((grossIncome - totalTax) / 12),
    effectiveRate: grossIncome > 0 ? ((totalTax / grossIncome) * 100).toFixed(2) : '0.00',
  };
}

// ─── Old Regime Tax ───
export function calcOldRegimeTax(grossIncome, deductions = {}) {
  const {
    section80C = 0,       // max 1,50,000
    section80D = 0,       // max 25,000 / 50,000
    section80CCD = 0,     // NPS max 50,000
    hraExemption = 0,
    otherDeductions = 0,
    homeLoanInterest = 0, // max 2,00,000
  } = deductions;

  const stdDeduction = OLD_REGIME_STD_DEDUCTION;
  const cappedSection80C = Math.min(section80C, 150000);
  const cappedSection80D = Math.min(section80D, 50000);
  const cappedSection80CCD = Math.min(section80CCD, 50000);
  const cappedHomeLoan = Math.min(homeLoanInterest, 200000);

  const totalDeductions =
    stdDeduction +
    cappedSection80C +
    cappedSection80D +
    cappedSection80CCD +
    hraExemption +
    otherDeductions +
    cappedHomeLoan;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  let slabTax = calcSlabTax(taxableIncome, OLD_REGIME_SLABS);

  // Rebate u/s 87A: If taxable income ≤ ₹5,00,000 → rebate up to ₹12,500
  if (taxableIncome <= 500000) {
    slabTax = Math.max(0, slabTax - 12500);
  }

  const surcharge = calcSurcharge(slabTax, taxableIncome);
  const cess = applyCess(slabTax + surcharge);
  const totalTax = slabTax + surcharge + cess;

  return {
    regime: 'old',
    grossIncome,
    stdDeduction,
    deductionsBreakdown: {
      section80C: cappedSection80C,
      section80D: cappedSection80D,
      section80CCD: cappedSection80CCD,
      hraExemption,
      homeLoanInterest: cappedHomeLoan,
      otherDeductions,
    },
    totalDeductions,
    taxableIncome,
    slabTax,
    rebate: taxableIncome <= 500000 ? Math.min(slabTax, 12500) : 0,
    surcharge,
    cess,
    totalTax: Math.round(totalTax),
    monthlyTax: Math.round(totalTax / 12),
    annualTakeHome: Math.round(grossIncome - totalTax),
    monthlyTakeHome: Math.round((grossIncome - totalTax) / 12),
    effectiveRate: grossIncome > 0 ? ((totalTax / grossIncome) * 100).toFixed(2) : '0.00',
  };
}

// ─── Master computation ───
export function computeSalaryBreakdown(inputs) {
  const {
    annualCTC,
    basicPercent = 40,
    hraPercent = 20,
    specialAllowance = 0,
    rentPaid = 0,
    isMetro = true,
    section80C = 0,
    section80D = 0,
    section80CCD = 0,
    otherDeductions = 0,
    homeLoanInterest = 0,
  } = inputs;

  const basic = annualCTC * (basicPercent / 100);
  const hra = annualCTC * (hraPercent / 100);
  const otherAllowances = annualCTC - basic - hra + specialAllowance;
  const grossIncome = annualCTC;

  const hraExemption = calcHRAExemption(basic, hra, rentPaid, isMetro);

  const newRegime = calcNewRegimeTax(grossIncome);
  const oldRegime = calcOldRegimeTax(grossIncome, {
    section80C,
    section80D,
    section80CCD,
    hraExemption,
    otherDeductions,
    homeLoanInterest,
  });

  const taxSavings = oldRegime.totalTax - newRegime.totalTax;
  const betterRegime = taxSavings > 0 ? 'new' : taxSavings < 0 ? 'old' : 'same';

  return {
    inputs: {
      annualCTC,
      basic,
      hra,
      otherAllowances,
      hraExemption,
    },
    newRegime,
    oldRegime,
    comparison: {
      taxSavings: Math.abs(taxSavings),
      betterRegime,
      monthlySavings: Math.round(Math.abs(taxSavings) / 12),
    },
    monthlyBreakdown: generateMonthlyBreakdown(grossIncome, newRegime.totalTax, oldRegime.totalTax),
  };
}

function generateMonthlyBreakdown(grossAnnual, newTaxAnnual, oldTaxAnnual) {
  const months = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March',
  ];

  const monthlyGross = Math.round(grossAnnual / 12);
  const monthlyNewTax = Math.round(newTaxAnnual / 12);
  const monthlyOldTax = Math.round(oldTaxAnnual / 12);

  return months.map((month) => ({
    month,
    gross: monthlyGross,
    newRegimeTax: monthlyNewTax,
    newRegimeNet: monthlyGross - monthlyNewTax,
    oldRegimeTax: monthlyOldTax,
    oldRegimeNet: monthlyGross - monthlyOldTax,
  }));
}

// ─── Formatting helpers ───
export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

export function formatINRCompact(amount) {
  if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(2) + ' L';
  if (amount >= 1000) return '₹' + (amount / 1000).toFixed(1) + ' K';
  return '₹' + amount;
}
