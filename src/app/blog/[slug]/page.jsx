import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description,
    };
}

// ── Blog content by slug ─────────────
const blogContent = {
    'old-vs-new-tax-regime-explained': {
        content: (
            <div className="seo-content">
                <p>
                    Choosing between the Old and New Tax Regime is one of the most important financial decisions Indian
                    taxpayers make every year. With the Union Budget 2025 making the New Tax Regime more attractive with
                    revised slabs and a higher standard deduction, this decision has become even more critical. Let&apos;s
                    break down both regimes in detail to help you make an informed choice.
                </p>

                <h2>Understanding the New Tax Regime (FY 2025-26)</h2>
                <p>
                    The New Tax Regime, which became the default option from FY 2023-24, offers significantly lower tax
                    rates across all income slabs. For FY 2025-26, the government has further sweetened the deal with
                    revised slabs starting from ₹4 lakh (up from ₹3 lakh) and an enhanced standard deduction of ₹75,000.
                </p>
                <p>
                    The most significant advantage of the New Regime is the Section 87A rebate — if your taxable income
                    (after standard deduction) is ₹12 lakh or less, you effectively pay zero tax. This means anyone
                    with a gross income up to approximately ₹12.75 lakhs pays no income tax under the New Regime.
                </p>

                <h2>Understanding the Old Tax Regime</h2>
                <p>
                    The Old Tax Regime has higher slab rates but compensates through various deductions and exemptions.
                    If you are a disciplined investor who maximizes deductions under Section 80C (₹1.5L), 80D (₹25K-₹75K),
                    NPS under 80CCD(1B) (₹50K), HRA exemption, and home loan interest deduction (₹2L), the Old Regime
                    can result in substantial tax savings.
                </p>

                <h2>When to Choose the Old Regime</h2>
                <ul>
                    <li>Your total deductions (80C + 80D + HRA + NPS + home loan) exceed ₹3.75 lakhs</li>
                    <li>You live in rented accommodation in a metro city and can claim significant HRA exemption</li>
                    <li>You have a home loan with interest payments up to ₹2 lakhs</li>
                    <li>You already have a well-structured investment portfolio under 80C</li>
                </ul>

                <h2>When to Choose the New Regime</h2>
                <ul>
                    <li>You don&apos;t have significant deductions and exemptions</li>
                    <li>Your income is up to ₹12.75 lakhs (effectively zero tax)</li>
                    <li>You prefer simplicity without tracking multiple investments for tax-saving</li>
                    <li>You are a fresher or early-career professional with minimal investments</li>
                </ul>

                <h2>Head-to-Head Comparison at Different Salary Levels</h2>
                <table>
                    <thead>
                        <tr><th>CTC</th><th>New Regime Tax</th><th>Old Regime Tax*</th><th>Better Option</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>₹6 LPA</td><td>₹0</td><td>₹0</td><td>Same</td></tr>
                        <tr><td>₹10 LPA</td><td>₹33,800</td><td>₹75,400</td><td>New Regime</td></tr>
                        <tr><td>₹15 LPA</td><td>₹1,19,600</td><td>₹1,87,200</td><td>New Regime</td></tr>
                        <tr><td>₹20 LPA</td><td>₹2,49,600</td><td>₹2,99,000</td><td>New Regime</td></tr>
                        <tr><td>₹25 LPA</td><td>₹3,95,200</td><td>₹4,11,000</td><td>New Regime</td></tr>
                    </tbody>
                </table>
                <p>
                    <em>*Old Regime assumes ₹1.5L under 80C and ₹50K standard deduction only. With additional deductions,
                        Old Regime tax would be lower.</em>
                </p>

                <h2>Conclusion</h2>
                <p>
                    For most salaried individuals without major deductions, the New Tax Regime is more beneficial due to
                    its lower slab rates and the generous ₹12 lakh rebate. However, if you actively invest in tax-saving
                    instruments and have HRA/home loan benefits, run the numbers for your specific situation using our
                    <Link href="/" className="text-accent hover:underline"> salary after tax calculator</Link>.
                </p>
            </div>
        ),
    },
    'how-to-reduce-income-tax-legally': {
        content: (
            <div className="seo-content">
                <p>
                    Paying income tax is a civic duty, but there&apos;s no reason to pay more than you legally owe.
                    The Indian Income Tax Act provides numerous provisions to help taxpayers reduce their tax liability
                    through legitimate deductions, exemptions, and smart financial planning. Here are 10 proven strategies
                    to minimize your income tax legally.
                </p>

                <h2>1. Maximize Section 80C Investments (₹1.5 Lakh)</h2>
                <p>
                    Section 80C is the most popular tax-saving provision, offering deductions up to ₹1,50,000 annually.
                    Eligible investments include ELSS mutual funds (3-year lock-in, best returns), Public Provident Fund
                    (PPF), Employee Provident Fund (EPF), National Savings Certificate (NSC), tax-saving fixed deposits
                    (5-year), life insurance premiums, children&apos;s school tuition fees, and home loan principal repayment.
                </p>

                <h2>2. Health Insurance Under Section 80D (₹25K–₹75K)</h2>
                <p>
                    Buy health insurance for yourself, your spouse, and children to claim up to ₹25,000 deduction.
                    An additional ₹25,000 (or ₹50,000 for senior citizen parents) is available for parents&apos; health
                    insurance. This means a potential ₹75,000 total deduction under 80D alone.
                </p>

                <h2>3. NPS Contribution – Section 80CCD(1B) (₹50,000)</h2>
                <p>
                    The National Pension System offers an additional ₹50,000 deduction over and above the ₹1.5L limit
                    of Section 80C. This is one of the most overlooked tax-saving avenues and can save you ₹15,600 in
                    tax if you are in the 30% bracket.
                </p>

                <h2>4. Claim HRA Exemption</h2>
                <p>
                    If you live in rented accommodation and receive HRA as part of your salary, you can claim HRA
                    exemption under the Old Regime. In metro cities, you can claim up to 50% of your basic salary as
                    HRA exemption, subject to actual rent paid. Keep rent receipts and your landlord&apos;s PAN (if rent
                    exceeds ₹1L per year).
                </p>

                <h2>5. Home Loan Tax Benefits</h2>
                <p>
                    If you have a home loan, claim deductions on both principal repayment (up to ₹1.5L under 80C) and
                    interest paid (up to ₹2L under Section 24b). For a jointly-owned property with a co-borrower,
                    both borrowers can claim these deductions separately.
                </p>

                <h2>6. Education Loan Interest – Section 80E</h2>
                <p>
                    Interest paid on education loans (for self, spouse, or children) is fully deductible under Section 80E
                    for up to 8 years. There is no upper limit on this deduction.
                </p>

                <h2>7. Donations – Section 80G</h2>
                <p>
                    Donations to approved charitable organizations qualify for 50% or 100% deduction under Section 80G.
                    Always get a receipt and ensure the organization is registered under 80G.
                </p>

                <h2>8. Leave Travel Allowance (LTA)</h2>
                <p>
                    If your employer provides LTA, you can claim tax exemption on domestic travel expenses for yourself
                    and your family. This covers actual travel costs (economy class for air, AC class for rail) and can
                    be claimed for two journeys in a block of four years.
                </p>

                <h2>9. Compare Tax Regimes Every Year</h2>
                <p>
                    Don&apos;t stick to one regime out of habit. Use our
                    <Link href="/" className="text-accent hover:underline"> salary calculator</Link> to compare
                    both regimes each year, as your deductions and income may change.
                </p>

                <h2>10. Restructure Your Salary</h2>
                <p>
                    Negotiate with your employer to include tax-efficient components like meal coupons, fuel allowance,
                    telephone reimbursement, and uniform allowance. These can reduce your taxable income while maintaining
                    the same CTC.
                </p>

                <h2>Key Takeaway</h2>
                <p>
                    The most effective tax-saving strategy combines multiple approaches: max out 80C, get health insurance,
                    contribute to NPS, claim HRA, and always compare both regimes. Start your tax planning at the beginning
                    of the financial year, not at the last minute in March.
                </p>
            </div>
        ),
    },
    'best-80c-investments': {
        content: (
            <div className="seo-content">
                <p>
                    Section 80C of the Income Tax Act allows you to claim deductions up to ₹1,50,000 per financial year
                    on specified investments and expenses. But not all 80C options are created equal — they differ in
                    returns, liquidity, risk, and lock-in period. Here&apos;s a detailed comparison to help you pick the best
                    Section 80C investments.
                </p>

                <h2>Top Section 80C Investment Options Compared</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Investment</th>
                            <th>Returns (Approx.)</th>
                            <th>Lock-in</th>
                            <th>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>ELSS Mutual Funds</td><td>12–15%</td><td>3 years</td><td>High (Market-linked)</td></tr>
                        <tr><td>PPF</td><td>7.1%</td><td>15 years</td><td>Zero (Govt. backed)</td></tr>
                        <tr><td>EPF</td><td>8.25%</td><td>Retirement</td><td>Zero (Govt. backed)</td></tr>
                        <tr><td>NPS (Tier 1)</td><td>9–12%</td><td>Retirement</td><td>Moderate</td></tr>
                        <tr><td>Tax-Saving FD</td><td>6.5–7%</td><td>5 years</td><td>Zero</td></tr>
                        <tr><td>NSC</td><td>7.7%</td><td>5 years</td><td>Zero</td></tr>
                        <tr><td>Sukanya Samriddhi</td><td>8.2%</td><td>21 years</td><td>Zero</td></tr>
                        <tr><td>Life Insurance</td><td>4–6%</td><td>Policy term</td><td>Low</td></tr>
                    </tbody>
                </table>

                <h2>Best Strategy: The 80C Pyramid</h2>
                <p>
                    Instead of putting all ₹1.5 lakh into one instrument, diversify your 80C investments for optimal
                    returns and safety:
                </p>
                <ol>
                    <li><strong>EPF contribution</strong> (auto-deducted, ~₹21,600 for basic of ₹15K/month) — safe foundation</li>
                    <li><strong>ELSS (₹50,000–₹75,000)</strong> — highest return potential with shortest lock-in</li>
                    <li><strong>PPF (₹50,000-₹75,000)</strong> — guaranteed returns, great for long-term wealth building</li>
                    <li><strong>Remaining</strong> — life insurance premium, children&apos;s tuition, home loan principal</li>
                </ol>

                <h2>Conclusion</h2>
                <p>
                    For most young professionals, ELSS is the best 80C investment due to high return potential and the
                    shortest lock-in of just 3 years. Combine it with PPF for safety and tax-free returns.
                    Use our <Link href="/" className="text-accent hover:underline">salary calculator</Link> to see how
                    80C deductions impact your tax under the Old Regime.
                </p>
            </div>
        ),
    },
    'hra-exemption-guide': {
        content: (
            <div className="seo-content">
                <p>
                    House Rent Allowance (HRA) is one of the most significant tax-saving components in a salaried
                    employee&apos;s pay structure. If you live in rented accommodation and receive HRA from your employer,
                    understanding how HRA exemption works can save you anywhere from ₹20,000 to over ₹1,00,000 in taxes
                    annually.
                </p>

                <h2>Who Can Claim HRA Exemption?</h2>
                <ul>
                    <li>You must be a salaried individual (not self-employed)</li>
                    <li>HRA must be part of your salary structure</li>
                    <li>You must actually pay rent for accommodation you occupy</li>
                    <li>You must opt for the <strong>Old Tax Regime</strong> (HRA is not available under New Regime)</li>
                </ul>

                <h2>How HRA Exemption is Calculated</h2>
                <p>The exempted HRA is the <strong>minimum</strong> of the following three amounts:</p>
                <ol>
                    <li><strong>Actual HRA received</strong> from employer</li>
                    <li><strong>50% of basic salary</strong> (if metro city) or <strong>40%</strong> (non-metro)</li>
                    <li><strong>Rent paid minus 10% of basic salary</strong></li>
                </ol>

                <h2>Example Calculation</h2>
                <p>Let&apos;s say your monthly salary structure is:</p>
                <ul>
                    <li>Basic salary: ₹40,000/month (₹4,80,000/year)</li>
                    <li>HRA received: ₹20,000/month (₹2,40,000/year)</li>
                    <li>Rent paid: ₹25,000/month (₹3,00,000/year)</li>
                    <li>City: Bangalore (metro)</li>
                </ul>
                <p>HRA exemption = Minimum of:</p>
                <ol>
                    <li>Actual HRA = ₹2,40,000</li>
                    <li>50% of Basic = ₹2,40,000</li>
                    <li>Rent – 10% Basic = ₹3,00,000 – ₹48,000 = ₹2,52,000</li>
                </ol>
                <p>
                    <strong>Exempted HRA = ₹2,40,000</strong> (minimum of the three)
                </p>
                <p>
                    This ₹2,40,000 is deducted from your taxable income, potentially saving you ₹74,880 in taxes
                    (at 30% slab + 4% cess).
                </p>

                <h2>Documentation Required</h2>
                <ul>
                    <li>Rent receipts (monthly or annual) with landlord&apos;s signature</li>
                    <li>Landlord&apos;s PAN if annual rent exceeds ₹1,00,000</li>
                    <li>Rent agreement (lease deed)</li>
                </ul>

                <h2>Pro Tips</h2>
                <ul>
                    <li>You can pay rent to parents if they own the house — this is a legitimate tax-saving strategy</li>
                    <li>Even if you don&apos;t receive HRA but pay rent, you can claim up to ₹60,000 under Section 80GG</li>
                    <li>HRA exemption is only available under the Old Tax Regime</li>
                </ul>
            </div>
        ),
    },
    'tax-on-10-lpa-salary': {
        content: (
            <div className="seo-content">
                <p>
                    A ₹10 lakhs per annum (10 LPA) salary is one of the most common salary levels in India, especially
                    for IT professionals with 2-5 years of experience. Let&apos;s calculate the exact tax and take-home salary
                    for a ₹10 LPA CTC under both tax regimes.
                </p>

                <h2>Salary Breakup (Assumed)</h2>
                <table>
                    <thead>
                        <tr><th>Component</th><th>Annual Amount</th><th>Monthly Amount</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Basic Salary (40%)</td><td>₹4,00,000</td><td>₹33,333</td></tr>
                        <tr><td>HRA (20%)</td><td>₹2,00,000</td><td>₹16,667</td></tr>
                        <tr><td>Special Allowance</td><td>₹4,00,000</td><td>₹33,333</td></tr>
                        <tr><td><strong>Total CTC</strong></td><td><strong>₹10,00,000</strong></td><td><strong>₹83,333</strong></td></tr>
                    </tbody>
                </table>

                <h2>New Tax Regime Calculation</h2>
                <table>
                    <thead><tr><th>Step</th><th>Amount</th></tr></thead>
                    <tbody>
                        <tr><td>Gross Income</td><td>₹10,00,000</td></tr>
                        <tr><td>Less: Standard Deduction</td><td>₹75,000</td></tr>
                        <tr><td>Taxable Income</td><td>₹9,25,000</td></tr>
                        <tr><td>Tax: 0-4L @ 0%</td><td>₹0</td></tr>
                        <tr><td>Tax: 4L-8L @ 5%</td><td>₹20,000</td></tr>
                        <tr><td>Tax: 8L-9.25L @ 10%</td><td>₹12,500</td></tr>
                        <tr><td>Total Slab Tax</td><td>₹32,500</td></tr>
                        <tr><td>Cess (4%)</td><td>₹1,300</td></tr>
                        <tr><td><strong>Total Tax</strong></td><td><strong>₹33,800</strong></td></tr>
                        <tr><td><strong>Monthly Take-Home</strong></td><td><strong>₹80,517</strong></td></tr>
                    </tbody>
                </table>

                <h2>Old Tax Regime Calculation (No Deductions)</h2>
                <table>
                    <thead><tr><th>Step</th><th>Amount</th></tr></thead>
                    <tbody>
                        <tr><td>Gross Income</td><td>₹10,00,000</td></tr>
                        <tr><td>Less: Standard Deduction</td><td>₹50,000</td></tr>
                        <tr><td>Taxable Income</td><td>₹9,50,000</td></tr>
                        <tr><td>Tax: 0-2.5L @ 0%</td><td>₹0</td></tr>
                        <tr><td>Tax: 2.5L-5L @ 5%</td><td>₹12,500</td></tr>
                        <tr><td>Tax: 5L-9.5L @ 20%</td><td>₹90,000</td></tr>
                        <tr><td>Total Slab Tax</td><td>₹1,02,500</td></tr>
                        <tr><td>Cess (4%)</td><td>₹4,100</td></tr>
                        <tr><td><strong>Total Tax (no deductions)</strong></td><td><strong>₹1,06,600</strong></td></tr>
                        <tr><td><strong>Monthly Take-Home</strong></td><td><strong>₹74,450</strong></td></tr>
                    </tbody>
                </table>

                <h2>With 80C Deductions (Old Regime)</h2>
                <p>
                    If you invest ₹1.5L under Section 80C (PPF + ELSS) and have ₹25K health insurance (80D):
                </p>
                <table>
                    <thead><tr><th>Step</th><th>Amount</th></tr></thead>
                    <tbody>
                        <tr><td>Taxable Income</td><td>₹7,75,000</td></tr>
                        <tr><td>Tax</td><td>₹67,600</td></tr>
                        <tr><td><strong>Monthly Take-Home</strong></td><td><strong>₹77,700</strong></td></tr>
                    </tbody>
                </table>

                <h2>Verdict</h2>
                <p>
                    At ₹10 LPA, the <strong>New Tax Regime is clearly better</strong>, saving you ₹33,800 vs ₹67,600
                    even after ₹1.75L in deductions under the Old Regime. Use our
                    <Link href="/" className="text-accent hover:underline"> calculator</Link> to check with your exact
                    deduction amounts.
                </p>
            </div>
        ),
    },
};

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const postMeta = blogPosts.find((p) => p.slug === slug);
    const postBody = blogContent[slug];

    if (!postMeta || !postBody) {
        notFound();
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: postMeta.title,
        description: postMeta.description,
        datePublished: postMeta.date,
        author: {
            '@type': 'Organization',
            name: 'India Salary Calculator',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="mb-8 animate-fadeIn">
                    <Link
                        href="/blog"
                        className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1 mb-4"
                    >
                        ← Back to Blog
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">
                            {postMeta.category}
                        </span>
                        <span className="text-xs text-muted">{postMeta.date}</span>
                        <span className="text-xs text-muted">·</span>
                        <span className="text-xs text-muted">{postMeta.readTime}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">{postMeta.title}</h1>
                    <p className="text-muted text-base">{postMeta.description}</p>
                </div>

                <AdSlot position="above-fold" />

                <div className="mt-8 animate-slideUp">
                    {postBody.content}
                </div>

                <AdSlot position="bottom" className="mt-8" />

                <div className="mt-12 p-6 calc-card text-center">
                    <p className="text-lg font-semibold mb-2">💡 Try Our Free Calculator</p>
                    <p className="text-muted text-sm mb-4">
                        Calculate your exact take-home salary and compare tax regimes instantly.
                    </p>
                    <Link href="/" className="btn-primary inline-block">
                        Calculate Your Salary →
                    </Link>
                </div>
            </div>
        </>
    );
}
