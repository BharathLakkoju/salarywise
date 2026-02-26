'use client';

import { useState } from 'react';

const faqData = [
    {
        q: 'What is in hand salary? How is it different from CTC?',
        a: 'In hand salary (also called take home salary) is the amount you actually receive in your bank account each month. CTC (Cost to Company) is the total annual package including basic salary, HRA, PF, bonuses, and perks. Your in hand salary is typically 65-75% of CTC after deducting income tax, employee PF, and professional tax.',
    },
    {
        q: 'How do I calculate my take home salary from CTC?',
        a: 'To calculate take home salary: subtract employer PF and gratuity from CTC to get gross salary, then subtract income tax, employee PF, and professional tax. Use our salary calculator India tool above to do this instantly — just enter your CTC and see your monthly in hand salary for both Old and New tax regimes.',
    },
    {
        q: 'Which tax regime gives better in hand salary – Old or New?',
        a: 'It depends on your deductions. The New Tax Regime offers lower slab rates and ₹75,000 standard deduction but no exemptions (80C, 80D, HRA). The Old Regime allows deductions. If your total deductions exceed ~₹3.75 lakhs, Old Regime may give higher take home salary. Use the salary calculator above to compare for your specific CTC.',
    },
    {
        q: 'What is the standard deduction for FY 2025-26?',
        a: '₹75,000 under the New Tax Regime (increased from ₹50,000 in the 2024 Budget). Under the Old Tax Regime, it remains ₹50,000. This deduction is automatically applied before computing taxable income, increasing your in hand salary.',
    },
    {
        q: 'How is income tax calculated in India?',
        a: 'Income tax is calculated using progressive slab rates. Gross income minus deductions (standard deduction, 80C, 80D, HRA under Old Regime) gives taxable income. Tax is computed slab-wise, then 4% Health & Education Cess is added. Surcharge applies above ₹50L income. Our salary calculator handles all this automatically.',
    },
    {
        q: 'What is the tax rebate under Section 87A?',
        a: 'Under the New Regime, if taxable income ≤ ₹12,00,000, you get full tax rebate up to ₹60,000 — effectively zero tax up to ~₹12.75L gross income. Under Old Regime, rebate is available if taxable income ≤ ₹5,00,000 (up to ₹12,500). This can significantly increase your take home salary.',
    },
    {
        q: 'Is this salary calculator accurate for FY 2026-27?',
        a: 'This in hand salary calculator uses the latest tax slabs from Union Budget 2025 (FY 2025-26 / AY 2026-27). We update the salary calculator promptly when new slabs are announced. Tax rules are subject to change with each Union Budget.',
    },
    {
        q: 'How does HRA exemption increase take home salary?',
        a: 'HRA exemption (Old Regime only) is the minimum of: actual HRA received, 50%/40% of basic (metro/non-metro), or rent paid minus 10% of basic. If you pay rent and receive HRA, this exemption reduces taxable income and increases your in hand salary. Enter your rent in the salary calculator to see the impact.',
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
