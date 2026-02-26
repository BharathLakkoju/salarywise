import Calculator from '@/components/Calculator';
// import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import SEOContent from '@/components/SEOContent';

export default function HomePage() {
    // JSON-LD Structured Data
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is in hand salary? How is it different from CTC?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In hand salary (take home salary) is the amount you receive in your bank account each month. CTC is the total annual package including basic, HRA, PF, bonuses. In hand salary is typically 65-75% of CTC after income tax, PF, and professional tax deductions.',
                },
            },
            {
                '@type': 'Question',
                name: 'How do I calculate my take home salary from CTC?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Subtract employer PF and gratuity from CTC to get gross salary, then subtract income tax, employee PF, and professional tax. Use our free salary calculator India to calculate in hand salary instantly from CTC.',
                },
            },
            {
                '@type': 'Question',
                name: 'Which tax regime gives better in hand salary – Old or New?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The New Regime has lower rates but no deductions. The Old Regime allows 80C, 80D, HRA deductions. If deductions exceed ₹3.75L, Old Regime may give higher take home salary. Use a salary calculator to compare.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the standard deduction for FY 2025-26?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '₹75,000 under New Regime (increased from ₹50,000). ₹50,000 under Old Regime. Automatically applied before computing taxable income.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the tax rebate under Section 87A?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Under New Regime, taxable income ≤ ₹12L gets full rebate up to ₹60,000 — effectively zero tax up to ~₹12.75L gross. Under Old Regime, rebate up to ₹12,500 if taxable income ≤ ₹5L.',
                },
            },
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://salarywise.xyz',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'In Hand Salary Calculator India',
                item: 'https://salarywise.xyz',
            },
        ],
    };

    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'In Hand Salary Calculator India – Take Home Salary Calculator',
        description: 'Free salary calculator for India. Calculate in hand salary from CTC, compare Old vs New tax regime, and see your take home salary with monthly breakdown for FY 2025-26 (AY 2026-27).',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
                {/* ── Hero Section ─────────────────── */}
                <section className="text-center mb-12 animate-fadeIn">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                        <span>🆕</span> Updated for FY 2025-26 (AY 2026-27)
                    </div>
                    <h1 className="hero-title mb-4">
                        <span className="gradient-text">In Hand Salary</span>
                        <br />
                        <span>Calculator India</span>
                    </h1>
                    <p className="hero-subtitle">
                        Free take home salary calculator for India. Enter your CTC, compare Old vs New
                        tax regime, and see your monthly in hand salary instantly.
                    </p>
                </section>

                {/* ── Ad: Above fold ───────────────── */}
                {/* <AdSlot position="above-fold" /> */}

                {/* ── Calculator ───────────────────── */}
                <section className="mb-12">
                    <Calculator />
                </section>

                {/* ── Ad: After results ─────────────── */}
                {/* <AdSlot position="after-results" /> */}

                {/* ── SEO Content ──────────────────── */}
                <SEOContent />

                {/* ── Ad: Mid content ──────────────── */}
                {/* <AdSlot position="mid-content" className="my-8" /> */}

                {/* ── FAQ ──────────────────────────── */}
                <FAQ />

                {/* ── Ad: Bottom ───────────────────── */}
                <AdSlot position="bottom" className="mt-12" />
            </div>
        </>
    );
}
