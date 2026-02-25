import { Inter } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://salarychecker.xyz'),
    title: {
        default: 'Salary After Tax Calculator India – FY 2026-27 | Free In-Hand Salary Calculator',
        template: '%s | SalaryChecker',
    },
    description:
        'Free salary after tax calculator for India. Calculate your in-hand salary, compare Old vs New tax regime, and estimate monthly take-home pay for FY 2026-27. Accurate income tax calculator with 80C, 80D, HRA deductions.',
    keywords: [
        'salary after tax calculator India',
        'in hand salary calculator',
        'income tax calculator FY 2026-27',
        'new vs old tax regime comparison',
        'CTC to take home calculator',
        'monthly salary calculator India',
        'income tax calculator India',
    ],
    openGraph: {
        title: 'Salary After Tax Calculator India – FY 2026-27',
        description: 'Calculate your in-hand salary. Compare Old vs New tax regime. Free & accurate.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'SalaryChecker',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Salary After Tax Calculator India – FY 2026-27',
        description: 'Calculate your in-hand salary. Compare Old vs New tax regime. Free & accurate.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                {/* Google Analytics placeholder */}
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
                    }}
                />
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>


                {/* ── Header ─────────────────────────── */}
                <header className="site-header">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="font-bold text-lg tracking-tight">
                            <span className="gradient-text">SalaryChecker</span>
                        </Link>
                        <nav className="flex items-center gap-4 sm:gap-6">
                            <Link href="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                                Calculator
                            </Link>
                            <Link href="/blog" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                                Blog
                            </Link>
                            <ThemeToggle />
                        </nav>
                    </div>
                </header>

                {/* ── Main ───────────────────────────── */}
                <main className="relative z-10">
                    {children}
                </main>

                {/* ── Footer ─────────────────────────── */}
                <footer className="site-footer">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h4 className="font-bold text-foreground mb-3">SalaryChecker</h4>
                                <p className="text-sm leading-relaxed">
                                    Free, accurate salary after tax calculator for Indian employees. Compare Old and New tax regimes for FY 2026-27.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-3">Quick Links</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/" className="hover:text-accent transition-colors">Tax Calculator</Link></li>
                                    <li><Link href="/blog" className="hover:text-accent transition-colors">Tax Blog</Link></li>
                                    <li><a href="#faq" className="hover:text-accent transition-colors">FAQs</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-3">Disclaimer</h4>
                                <p className="text-xs leading-relaxed">
                                    This calculator provides estimates only and should not be considered financial advice. Tax calculations are based on publicly available tax slabs and rules. No personal data is stored. Always consult a qualified Chartered Accountant for precise tax planning.
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-border pt-6 text-center text-xs">
                            <p>© {new Date().getFullYear()} SalaryChecker. All rights reserved.</p>
                            <p className="mt-1">Not affiliated with any government entity.</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
