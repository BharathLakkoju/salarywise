'use client';

import { useState } from 'react';

const faqData = [
    {
        q: 'What is the difference between CTC and in-hand salary?',
        a: 'CTC (Cost to Company) is the total amount a company spends on an employee annually, including basic salary, HRA, PF contribution, bonuses, and other benefits. In-hand salary (take-home salary) is what you actually receive after deducting income tax, PF, professional tax, and other deductions. Typically, in-hand salary is 65-75% of CTC for most employees.',
    },
    {
        q: 'Which tax regime is better – Old or New?',
        a: 'It depends on your deductions. The New Tax Regime (FY 2025-26) offers lower slab rates and a higher standard deduction (₹75,000) but does not allow most exemptions like 80C, 80D, or HRA. The Old Regime offers higher slab rates but allows deductions. If your total deductions under the Old Regime exceed approximately ₹3.75 lakhs, the Old Regime may be more beneficial. Use our calculator above to compare both regimes for your specific salary.',
    },
    {
        q: 'What is the standard deduction for FY 2025-26?',
        a: 'Under the New Tax Regime, the standard deduction for salaried employees is ₹75,000 (increased from ₹50,000 in the 2024 Union Budget). Under the Old Tax Regime, it remains ₹50,000. This deduction is automatically applied to your gross salary before computing taxable income.',
    },
    {
        q: 'How is income tax calculated in India?',
        a: 'Income tax in India is calculated using a slab-based system. Your gross income is first reduced by applicable deductions (standard deduction, 80C, 80D, etc. under Old Regime). The resulting taxable income is then taxed at progressive slab rates. A 4% Health and Education Cess is added to the tax amount. If your income exceeds ₹50 lakhs, a surcharge is also applicable.',
    },
    {
        q: 'What is the tax rebate under Section 87A?',
        a: 'Under the New Tax Regime for FY 2025-26, if your total taxable income (after standard deduction) is ₹12,00,000 or less, you are eligible for a tax rebate under Section 87A of up to ₹60,000, effectively making your tax liability zero. Under the Old Regime, the rebate is available if taxable income is ₹5,00,000 or less (rebate up to ₹12,500).',
    },
    {
        q: 'Is this calculator accurate for FY 2026-27?',
        a: 'This calculator uses the latest available tax slabs from the Union Budget 2025 (FY 2025-26 / AY 2026-27). The FY 2026-27 slabs will be updated when the next Union Budget is presented. Tax rules are subject to change, and we update the calculator promptly when new slabs are announced.',
    },
    {
        q: 'Do I need to file ITR if my income is below the taxable limit?',
        a: 'While you may not owe any tax if your income is below the basic exemption limit (₹2.5L for Old Regime, ₹3L for New Regime) or if you qualify for full rebate under Section 87A, it is still advisable to file your ITR (Income Tax Return) to maintain financial records, claim TDS refunds, and for visa/loan applications.',
    },
    {
        q: 'How does HRA exemption work?',
        a: 'HRA (House Rent Allowance) exemption is available only under the Old Tax Regime. It is the minimum of: (1) Actual HRA received, (2) 50% of basic salary for metro cities or 40% for non-metro cities, and (3) Rent paid minus 10% of basic salary. You need to pay rent and have HRA as part of your salary to claim this exemption.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="gradient-text">❓ Frequently Asked Questions</span>
            </h2>
            <div className="calc-card">
                {faqData.map((faq, i) => (
                    <div key={i} className="faq-item">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="faq-question w-full text-left"
                        >
                            <span>{faq.q}</span>
                            <span className={`transform transition-transform duration-300 text-muted ${openIndex === i ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>
                        {openIndex === i && (
                            <div className="faq-answer animate-fadeIn">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
