---
target: homepage
total_score: 14
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\amoha\\projects\\DataScience.github.io\\react\\react-app\\src\\components\\Home.tsx"
target_fingerprint: "sha256:11ffe93b15ae8e34fc1d70af724b71de5e8ee4c69999a02e766465629633173f"
target_path: "C:\\Users\\amoha\\projects\\DataScience.github.io\\react\\react-app\\src\\components\\Home.tsx"
timestamp: 2026-09-28T12-51-59Z
slug: src-components-home-tsx
closed: true
---
Method: dual-agent (A: design review, B: detector + browser overlay)

Target: homepage "/" (src/components/Home.tsx). Desktop 1512px viewed in browser; mobile claims are from source only (the browser window would not resize).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | The preloader shows a made-up percentage. The nav highlights two sections at once, and the dot nav lags a section behind. |
| 2 | Match System / Real World | 2 | The typing line reads "a ML Engineer". "Una Bot Analyst" is internal jargon that works against the hero's claim. |
| 3 | User Control and Freedom | 2 | The quick-actions menu opens on hover. There is no reduced-motion escape from the typing, particles or glow. |
| 4 | Consistency and Standards | 1 | Three floating nav systems, two progress bars, a half-rendered " />" on titles, a brand link underlined like a default link, and filter styles that drift from DESIGN.md. |
| 5 | Error Prevention | 3 | Empty filters are hidden; there is little else that can go wrong. |
| 6 | Recognition Rather Than Recall | 2 | Quick actions and social links are icon-only. Four domains are folded into "AI & ML". |
| 7 | Flexibility and Efficiency | n/a | Static portfolio. |
| 8 | Aesthetic and Minimalist Design | 1 | A 42-chip skills wall, a stock banner cut off at the sides, empty image areas on the cards, and six pieces of motion competing. |
| 9 | Error Recovery | 2 | Card images and Lottie animations have no fallback if they fail to load. |
| 10 | Help and Documentation | n/a | Portfolio. |
| **Total** | | **14/32** | **Poor (44%)** |

## Design Specificity Verdict

LLM assessment: category-interchangeable. The first viewport is a stock "hand holding glowing icons" banner, a nameless half-typed "I'm a Dat…", particles and a gradient CTA with a rocket icon. The only authored signals are the Unilever sentence and the code-syntax headings, and the headings render as orphan " />". The strongest asset, a set of unusual projects across many domains (PII-masking proxy, USPTO patent pipeline, EEG, RL locomotion, autodiff from scratch), sits about three screens down behind generic About copy and a 42-chip skills wall.

Deterministic scan: the CLI found 0 findings on the homepage markup. Across all of src/components it found 1 advisory: a 10px radius outside the DESIGN.md scale at ProjectDetail.tsx:314. The browser overlay found 67 anti-patterns on "/":
- dark-glow: 32
- ai-color-palette: 36 lines
- gradient-text: 4
- layout-transition: 4
- justified-text: 2
- line-length: 1
- blinking-cursor: 1
- page-level: overused Inter, bounce easing, pulsing dot, grid background

On /experience it found 25, including a real contrast failure: a.back-home-btn, white on #00d4ff, 1.8:1.

False positives: the cyan palette, gradient text, glows, blinking cursor, grid and Inter are documented choices in DESIGN.md. They confirm the system is internally consistent, but the detector correctly reads it as a saturated "AI neon" pattern, which matches the specificity verdict.

Detector catches the design review missed: justified text and long lines in the About paragraph, the /experience contrast failure, 10.88px text, uneven heading spacing on /experience, and progress bars that animate width.

## Overall Impression

The system is internally coherent but interchangeable, and it hides the person. A recruiter gets a fake loader, then an anonymous half-typed job title over a clipped stock image. The work, which is genuinely distinctive and wide-ranging, arrives last. Biggest opportunity: lead with who Amir is and the breadth of his work, and let the projects be the hero.

## What's Working

1. The project data is honest and specific. The filter row is generated from the data with counts that can't drift. Titles like "Patent Text Pipeline at USPTO Scale" signal an engineering-minded practitioner.
2. The Unilever hero sentence is concrete, current and credible. It's the best copy on the page.
3. The inflated claims are already gone ("Problems Solved", "Expert"), and the skills grid is dense but tidy and readable.

## Priority Issues

**[P0] The first viewport doesn't say who, what level, or how broad.** The h1 is visually hidden (Home.tsx:316). The only identity is a typing line caught half-typed, plus a roughly 1.5s fake preloader. Fix: make the name the visible Display h1, add a static domain line (NLP & LLMs · RL · Time Series · CV · BI) and a credential line (4+ yrs · MSc Bath · Unilever), keep the typing line as a flourish underneath, and delete the preloader. Commands: clarify, then typeset.

**[P1] The hero banner is cut off by leftover Vite CSS and collides with the typing text.** App.css `#root { max-width:1280px; padding:2rem; text-align:center }` crops the stock banner with hard edges at x≈215 and x≈1290, and the typed role runs over the chart artwork. Fix: delete the App.css #root rules. Replace the stock banner with something personal, or drop it in favour of the particle field. Commands: layout, bolder.

**[P1] Breadth is claimed but not shown, and the projects are too deep.** "AI & Machine Learning" matches 8 of the 11 projects, and RL, Time Series and CV have no filters. The CV claims have no live project behind them. The first card title starts at y≈745 on a 795px viewport, the image areas are empty panels, and the last row is orphaned. Fix: build the filters by domain, link or cut the unsupported pills, move Projects up, tighten the vertical spacing, and give each card a piece of evidence (a metric or screenshot). Commands: distill, layout.

**[P1] Keyboard, focus, motion and contrast are broken.**
- The quick-actions toggle is a `<div onClick>` with no keyboard access.
- The index.css has no :focus-visible rules.
- Back-to-top and the hamburger have no accessible names, and filters lack aria-pressed.
- The profile image alt is "Profile".
- Reduced motion only stops the marquee.
- /experience back button is 1.8:1.

Fix: use real buttons with aria-expanded and aria-pressed, add a global 2px cyan focus ring, freeze the typing, particles, glow and zoom under prefers-reduced-motion, and fix the contrast. Command: harden.

**[P2] The floating controls are loud and the close is quiet.**
- The same destinations appear up to four times: navbar, quick-actions, dot nav, back-to-top.
- There are two progress bars, and the nav highlights the wrong section.
- The quick-action buttons use off-palette green, amber, purple and red.
- The page ends on "Get In Touch!()" with three icons: no email text, no CV, no "open to" line.

Fix: keep the navbar and one back-to-top control and delete the rest. End with a stated role target, a visible email address, a CV download and a grammatical `contact()`. Commands: quieter, clarify.

## Persona Red Flags

- **Technical recruiter (40 portfolios an afternoon):** fake loader, anonymous hero, "4+ years" buried in an About badge, projects about three screens down, no CV, no copyable email. Likely bounces before reaching the best part.
- **Jordan (first-timer):** icon-only floating controls, "Una Bot", the vague "View Full Journey", half-typed words.
- **Sam (keyboard/screen reader):** can't open quick-actions, sees no focus, meets unnamed buttons, hears the typing text change, and may hear generated " />" read aloud.
- **Casey (mobile, from source):** likely layout jump as the typing line empties, a 320px portrait inside #root padding, the 60px FAB over content, and a long skills scroll before any project.

## Minor Observations

- The rocket icon sits flush against the "View Projects" label with no gap.
- The "Amir.Data" brand is underlined like an unstyled link.
- Text errors: "Topic Modeling" should be "Topic Modelling" (British English); "patient's" needs checking; "a ML" should be "an ML".
- The About paragraph is justified with lines of about 90 characters.
- Progress bars animate `width`; use transform instead.
- The Navigation progress bar never updates, so it's dead code. So are animateStats and statsRef.
- The filter buttons drift from DESIGN.md: 8px corners and a solid fill, where the documented chip is a 25px capsule with a light cyan wash.
- The portrait aura is the most saturated element in the About viewport.
- Heading spacing is uneven on /experience, and "First Class" is set at 10.88px.

## Questions to Consider

- If a recruiter only sees the first viewport, does it say anything a blank template doesn't? Why is the name hidden?
- The positioning is breadth, so why do four of five domains share one filter?
- The page has three navigation systems and a preloader but no CV link or visible email address. Which of those helps someone hire you?
