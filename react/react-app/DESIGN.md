---
name: Amir Mohammadikarbalaei — Data Science Portfolio
description: A restrained dark signal-lab portfolio. One muted teal accent, white type and glass readouts sit on a faint measurement grid.
colors:
  signal-teal: "#5bb8cc"
  signal-teal-hover: "#6cc3d5"
  field-solid: "#0d0f18"
  field-raised: "#151826"
  void-black: "#0a0a0f"
  nebula-navy: "#1a1a2e"
  abyss-blue: "#16213e"
  glass-surface: "rgba(0, 0, 0, 0.4)"
  signal-hairline: "rgba(91, 184, 204, 0.2)"
  signal-wash: "rgba(91, 184, 204, 0.1)"
  starlight-white: "#ffffff"
  soft-silver: "#e0e0e0"
  mist-grey: "#b0b0b0"
  ice-text: "#e6faff"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.75rem, 8vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
  section:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
  heading:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  subheading:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
  micro:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  rule: "1px"
  swatch: "2px"
  mark: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  chip: "25px"
  capsule: "30px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "10px"
  md: "16px"
  lg: "20px"
  xl: "30px"
  xxl: "60px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
    typography: "{typography.body}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.signal-teal}"
    rounded: "30px"
    padding: "13px 28px"
  button-secondary-hover:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.signal-teal}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.mist-grey}"
    rounded: "25px"
    padding: "9px 16px"
  filter-chip-active:
    backgroundColor: "{colors.signal-wash}"
    textColor: "{colors.signal-teal}"
  tag:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.starlight-white}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "6px 14px"
  card-project:
    backgroundColor: "{colors.glass-surface}"
    rounded: "{rounded.lg}"
  card-timeline:
    backgroundColor: "{colors.glass-surface}"
    rounded: "{rounded.lg}"
    padding: "30px"
  nav-link:
    textColor: "{colors.mist-grey}"
    padding: "8px 0"
  nav-link-hover:
    textColor: "{colors.starlight-white}"
  social-link:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.mist-grey}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
---

# Design System: Amir Mohammadikarbalaei — Data Science Portfolio

## Overview

**Creative North Star: "The Signal Lab", restrained**

The site is an instrument panel for someone who works with data. The background is a dark field (void black into nebula navy into abyss blue), ruled with a barely-there grid every 50px. Particles drift across it as faint texture. Every surface is a glass readout: black at 40% opacity, blurred 20px, edged with a teal hairline. Content sits inside these readouts the way values sit inside instruments.

Colour is spent sparingly. Type is white and grey. A single muted teal marks what is live or actionable: the typing role and cursor, the primary action, links, active filters, focus and the scroll trace. There are no gradients on text or fills and no coloured glows. Depth comes from ordinary dark shadows and a lift on hover. Four domain hues are the one deliberate burst of colour, and they exist to show breadth: each project carries the hue of its domain. A monospace `> ` prompt on the domain line and skill labels marks the operator's voice, so the portfolio reads as a working lab rather than a brochure.

Motion lives in the hero and in response to touch, never in looping decoration. Every piece of it stands still under `prefers-reduced-motion`, except the typing line and the card animations, which the owner chose to keep running.

**Key Characteristics:**
- Dark field, faint 50px grid, drifting particle texture behind everything.
- One accent, Signal Teal, used flat and sparingly. No gradient text, no glow.
- Glass readouts: `rgba(0,0,0,0.4)` + 20px blur + teal hairline border.
- Inter for speech, JetBrains Mono for the instrument's voice (prompts, tags, filters, numbers).
- Touch = lift + brighter hairline + deeper neutral shadow.
- Four domain hues that map the breadth of ML domains at a glance.

## Colors

A near-black lab field with white type, one muted teal accent, and four balanced domain hues that code each project by domain.

### Primary
- **Signal Teal** (`{colors.signal-teal}`): the only accent. It covers:
  - the typing role and cursor
  - primary button fill, secondary button outline and its wash on hover
  - active filter and nav underline
  - the brand mark on hover
  - the scroll-progress trace, focus rings, links, and particle dots (at reduced strength)

  As tints it becomes the hairline (20%, up to 60% on hover) and the wash (10%).

### Neutral
In code these are tokens on `:root` in `index.css`: `--text` (Starlight White), `--text-soft` (Soft Silver), `--text-muted` (Mist Grey), `--void` (Void Black), `--glass` (Glass Surface), `--hairline` (Signal Hairline) and `--wash` (Signal Wash), beside `--accent`, `--accent-hover` and `--field-solid`. Use the token, never the hex. Other teal strengths (30%, 40%, 60%, 70%) are one-off state tints and stay written out. `:root` also sets `color-scheme: dark` and `accent-color: var(--accent)`, so native scrollbars, controls and media players match the field.

- **Void Black** (`{colors.void-black}`) → **Nebula Navy** (`{colors.nebula-navy}`) → **Abyss Blue** (`{colors.abyss-blue}`): the body background, as one 135° gradient in that order. Void black at 80–95% opacity is also the navbar glass and the browser `theme-color`.
- **Glass Surface** (`{colors.glass-surface}`): the fill for every card, filter, pill and panel. It sits over the grid, never over a solid colour.
- **Signal Hairline** (`{colors.signal-hairline}`) and **Signal Wash** (`{colors.signal-wash}`): borders on glass, and faint tints for badges, hover rows and active ghost controls.
- **Starlight White** (`{colors.starlight-white}`): headings and primary text.
- **Soft Silver** (`{colors.soft-silver}`) and **Ice Text** (`{colors.ice-text}`): near-white text inside controls. Silver is for filters and the skills lists.
- **Mist Grey** (`{colors.mist-grey}`): secondary copy, resting nav links, inactive filters and the typing prefix.

### Domain Hues
Colour maps breadth, one hue per project domain. It is not a swatch for each tag. The four hues are `--domain-*` tokens in `index.css`, keyed to `DOMAINS` in `src/data/domains.ts`:

| Domain | Token | Value |
|---|---|---|
| NLP & LLMs | `--domain-nlp` | coral `oklch(0.76 0.13 30)` |
| Machine Learning | `--domain-ml` | lime `oklch(0.87 0.15 118)` |
| Time Series | `--domain-ts` | mint `oklch(0.80 0.12 165)` |
| Data & BI | `--domain-data` | amber `oklch(0.84 0.14 78)` |

The hues stay clear of Signal Teal (h≈215) and of the retired violet and pink band. Lightness is balanced so no domain outshouts another. A `.domain-<key>` class sets `--domain` on:
- the filter chip, where the icon is the colour key;
- the project card, with a flat 2px rule across the top, the domain named in mono in its hue under the title, and tags tinted from it;
- the project detail page, with the title rule and the domain line.

A project's domain is the first entry in `DOMAINS` that its categories match, so list order sets priority.

### Named Rules
**The One Accent Rule.** Signal Teal is the only accent, always flat. No gradient text, no gradient fills, no second accent hue. Emphasis comes from white, weight and size.

**The No-Glow Rule.** Shadows are neutral (`rgba(0, 0, 0, …)`) with a real offset. Coloured or zero-offset halos are decoration and do not ship.

**The Domain Colour Rule.** Domain hues encode which domain a project belongs to and nothing else. They never mark action, selection or focus, which stay teal. They never appear without the domain's name beside them. A new domain gets a new token that follows the same lightness and chroma, and a new tag gets no colour of its own. Tags take the wash formula: 14% hue fill, 50% hue border, and text 25% hue mixed into white.

**The Dark-on-Accent Rule.** Text on a Signal Teal fill is void black, never white. White on the accent fails WCAG; void black clears it comfortably.

## Typography

**Display Font:** Inter (with sans-serif), variable 100–900 from Google Fonts
**Label/Mono Font:** JetBrains Mono (with monospace), variable 100–800

**Character:** Inter is the scientist explaining. JetBrains Mono is the instrument reporting. Mono is never used for paragraphs. It carries prompts, readouts, tags and filter labels.

### Hierarchy
**The Role Scale Rule.** Every text size is a `--type-*` token in `:root` (index.css), named for its job. Titles scale with the viewport; reading sizes stay fixed. Add a size only by adding a role.

| Token | Size | Used for |
|---|---|---|
| `--type-display` | `clamp(1.75rem, 8vw, 5rem)` | the hero name (8vw keeps the 18-letter surname whole at 320–390px) |
| `--type-title` | `clamp(2rem, 5.5vw, 3.75rem)` | page titles (project, Experience, not found), weight 700 |
| `--type-section` | `clamp(2rem, 4.5vw, 3rem)` | section titles (Projects, About, Skills, Contact, Education) |
| `--type-heading` | 1.5rem | headings inside a page, the typing line |
| `--type-subheading` | 1.25rem | card, role and up-next titles |
| `--type-lead` | 1.125rem | intros, about and hero copy, company names |
| `--type-body` | 1rem | running text, lists, buttons |
| `--type-small` | 0.9375rem | descriptions, captions, locations, nav |
| `--type-label` | 0.8125rem | mono labels: domains, tags, dates, filters, readouts, tools |
| `--type-micro` | 0.75rem | badges |

Icon and glyph sizes (company marks, social icons, arrows, the brand dot) are not text roles and sit outside the scale, as does the contact email, which shrinks fluidly so the full address fits on a phone.

How the roles are set:
- **Hero name** (`--type-display`, 600, 1.05, −0.025em, balanced): the homepage h1, in white, and the largest thing on screen. It breaks between "Amir" and "Mohammadikarbalaei" on phones, never mid-word.
- **Page titles** (`--type-title`, 700, balanced): white. Project titles carry a flat 48px, 2px rule in the domain hue beneath.
- **Section titles** (`--type-section`, 700, 48px below): centred and white, with no framing glyphs.
- **Typing line** (`--type-heading`, 500; 1.25rem on phones): one row of fixed height, the whole sentence centred at the width of the longest role (an invisible copy reserves it), so "I'm" never shifts while a role types or deletes; mist-grey "I'm", then the teal role, the cursor directly after the last letter.
- **Lead** (`--type-lead`, 400, 1.6): hero description in mist grey, capped at 34rem; About paragraphs left-aligned with 1.75 leading, max 68ch.
- **Body** (`--type-body`, 400, 1.6): running copy. Project write-ups keep a 780px column.
- **Labels** (`--type-label`, mono): the instrument's voice for domains, tags, dates, filters, readouts and the tools line.

### Named Rules
**The Console Voice Rule.** Mono appears only where the instrument speaks: prompts, closing glyphs, tags, filters, numbers. It never appears in body copy.

**The Interface Copy Rule.** Buttons, links and headings use sentence case ("View projects", "GitHub repository", "Skills & tools"). A page is called what the nav calls it ("Experience", "About"). Date ranges use an en dash ("Jun 2025 – Sep 2026"). Locations are "City, Country · Mode" with the country short ("Bath, UK · Remote", "San Francisco, US · Remote"). Each message is said once: a control's label stays stable and its readout carries the outcome.

**The Plain Heading Rule.** Every section heading, Contact included, is plain white text. The owner removed the `< Title />` and `function Contact()` code framing; don't bring code-syntax decoration back to headings.

## Layout

The homepage reads in the order a recruiter needs it:
1. **Hero:** name, typing role, current work, a mono level line ("> Unilever · Y Combinator startup · MSc Data Science, Bath", teal prompt, 55% teal mid-dots, each item kept whole on wrap), then View projects and Contact. The domains show in the project filters.
2. **Projects.**
3. **About.**
4. **Skills.**
5. **Contact.**

The hero is 76vh, well short of a full screen, and the Projects section opens only 24px below it, so the Projects heading and the domain filters sit inside the first viewport (checked at 1440×900, 1366×768 and a 390×844 phone): range is visible before any scrolling. The hero sits on the particle field and grid, with no banner image. On phones it pads only 88px at the top.

Spacing roles live as tokens on `:root` in `index.css`:
- **`--gutter`:** `clamp(16px, 4vw, 40px)`. The `.container` spans up to 1400px inside it.
- **`--space-section`:** `clamp(72px, 9vw, 120px)`, between sections.
- **`--space-title`:** 48px, from a section heading to its content.

The Projects heading is the exception at 28px, because the heading, filters and grid read as one group: 28px to the filters, then 36px to the grid.

**Grid behaviour:**
- **Project cards:** three to a row in a wrapping flex row that centres a short final row, single-column below 768px. Cards in a row stretch to equal height. Tags pin to the bottom of each card.
- **Filter row:** one centred row on desktop, with counts in bare pills and no parentheses. Below 768px it becomes a single horizontal swipe strip. The strip bleeds to the screen edges and fades there, and chips snap to the gutter. Never stack the filters vertically.
- **About:** portrait and one glass readout form a centred two-column grid, with the text capped at 68ch. Both paragraphs and the actions share the single panel. Below 992px the portrait stacks above the panel.
- **Skills:** a single spec-sheet panel.
- **Experience timeline:** alternates left and right around a central spine on desktop, and collapses to one left-aligned column on small screens.

The navbar collapses to a menu button at 992px. That media query must sit below the base nav rules in the stylesheet, or the base rules win and phones get the full desktop nav.

Breakpoints are applied ad hoc at 640px, 768px, 992px and 1024px. The rhythm steps through 10, 16, 20, 30, 60 and 80px.

## Elevation & Depth

Depth is **lifted, not lit**. There are three layers:
1. The gradient field, with its grid and particle canvas.
2. Glass readouts that blur whatever passes behind them.
3. The fixed navbar glass, with a teal bottom hairline.

Surfaces carry a neutral ambient shadow at rest. When touched they rise, their hairline brightens and the shadow deepens. Nothing emits coloured light.

### Shadow Vocabulary
- **Ambient rest** (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)`): project cards, the skills sheet, and the navbar once scrolled.
- **Control depth** (`box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3)`): primary button and small controls. It deepens on hover.
- **Card lift** (`box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35)`): project card hover and keyboard focus.
- **Portrait** (`box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45)`, 1px white 14% ring): the profile image.

### Named Rules
**The Lift Rule.** Every interactive surface answers hover in two ways at once. It rises a short way and never scales (−1px for buttons, −2px for chips and timeline cards, −3px for project cards, −5px for social links), and its hairline brightens. Tags are labels, not controls, so they do not react. A hover that only changes colour is incomplete. Hover styles apply only where the device can hover (`@media (hover: hover)`), so a tapped card or chip never stays lifted on a phone; keyboard focus keeps its look everywhere.

**The Glass-Over-Grid Rule.** Panels are translucent black with backdrop blur. The grid and particles must remain faintly visible through them.

## Shapes

Gently rounded glass (16px) holds content, tight 6–8px corners mark precise controls, and full pills mark selectable or ambient tokens. Hairline borders (1px, 2px on outline controls) define every edge. Circles appear only for the portrait. Buttons carry no light sweep on hover.

- Cards, timeline panels and the skills sheet: 16px.
- Social links and timeline tags: 12px.
- Primary button: 8px.
- Badges: 20px. Secondary button: 30px. Filter chips: 25px.

## Components

### Buttons
- **Primary:** flat Signal Teal fill with void-black 600-weight text, 14px × 32px padding, 10px icon gap and 8px corners. On hover it lightens a step, lifts 1px and its shadow deepens slightly. The contact email uses it, with the address set in mono.
- **Secondary:** a transparent 30px capsule with a 1px teal outline at 50% and teal 500-weight text. On hover the outline turns solid, a 10% teal wash fills it and it lifts 1px; it never floods teal, so it stays secondary to the primary.
- **Text link button:** inline teal text for "contact me"-style prompts.

### Chips
- **Filter chips:** one per project domain, generated from the data, plus All. They are toggle buttons with `aria-pressed`.
  - **Resting:** no fill, a 1px white 12% hairline, mist-grey mono text at 0.85rem, 25px radius. Domain chips lead with an 8px square swatch in the domain hue (the same square as the card's domain label); All has none. No icons, no counts.
  - **Hover:** the hairline turns 50% teal and the text brightens. No lift, no light sweep.
  - **Active:** a flat 10% teal tint, a 70% teal border and teal text.
- **Location caption:** under the portrait, mono 0.85rem in mist grey with a teal pin. A plain line, not a capsule, and no hover.

### Tags
Project cards carry no tags: a card is animation, title, domain, result line and description. A project's tags appear once, on its page, as a single mono line under the domain label, split by 55% teal mid-dots. Timeline tags are the single-hue variant: teal wash, teal text, 12px corners.

### Experience Timeline
- **Domain colour lives on the skill tags, never on whole roles.** Roles span several domains: NLP is part of ML, and forecasting sits inside an analytics role. A single hue per role would overstate a distinction the work doesn't have.
  - **Tag hues:** each tag takes the hue of the domain it names, by the wash formula. The mapping is `TAG_DOMAINS` in `Experience.tsx`.
  - **Neutral tags:** tags outside the ML domains, such as tools, context and soft skills (Python, ServiceNow, Leadership), stay neutral glass, so a hue always means a domain.
  - **Key:** a colour key under the hero lists only the domains the tags use.
  - **Stays teal:** the spine, date markers, company marks, bullets and card rules keep the single teal accent, as do status (the current-role badge) and actions.
- **Headings:** job titles are white and company names are soft silver. Neither is teal.
- **Structure:** one reading line, not a zig-zag. Above 992px the dates sit in a 176px rail on the left, right-aligned and level with each role's title; the spine runs beside them; every role card takes the same full width (container max 1000px). At 992px and below the spine moves to the left edge and each date stacks above its card.
- **Text alignment:** every card reads left-aligned.
- **Bullets:** list markers are drawn 6px teal squares, not text glyphs.
- **Company mark:** the organisation's logo, 40px tall, as a one-colour white file from `/media/logos` (cut-outs drawn black and dropped with `mix-blend-mode: screen`). Roles without a logo keep a 52px glass circle with a teal hairline and a teal icon.
- **Badges:** "Current role" and similar badges are mono teal-wash capsules, the same family as the profile badge. "Current" gets a solid teal border. They carry no gradients, no pulse and no second hue.
- **Date pills:** outlined mono readouts on the spine (teal text, 40% teal hairline). Only the current role's date is filled solid teal, so the fill marks what is live. They are not interactive, so they have no pointer and no hover.
- **Reveal:** each role fades up 16px over 0.6s as it enters view, staggered 120ms apart (capped at four steps). The owner preferred this to a scroll-linked filling spine.
- **Revealed content:** text opened by "Show more" continues the paragraph and fades in (220ms); revealed bullets fade and settle 6px (260ms, 40ms apart, capped at five steps); each new readout, such as "address copied", fades in. Under reduced motion they keep a 160ms fade and drop the movement, so the change is still visible.
- **Menus:** the mobile menu opens in 240ms on a decelerating curve and closes in 150ms. Dismissal is always quicker than arrival.

### Cards / Containers
- **Project cards:**
  - **Surface:** glass, 20px blur, 16px corners and a teal hairline. The media band is a short 16:7 with the asset contained, so the animation is an accent and the card reaches its text quickly. While an animation loads the band stays empty; no grey placeholder box.
  - **Result line:** under the domain label, one mono readout with a teal `> ` prompt stating the headline result (`result` in projects.ts; published facts only, e.g. "private AUC 0.910 → 0.965"). It is the proof a recruiter takes away without opening the project, so it reads before the description: mono at `--type-small`, weight 500, white. The description never repeats it; it says what the problem and approach were.
    - **Motion:** when the card comes into view, each number in the line counts up from zero to its value once (1.8s, decelerating), starting only when the line is fully on screen above the bottom quarter, then holds. Only digits move, in tabular figures, so the line never shifts. Screen readers get the final sentence immediately; under reduced motion the final values show from the start (`ResultReadout.tsx`).
  - **Media:** at rest the animation or image sits at 82% opacity and 80% saturation, so it doesn't out-shout the text; hover and focus bring it to full strength.
  - **Hover and focus:** the card lifts 3px and its hairline brightens to 40%. It does not scale. Keyboard focus looks identical.
- **Skills spec sheet:** one glass panel (max 1200px) with a row per category, rows split by 12% teal hairlines.
  - **Label column:** a fixed 300px, with the category in the mono prompt voice (white, teal `> `).
  - **Tools:** plain soft-silver text beside the label, split by 55% teal mid-dots (the dot rides on the item before it, so a wrapped line never starts with one). No pills, no hover.
  - **Mobile:** below 768px the label stacks above its list.
  - **Source:** categories and tools live in `SKILL_GROUPS` in `Home.tsx`.

### Navigation
- **Bar:** fixed glass (void black at 80%, 20px blur) with a teal 10% bottom hairline.
- **Brand:** the name, "Amir Mohammadikarbalaei", in Inter 600 at the lead size, white, turning teal on hover; accessible name "Amir Mohammadikarbalaei, home". The same mark sits in the main nav, the project bar and the 404. In the project bar on phones (640px and below) it shortens to "Amir" so Projects, Experience and Contact still fit on one row. The main bar keeps the full name down to 320px.
- **Favicon:** the console voice as a mark: a teal `>` prompt and a white cursor on a void-black rounded square (`public/favicon.svg`, with 32px and 180px PNG renders).
- **Page head:** every route sets its own tab title, description, canonical URL and structured data through `SEOHead`, which writes the tags directly (react-helmet-async does not support React 19). Project pages read "<project title> | Amir Mohammadikarbalaei".
- **Links:** Inter 500 at 0.95rem in mist grey. They turn white with a teal underline on hover or when active. Exactly one link is active: the last section whose top has passed a scan line 120px down.
- **Skip link and landmarks:** every page starts with a "Skip to content" link (hidden until focused) and wraps its content in `<main id="main">`.
- **Failure paths:** a route that fails to load or render shows "This page didn't load" with Reload and Homepage actions (`RouteError.tsx`); a page chunk missing after a redeploy reloads once automatically first. Without JavaScript, a `<noscript>` block in index.html gives the name, a one-line summary and email, LinkedIn and GitHub. A card or project image that fails to load hides itself instead of showing a broken-image icon; captions still describe the figure. The layout holds at 320px and at 200% zoom.
- **Scroll trace:** a 3px flat teal line that scales with `scaleX`.
- **Floating controls:** the only one is a single back-to-top button, rendered by the navigation on every page that has it. Pages never add their own.

### Signature Components
- **Typing hero:** a mist-grey "I'm", then a teal role cycling Data Scientist → Data Analyst → ML Engineer. The sentence is centred under the name at the width of the longest role, so it reads as centred and "I'm" holds still. The hero offers two actions: View projects (primary) and Contact (secondary).
  - **Timing:** 100ms per character to type, 50ms to delete, with a 2s pause on each word, ending in a blinking teal cursor.
  - **Reduced motion:** it keeps running by the owner's choice. There is no pause control: the owner removed it, knowing the typing line and card animations then loop without one (WCAG 2.2.2).
  - **Screen readers:** they get the full role list once, from a visually hidden sentence.
  - **Confirmed identity element; keep it.**
- **Particle field:** teal dots at reduced strength, joined by faint grey lines that fade with distance. It sits behind every page and draws once, holding still, under reduced motion. The count scales with screen area but is capped at 160, because linking is pairwise and an uncapped 4K screen meant about 150,000 checks per frame. **Confirmed identity element; keep it.**
- **Card animations (Lottie):** each card's JSON is fetched only when the card comes within 300px of the viewport, and the Lottie player is its own chunk, loaded on first need. An animation plays only while its card is on screen and pauses when scrolled away. It keeps playing under reduced motion: the owner exempted the card animations, as with the typing line.
- **Social links:** GitHub and LinkedIn as labelled glass links under the contact email.
- **Readouts:** the instrument answers the visitor. Each is one line in mono at 0.85rem, mist grey, after a teal `> ` prompt, and is announced to screen readers.
  - **Filtering:** no readout; the pressed chip is the state. Changing the filter makes the remaining cards settle in with a short stagger. Nothing moves under reduced motion.
  - **Contact:** "Copy address" confirms the copy, or says what to do if copying fails.
  - **Not found:** the page reports what it looked up, for example "nothing lives at /x" or "no project with the id …".
  - **Rules:** readouts confirm real events and nothing else. No readout is decorative, none loops, and none adds a claim.
- **Project page instruments:**
  - **Reading order:** title, domain, the card's result line (mono, body size), tools, and the GitHub / Live app actions; then **Demo** (a recording, when the project has one: an audio strip capped at 560px, or video capped at 960px, always with a `poster` frame taken from the video itself so the player is never a black box); then the interactive simulation, when there is one; then the write-up; then the same actions again.
  - **Columns:** the write-up sits beside an image sidebar only when the project has one to three images. From four up the images would outgrow the text, so they move to a **Figures** gallery under the write-up: two per row, one on phones. With none it runs as one column capped at 780px, never beside an empty sidebar. The sidebar flows at its natural height; it is never sticky or height-capped, because a capped sidebar hid its last images in a nested scroll area.
  - **Actions:** GitHub (primary) and, when there is one, **Live app** (secondary, opens the Streamlit app in a new tab) sit in the header, so the code is one click from the top, and repeat below both columns after all the evidence. Streamlit apps are never embedded: a sleeping app rendered as an empty 600px frame.
  - **Simulations:** an embedded simulation reports its own height (`simulation:height` message), so the frame fits its content. A wide simulation should reflow for phones itself (the Jarvis diagram stacks its lanes below 720px). Where one cannot, a project may set `simulationFallback`, a static image of the same diagram shown instead below 768px; that image is not repeated in the sidebar. Embedded demos are built in the site's own system: Inter and JetBrains Mono, the one teal accent on a flat #0d0f18 field, sentence-case headings, and no gradient text, inner grid, extra hues, uppercase tracked labels or left-stripe callouts.
  - **Headings:** Overview, Findings, How it works, Limitations: the result before the method. Plain names for what each section holds, not a report template.
  - **Sections:** unboxed. They read as one document, split by 2.5rem of space and a 1px white 8% rule. Headings are plain white (1.6rem) with no underline; named parts (Concept, Data, Process) are soft-silver 600 at 1.05rem; list markers are drawn 6px teal squares, not ticks.  - **Sticky bar:** the project bar is sticky. A 2px reading trace in the project's domain hue fills along its bottom edge, scaled with `scaleX`.
  - **Project bar:** the name brand (links home), then Projects, Experience and Contact, so a reader who lands on a project from LinkedIn can reach everything. On phones the spacing tightens to fit one row.
  - **Disclosure:** Overview, Findings and Limitations always show in full; only Approach lists longer than six items collapse, after three.
  - **Measure:** write-up paragraphs and lists, and the role paragraphs on Experience, are capped at 60ch. In Inter a ch (the width of a zero) is wider than an average letter, so 60ch reads as about 75 characters a line; 70ch ran to about 90.
  - **Section readout:** above 640px the bar names the section under it, for example "> Findings".
  - **Up next:** each write-up ends with "> next in <domain>", a glass link card to the next project in the same domain (wrapping round), with the domain rule and arrow in its hue. "All projects" follows it.
  - **Contact:** then comes Contact, with labelled Email, GitHub and LinkedIn links.
  - **Layout:** below 992px the write-up and its images stack into one column.

### Focus and motion
- **Focus:** every interactive element shows a 2px teal `:focus-visible` outline at a 3px offset.
- **Reduced motion:** the particles hold still, scroll jumps instead of gliding, and every CSS transition and animation becomes instant. The typing line is the one exception.
- **The card becomes the page:** the site's one authored navigation moment. It uses View Transitions through the data router's `viewTransition` links, and lives in `index.css` under "The card becomes the page".
  - **Opening:** the clicked card's box expands to fill the screen and becomes the project page. The card fades into a miniature of the page, which scales up to full size with the box, and the title rides inside the miniature. The homepage stays solid underneath while the new backdrop fades up over it, so there is no grey flash.
  - **Closing:** browser Back and the Home links shrink the page back into its card. The page stays visible until the last quarter and hands over to the card only once the two are nearly the same size. `<ScrollRestoration>` returns the card to its exact position.
  - **Up next:** the up-next card expands into the next project the same way.
  - **Pairing:** one pair, `project-surface`: the card (or up-next card) and the whole `.project-detail` page. Names are set only while that page is being opened or closed, via `useViewTransitionState`. That avoids duplicates, and it avoids making the page a permanent backdrop root, which would change how its glass panels blur.
  - **Direction:** `<html data-vt-dir="open|close">`, set in `RootLayout` during the route update, picks the timing.
  - **Timing:** the box moves over 760ms on `cubic-bezier(0.65, 0, 0.35, 1)`. Opening: the card fades out over 260ms and the page fades in over 360ms after 60ms. Closing: the page fades out at 540ms and the card fades in at 560ms. The new backdrop takes 420ms. The growing box clips to 16px corners, and its group drops the backdrop blur Chrome copies from the glass card.
  - **Reduced motion:** nothing is named, so nothing travels; the new page fades in over the old one in 260ms. Browsers without View Transitions navigate instantly.
- **Selection:** selected text uses the accent at 30%.

## Do's and Don'ts

### Do:
- **Do** keep Signal Teal flat and rare: live, actionable or code-syntax elements only.
- **Do** set headings in white and get emphasis from weight and size.
- **Do** build every panel as glass: `{colors.glass-surface}`, 20px backdrop blur, `{colors.signal-hairline}` border, 16px corners.
- **Do** answer hover with lift plus a brighter hairline.
- **Do** colour projects by domain under the Domain Colour Rule, and never give an individual tag its own hue.
- **Do** keep the typing hero and the particle field. They are confirmed parts of the identity.
- **Do** keep all copy in British English (optimisation, visualisation, colour).

### Don't:
- **Don't** use gradient text or gradient fills, anywhere.
- **Don't** add coloured or zero-offset glows. Shadows are neutral.
- **Don't** introduce a second accent hue. Violet, purple and pink are gone for good.
- **Don't** put white text on a teal fill. Use void black.
- **Don't** set body paragraphs in JetBrains Mono.
- **Don't** add floating navigation beyond the navbar and one back-to-top button.
- **Don't** add looping animation outside the hero.
