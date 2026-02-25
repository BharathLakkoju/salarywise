import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export const metadata = {
    title: 'Tax Blog – Income Tax Guides, Tips & Strategies',
    description:
        'Expert articles on Indian income tax, tax-saving strategies, 80C investments, HRA exemption, and Old vs New regime comparison.',
};

export default function BlogPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salarycalculator.in' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://salarycalculator.in/blog' },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="text-center mb-12 animate-fadeIn">
                    <h1 className="hero-title mb-4">
                        <span className="gradient-text">Tax & Salary</span>
                        <br />
                        <span>Knowledge Hub</span>
                    </h1>
                    <p className="hero-subtitle">
                        Expert guides on income tax, salary planning, and tax-saving strategies for Indian professionals.
                    </p>
                </div>

                <div className="grid gap-6">
                    {blogPosts.map((post, i) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article
                                className="blog-card animate-fadeIn"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">{post.emoji}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-semibold bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-muted">{post.date}</span>
                                            <span className="text-xs text-muted">·</span>
                                            <span className="text-xs text-muted">{post.readTime}</span>
                                        </div>
                                        <h2 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-muted line-clamp-2">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
