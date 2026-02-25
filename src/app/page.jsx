import Calculator from '@/components/Calculator';
import AdSlot from '@/components/AdSlot';
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
                name: 'What is the difference between CTC and in-hand salary?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'CTC (Cost to Company) is the total annual expense a company incurs for an employee. In-hand salary is what you receive after deductions. Typically 65-75% of CTC.',
                },
            },
            {
                '@type': 'Question',
                name: 'Which tax regime is better – Old or New for FY 2025-26?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The New Regime offers lower rates but no deductions. The Old Regime allows deductions under 80C, 80D, HRA. If your deductions exceed ₹3.75L, Old Regime may be better.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the standard deduction for FY 2025-26?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Under New Regime: ₹75,000. Under Old Regime: ₹50,000.',
                },
            },
            {
                '@type': 'Question',
                name: 'How is income tax calculated in India?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Gross income minus deductions equals taxable income. Tax is computed on taxable income using slab rates. 4% cess is added. Surcharge applies above ₹50L.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the tax rebate under Section 87A?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Under New Regime, if taxable income ≤ ₹12L, rebate up to ₹60,000 is available. Under Old Regime, if taxable income ≤ ₹5L, rebate up to ₹12,500.',
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
                item: 'https://salarycalculator.in',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Salary After Tax Calculator',
                item: 'https://salarycalculator.in',
            },
        ],
    };

    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Salary After Tax Calculator India',
        description: 'Free salary after tax calculator for India. Compare Old vs New tax regime for FY 2026-27.',
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
                        <span className="gradient-text">Salary After Tax</span>
                        <br />
                        <span>Calculator India</span>
                    </h1>
                    <p className="hero-subtitle">
                        Calculate your in-hand salary instantly. Compare Old vs New tax regime.
                        See monthly breakdown, tax savings, and visual charts — all for free.
                    </p>
                </section>

                {/* ── Ad: Above fold ───────────────── */}
                <AdSlot position="above-fold" />

                {/* ── Calculator ───────────────────── */}
                <section className="mb-12">
                    <Calculator />
                </section>

                {/* ── Ad: After results ─────────────── */}
                <AdSlot position="after-results" />

                {/* ── SEO Content ──────────────────── */}
                <SEOContent />

                {/* ── Ad: Mid content ──────────────── */}
                <AdSlot position="mid-content" className="my-8" />

                {/* ── FAQ ──────────────────────────── */}
                <FAQ />

                {/* ── Ad: Bottom ───────────────────── */}
                <AdSlot position="bottom" className="mt-12" />
            </div>
        </>
    );
}
