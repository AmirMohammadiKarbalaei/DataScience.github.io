# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Recruiters and hiring managers come first: they skim quickly to decide whether to shortlist or contact Amir. Technical peers and leads come second, and read project pages in depth to judge the quality of the work.

## Product Purpose
Amir Mohammadikarbalaei's personal portfolio (https://amir-data.vercel.app). It shows who he is, the level he works at and the range of his work, so a visitor either gets in touch or goes deeper into a project. Success is a recruiter reaching out, or a technical reader trusting his judgement after reading a project write-up.

## Positioning
Breadth across ML domains, shown through real projects rather than claimed: NLP and LLMs, reinforcement learning, time series, data engineering and BI, alongside current NLP and analytics work at Unilever.

## Operating Context
- Visitors arrive from LinkedIn, GitHub and job applications. Link previews rely on static Open Graph tags in `index.html`.
- Pages: home (`/`), experience (`/experience`) and project detail (`/project/:id`). Project content lives in `src/data/projects.ts`.
- Stack: React, TypeScript and Vite, deployed on Vercel, with Google Analytics via gtag in `index.html`.

## Capabilities and Constraints
- Filters on the homepage are generated from project categories, so counts cannot drift from the data.
- Undecided: per-card evidence (a metric or screenshot) beyond the current descriptions.

## Brand Commitments
- Keep the typing hero ("I'm a Data Scientist / a Data Analyst / an ML Engineer") and the particle background. Both are confirmed parts of the identity.
- All copy uses British English (optimisation, visualisation, modelling).
- No downloadable CV anywhere on the site.

## Evidence on Hand
- Project write-ups with results in `src/data/projects.ts`, for example a DDPG mean return of 12,050 against a 10,000 benchmark, and an EEG private AUC of 0.910 rising to 0.965.
- Unilever outcomes on the Experience page: 1,300 hours of manual review saved a year, and a quality framework across 15,000+ knowledge articles.
- Portrait at `public/media/profile.jpg`, and a hero banner at `public/media/data-science-new-banner.jpg`.
- Absent: testimonials, a CV and availability statements. Do not fabricate them.

## Product Principles
1. Show, don't claim: every capability on the page should point to a project or a documented result.
2. Recruiter first: who, what level and what range must be clear in the first viewport.
3. Depth one click away: cards summarise, and project pages carry the full evidence.
4. Truthful copy: only facts already published by Amir; ask before adding any claim.
