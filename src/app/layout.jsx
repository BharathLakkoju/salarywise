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
    metadataBase: new URL('https://salarywise.xyz'),
    title: {
        default: 'In Hand Salary Calculator India – Take Home Salary Calculator FY 2026-27 | SalaryWise',
        template: '%s | SalaryWise – Salary Calculator India',
    },
    description:
        'Free in hand salary calculator for India. Calculate your take home salary instantly from CTC. Salary calculator India with Old vs New regime comparison, monthly breakdown, and tax savings for FY 2025-26 (AY 2026-27).',
    keywords: [
        'in hand salary calculator',
        'in hand salary calculator india',
        'in hand salary calculator in india',
        'take home salary calculator',
        'take home salary calculator india',
        'take home salary calculator in india',
        'salary calculator',
        'salary calculator india',
        'salary calculator in india',
        'salary after tax calculator india',
        'CTC to in hand salary calculator',
        'CTC to take home calculator india',
        'income tax calculator india',
        'income tax calculator FY 2026-27',
        'new vs old tax regime calculator',
        'monthly salary calculator india',
    ],
    openGraph: {
        title: 'In Hand Salary Calculator India – Take Home Salary Calculator | SalaryWise',
        description: 'Free salary calculator India. Calculate in hand salary from CTC, compare Old vs New tax regime, see monthly take home pay for FY 2026-27.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'SalaryWise',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'In Hand Salary Calculator India | Take Home Salary Calculator FY 2026-27',
        description: 'Free salary calculator India. Calculate in hand salary from CTC, compare Old vs New tax regime. Accurate take home salary calculator.',
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
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4502367300665202"
                    crossorigin="anonymous"></script>
                <meta name="google-site-verification" content="tmihljXdDJciZcG_KNrJ0Jz9eRjcvM656wNKlXj4Fvc" />
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                {/* ── Header ─────────────────────────── */}
                <header className="site-header">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                        <Link href="/" className="font-bold text-lg tracking-tight">
                            <span className="gradient-text">SalaryWise</span>
                        </Link>
                        <nav className="flex items-center gap-5">
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
                <main className="relative z-10">{children}</main>

                {/* ── Footer ─────────────────────────── */}
                <footer className="site-footer">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h4 className="font-bold text-foreground mb-2">SalaryWise</h4>
                                <p className="text-sm leading-relaxed">
                                    Free, accurate salary after tax calculator for Indian employees.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-2">Links</h4>
                                <ul className="space-y-1.5 text-sm">
                                    <li><Link href="/" className="hover:text-accent transition-colors">Calculator</Link></li>
                                    <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
                                    <li><a href="#faq" className="hover:text-accent transition-colors">FAQs</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-2">Disclaimer</h4>
                                <p className="text-xs leading-relaxed opacity-80">
                                    Estimates only. Not financial advice. Always consult a CA for precise tax planning.
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-border pt-5 text-center text-xs opacity-70">
                            <p>© {new Date().getFullYear()} SalaryWise · Not affiliated with any government entity</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
