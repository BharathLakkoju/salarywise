'use client';

import { formatINR } from '@/lib/taxEngine';
import { useState } from 'react';

export default function MonthlyTable({ breakdown, regime }) {
    const [expanded, setExpanded] = useState(false);
    if (!breakdown || breakdown.length === 0) return null;

    const displayData = expanded ? breakdown : breakdown.slice(0, 3);

    return (
        <div className="chart-card overflow-hidden">
            <h4 className="chart-title mb-4">📅 Monthly Salary Breakdown</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ color: 'var(--foreground)' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th className="text-left py-3 px-3 font-semibold">Month</th>
                            <th className="text-right py-3 px-3 font-semibold">Gross</th>
                            {(regime === 'new' || regime === 'compare') && (
                                <>
                                    <th className="text-right py-3 px-3 font-semibold" style={{ color: '#059669' }}>New Tax</th>
                                    <th className="text-right py-3 px-3 font-semibold" style={{ color: '#059669' }}>New Net</th>
                                </>
                            )}
                            {(regime === 'old' || regime === 'compare') && (
                                <>
                                    <th className="text-right py-3 px-3 font-semibold" style={{ color: '#3b82f6' }}>Old Tax</th>
                                    <th className="text-right py-3 px-3 font-semibold" style={{ color: '#3b82f6' }}>Old Net</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((row, i) => (
                            <tr
                                key={row.month}
                                style={{
                                    borderBottom: '1px solid var(--border)',
                                    backgroundColor: i % 2 === 0 ? 'var(--surface-hover)' : 'transparent',
                                }}
                            >
                                <td className="py-3 px-3 font-medium">{row.month}</td>
                                <td className="py-3 px-3 text-right">{formatINR(row.gross)}</td>
                                {(regime === 'new' || regime === 'compare') && (
                                    <>
                                        <td className="py-3 px-3 text-right" style={{ color: '#dc2626' }}>{formatINR(row.newRegimeTax)}</td>
                                        <td className="py-3 px-3 text-right font-semibold" style={{ color: '#059669' }}>
                                            {formatINR(row.newRegimeNet)}
                                        </td>
                                    </>
                                )}
                                {(regime === 'old' || regime === 'compare') && (
                                    <>
                                        <td className="py-3 px-3 text-right" style={{ color: '#dc2626' }}>{formatINR(row.oldRegimeTax)}</td>
                                        <td className="py-3 px-3 text-right font-semibold" style={{ color: '#3b82f6' }}>
                                            {formatINR(row.oldRegimeNet)}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className="w-full py-3 text-center text-sm font-medium transition-colors"
                    style={{ color: 'var(--accent)' }}
                >
                    Show all 12 months ▼
                </button>
            )}
            {expanded && (
                <button
                    onClick={() => setExpanded(false)}
                    className="w-full py-3 text-center text-sm font-medium transition-colors"
                    style={{ color: 'var(--accent)' }}
                >
                    Show less ▲
                </button>
            )}
        </div>
    );
}
