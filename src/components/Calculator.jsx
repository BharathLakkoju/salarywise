'use client';

import { useState } from 'react';
import { computeSalaryBreakdown } from '@/lib/taxEngine';
import Results from './Results';
import MonthlyTable from './MonthlyTable';
import Tooltip from './Tooltip';
import dynamic from 'next/dynamic';

const Charts = dynamic(() => import('./Charts'), {
    loading: () => (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
    ),
    ssr: false,
});

const initialInputs = {
    annualCTC: '',
    basicPercent: 40,
    hraPercent: 20,
    specialAllowance: '',
    rentPaid: '',
    isMetro: true,
    section80C: '',
    section80D: '',
    section80CCD: '',
    otherDeductions: '',
    homeLoanInterest: '',
};

export default function Calculator() {
    const [inputs, setInputs] = useState(initialInputs);
    const [result, setResult] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [regime, setRegime] = useState('compare');
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const numVal = (v) => (v === '' || v === undefined ? 0 : parseFloat(v) || 0);

    const handleCalculate = (e) => {
        e.preventDefault();
        const ctc = numVal(inputs.annualCTC);
        if (ctc <= 0) {
            setErrors({ annualCTC: 'Please enter a valid annual CTC' });
            return;
        }

        const breakdown = computeSalaryBreakdown({
            annualCTC: ctc,
            basicPercent: numVal(inputs.basicPercent),
            hraPercent: numVal(inputs.hraPercent),
            specialAllowance: numVal(inputs.specialAllowance),
            rentPaid: numVal(inputs.rentPaid),
            isMetro: inputs.isMetro,
            section80C: numVal(inputs.section80C),
            section80D: numVal(inputs.section80D),
            section80CCD: numVal(inputs.section80CCD),
            otherDeductions: numVal(inputs.otherDeductions),
            homeLoanInterest: numVal(inputs.homeLoanInterest),
        });

        setResult(breakdown);

        // Scroll to results
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleReset = () => {
        setInputs(initialInputs);
        setResult(null);
        setErrors({});
    };

    return (
        <section id="calculator" className="w-full">
            <form onSubmit={handleCalculate} className="space-y-6">
                {/* ── Annual CTC ─────────────────────── */}
                <div className="calc-card">
                    <h3 className="section-title">
                        <span className="title-icon">💼</span> Salary Details
                    </h3>
                    <div className="input-group">
                        <label htmlFor="annualCTC" className="input-label">
                            <Tooltip text="Cost to Company — the total annual package your employer pays, including basic, HRA, allowances, PF, and bonuses.">
                                Annual CTC (₹)
                            </Tooltip> <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="annualCTC"
                            type="number"
                            placeholder="e.g. 1200000"
                            value={inputs.annualCTC}
                            onChange={(e) => handleChange('annualCTC', e.target.value)}
                            className={`calc-input ${errors.annualCTC ? 'border-red-500 focus:ring-red-500' : ''}`}
                            min="0"
                            step="1000"
                        />
                        {errors.annualCTC && (
                            <p className="text-red-400 text-sm mt-1">{errors.annualCTC}</p>
                        )}
                        <p className="input-hint">Enter your total annual CTC / gross salary</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="input-group">
                            <label htmlFor="basicPercent" className="input-label">
                                <Tooltip text="Basic salary is usually 40-50% of CTC. It forms the base for PF, gratuity, and HRA calculations. Check your salary slip.">
                                    Basic Salary (%)
                                </Tooltip>
                            </label>
                            <input
                                id="basicPercent"
                                type="number"
                                value={inputs.basicPercent}
                                onChange={(e) => handleChange('basicPercent', e.target.value)}
                                className="calc-input"
                                min="0" max="100"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="hraPercent" className="input-label">
                                <Tooltip text="House Rent Allowance — typically 40-50% of basic salary. If you pay rent, HRA can be partially exempt from tax under the Old Regime.">
                                    HRA (%)
                                </Tooltip>
                            </label>
                            <input
                                id="hraPercent"
                                type="number"
                                value={inputs.hraPercent}
                                onChange={(e) => handleChange('hraPercent', e.target.value)}
                                className="calc-input"
                                min="0" max="100"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Regime Selector ──────────────────── */}
                <div className="calc-card">
                    <h3 className="section-title">
                        <span className="title-icon">⚖️</span>
                        <Tooltip text="India has two income tax systems. The New Regime has lower rates but no deductions. The Old Regime allows deductions like 80C, HRA, and 80D. 'Compare Both' shows which saves you more.">
                            Tax Regime
                        </Tooltip>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { key: 'new', label: 'New Regime' },
                            { key: 'old', label: 'Old Regime' },
                            { key: 'compare', label: 'Compare Both' },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setRegime(key)}
                                className={`regime-btn ${regime === key ? 'regime-btn-active' : 'regime-btn-inactive'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Advanced Deductions (Old Regime) ─── */}
                <div className="calc-card">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex w-full items-center justify-between"
                    >
                        <h3 className="section-title mb-0">
                            <span className="title-icon">🧾</span> Deductions & Exemptions
                        </h3>
                        <span className={`transform transition-transform duration-300 text-xl text-slate-400 ${showAdvanced ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    <p className="text-sm text-slate-400 mt-1 mb-2">Applicable under Old Regime only</p>

                    {showAdvanced && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fadeIn">
                            {[
                                { id: 'section80C', label: 'Section 80C', placeholder: 'e.g. 150000', tip: 'Covers EPF, PPF, ELSS, life insurance, tax-saving FDs, tuition fees, and home loan principal. Maximum deduction: ₹1,50,000 per year.' },
                                { id: 'section80D', label: 'Section 80D', placeholder: 'e.g. 25000', tip: 'Deduction for health insurance premiums. ₹25K for self/family, extra ₹25K-₹50K for parents (₹50K if senior citizen).' },
                                { id: 'section80CCD', label: 'Section 80CCD(1B) - NPS', placeholder: 'e.g. 50000', tip: 'Additional ₹50,000 deduction for investing in the National Pension System (NPS). This is over and above the 80C limit.' },
                                { id: 'homeLoanInterest', label: 'Home Loan Interest (Sec 24)', placeholder: 'e.g. 200000', tip: 'Interest paid on home loan for a self-occupied property. Maximum deduction: ₹2,00,000 per year under Section 24(b).' },
                                { id: 'rentPaid', label: 'Annual Rent Paid', placeholder: 'e.g. 240000', tip: 'Total rent paid during the year. Used to calculate HRA exemption. HRA tax benefit = minimum of: actual HRA, rent minus 10% of basic, or 50%/40% of basic (metro/non-metro).' },
                                { id: 'otherDeductions', label: 'Other Deductions', placeholder: 'e.g. 10000', tip: 'Any other deductions you claim — e.g. 80E (education loan interest), 80G (donations), 80TTA (savings interest up to ₹10K).' },
                            ].map(({ id, label, placeholder, tip }) => (
                                <div className="input-group" key={id}>
                                    <label htmlFor={id} className="input-label">
                                        <Tooltip text={tip}>{label}</Tooltip>
                                    </label>
                                    <input
                                        id={id}
                                        type="number"
                                        placeholder={placeholder}
                                        value={inputs[id]}
                                        onChange={(e) => handleChange(id, e.target.value)}
                                        className="calc-input"
                                        min="0"
                                    />
                                </div>
                            ))}
                            <div className="input-group flex items-center gap-3 sm:col-span-2">
                                <input
                                    id="isMetro"
                                    type="checkbox"
                                    checked={inputs.isMetro}
                                    onChange={(e) => handleChange('isMetro', e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-700"
                                />
                                <label htmlFor="isMetro" className="input-label mb-0 cursor-pointer">
                                    <Tooltip text="Metro cities (Delhi, Mumbai, Kolkata, Chennai) get 50% of basic as HRA exemption instead of 40% for non-metro cities.">
                                        Metro City
                                    </Tooltip>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Action Buttons ─────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button type="submit" id="calculate-btn" className="btn-primary flex-1">
                        <span className="mr-2">🧮</span> Calculate Take-Home Salary
                    </button>
                    <button type="button" onClick={handleReset} className="btn-secondary sm:w-auto">
                        Reset
                    </button>
                </div>
            </form>

            {/* ── Mobile Sticky Button ────────────── */}
            {!result && (
                <button
                    onClick={handleCalculate}
                    className="sm:hidden fixed bottom-4 left-4 right-4 btn-primary z-40"
                >
                    🧮 Calculate Now
                </button>
            )}

            {/* ── Results ─────────────────────────── */}
            {result && (
                <div id="results-section" className="mt-10 space-y-8 animate-slideUp">
                    <Results result={result} regime={regime} />
                    <Charts result={result} regime={regime} />
                    <MonthlyTable breakdown={result.monthlyBreakdown} regime={regime} />
                </div>
            )}
        </section>
    );
}
