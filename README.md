# SalaryWise

> A salary intelligence web app for job seekers — compare pay across roles, companies, and cities in the Indian tech market.

**Live site:** [salarywise.xyz](https://salarywise.xyz)

---

## About

SalaryWise helps developers and professionals make data-driven salary decisions when switching jobs. The app presents salary benchmarks broken down by role, city, and company tier, alongside editorial blog content covering compensation trends in Indian tech.

## Features

- Browse salary ranges by role (Frontend, Backend, Fullstack, Data, DevOps, etc.)
- Compare pay across companies and city tiers
- SEO-optimized blog with salary insights and career advice
- Sitemap and robots.txt for search engine indexing
- Fast-loading, clean UI built for readability
- Google AdSense monetization

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Language | JavaScript / JSX |
| Deployment | Vercel |

## Local Development

```bash
git clone https://github.com/BharathLakkoju/salarywise
cd salarywise
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.jsx          # Home — salary comparison UI
│   ├── blog/             # Blog articles
│   ├── sitemap.js        # SEO sitemap
│   └── robots.js         # SEO robots config
├── components/           # Reusable UI components
└── lib/
    └── blogData.js       # Blog post metadata
```

## License

MIT
