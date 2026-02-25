'use client';

import { formatINR } from '@/lib/taxEngine';

export default function Results({ result, regime }) {
    if (!result) return null;

    const { newRegime, oldRegime, comparison } = result;

    const showNew = regime === 'new' || regime === 'compare';
    const showOld = regime === 'old' || regime === 'compare';
    const showComparison = regime === 'compare';

    const ResultCard = ({ label, value, subtext, highlight, icon }) => (
        /* minimal flat card */
        <div className={`result-card ${highlight ? 'result-card-highlight' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
                {/* <span className="text-lg">{icon}</span> */}
                <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
            <p className="text-lg sm:text-xl font-bold tracking-tight">{value}</p>
            {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
    );

    const RegimeBlock = ({ data, title, color }) => (
        <div className={`regime-block ${color}`}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${color === 'regime-new' ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
                {title}
            </h4>
            <div className="grid grid-cols-2 gap-3">
                <ResultCard icon="📊" label="Taxable Income" value={formatINR(data.taxableIncome)} />
                <ResultCard icon="🏛️" label="Total Tax" value={formatINR(data.totalTax)} />
                <ResultCard icon="💰" label="Monthly Take-Home" value={formatINR(data.monthlyTakeHome)} highlight />
                <ResultCard icon="📈" label="Effective Rate" value={`${data.effectiveRate}%`} />
            </div>
            {/* Detailed breakdown */}
            <div className="mt-4 space-y-2">
                <h5 className="text-sm font-medium text-slate-400">Detailed Breakdown</h5>
                <div className="breakdown-table">
                    <div className="breakdown-row">
                        <span>Gross Income</span>
                        <span>{formatINR(data.grossIncome)}</span>
                    </div>
                    <div className="breakdown-row">
                        <span>Standard Deduction</span>
                        <span>- {formatINR(data.stdDeduction)}</span>
                    </div>
                    {data.regime === 'old' && data.totalDeductions > data.stdDeduction && (
                        <div className="breakdown-row">
                            <span>Other Deductions (80C/80D/HRA etc.)</span>
                            <span>- {formatINR(data.totalDeductions - data.stdDeduction)}</span>
                        </div>
                    )}
                    <div className="breakdown-row font-semibold">
                        <span>Net Taxable Income</span>
                        <span>{formatINR(data.taxableIncome)}</span>
                    </div>
                    <div className="breakdown-row">
                        <span>Tax on Above</span>
                        <span>{formatINR(data.slabTax + (data.rebate || 0))}</span>
                    </div>
                    {data.rebate > 0 && (
                        <div className="breakdown-row text-emerald-400">
                            <span>Less: Rebate u/s 87A</span>
                            <span>- {formatINR(data.rebate)}</span>
                        </div>
                    )}
                    {data.surcharge > 0 && (
                        <div className="breakdown-row">
                            <span>Surcharge</span>
                            <span>+ {formatINR(data.surcharge)}</span>
                        </div>
                    )}
                    <div className="breakdown-row">
                        <span>Health & Education Cess (4%)</span>
                        <span>+ {formatINR(data.cess)}</span>
                    </div>
                    <div className="breakdown-row font-bold text-base border-t border-slate-600 pt-2">
                        <span>Total Tax Payable</span>
                        <span>{formatINR(data.totalTax)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
                <span className="gradient-text">Your Tax Calculation Results</span>
            </h2>

            {/* Comparison banner */}
            {showComparison && (
                <div className={`comparison-banner ${comparison.betterRegime === 'new' ? 'banner-new' : 'banner-old'}`}>
                    <div className="text-center">
                        <p className="text-lg font-bold">
                            {comparison.betterRegime === 'new' ? '🏆 New Regime' : '🏆 Old Regime'} saves you more!
                        </p>
                        <p className="text-3xl font-extrabold mt-1">{formatINR(comparison.taxSavings)}</p>
                        <p className="text-sm opacity-80 mt-1">
                            {formatINR(comparison.monthlySavings)}/month in tax savings
                        </p>
                    </div>
                </div>
            )}

            {/* Regime results */}
            <div className={`grid gap-6 ${showComparison ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                {showNew && <RegimeBlock data={newRegime} title="New Tax Regime" color="regime-new" />}
                {showOld && <RegimeBlock data={oldRegime} title="Old Tax Regime" color="regime-old" />}
            </div>
        </div>
    );
}
