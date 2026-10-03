---
target: whole site (home, experience, project pages)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\amoha\\projects\\DataScience.github.io\\react\\react-app\\src\\components"
timestamp: 2026-10-03T16-30-22Z
slug: src-components
closed: true
---
# Critique: Amir Mohammadikarbalaei portfolio
Method: dual-agent (A: design review · B: detector and browser evidence). Pages: /, /experience, /project/reinforcement-learning, /project/local-ai-voice-assistant, at desktop and phone widths.

## Design health score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Card media shows as empty grey boxes for 1–3 s before the animations load |
| 2 | Match with the real world | 3 | The work gets three framings: "NLP and analytics" (hero), "NLP and forecasting" (About), and Data Scientist / ML Engineer roles against a current title of "Data Expertise Analyst" |
| 3 | User control and freedom | 3 | Section links from other pages do a full page reload (Navigation.tsx:90) |
| 4 | Consistency and standards | 3 | Contact differs between pages; DESIGN.md has drifted from the code |
| 5 | Error prevention | 3 | Little to get wrong; failures are handled |
| 6 | Recognition over recall | 3 | The project page drops the card's result line |
| 7 | Flexibility and efficiency | n/a | Read-only portfolio; nothing to speed up |
| 8 | Aesthetic and minimalist design | 2 | Cards state their result twice; dead space in the hero |
| 9 | Error recovery | 3 | Not-found and error pages explain and offer a way out |
| 10 | Help and documentation | n/a | A portfolio needs no help system |
| **Total** | | **23/32** | **Good (72%)** |

## Design specificity verdict
About 60% authored, 40% generic. The Signal Lab system (mono `>` readouts, domain hues, "next in <domain>") is specific to this site. The first viewport (centred name, typing role, one sentence, two buttons) and the stock clip-art card media are generic.
Detector: markup scan clean. Stylesheet scan, all already judged: Inter flagged as overused (2, false positive, font is pinned); grid background (1, deliberate brand grid); navbar padding transition (1, documented exception); off-scale font sizes at index.css:826 (contact email), :1115 and :1593 (icon glyphs), all documented exceptions. In-page scan found two real issues: write-up lines of about 86–92 characters (the 70ch cap is about 90 Inter characters), and a thin border with a wide shadow on the Up next card. It also raised two false positives: low contrast on the video element (no text) and "card flush to edge" on the hidden skip link.

## What's working
1. Result readouts on cards: "show, don't claim" in the console voice.
2. The domain colour system makes breadth visible at a glance, with every hue named.
3. Project-page reading aids (sticky bar, section readout, reading trace, captioned figures, next in <domain>).

## Priority issues
- [P1] The first viewport doesn't show level or any standout proof. Fix: one mono readout line of published facts under the description; tighten the 88vh hero so the first cards come into view. Commands: /impeccable clarify, then /impeccable layout.
- [P1] Project pages bury the evidence: video with no poster first, generic Overview, findings about 1,000px down, GitHub button at the end, no result line in the header. Fix: result line plus GitHub / Live app buttons in the header, a poster on each video, a short Results summary before How it works. Commands: /impeccable layout, then /impeccable harden.
- [P1] Card media is stock clip-art and the description repeats the result line. Fix: cropped real artefacts or a smaller media band; descriptions that cover the problem and approach; a skeleton while loading. Commands: /impeccable distill, then /impeccable bolder.
- [P2] The current role is the emptiest card on /experience, and the role framing conflicts. Fix (with owner input): one truthful line of scope, or group the two Unilever roles as one employer block; align the Unilever framing. Command: /impeccable clarify.
- [P2] Write-up lines run about 90 characters (detector). Fix: cap write-ups at about 62ch. Command: /impeccable typeset.

## Persona red flags
- Recruiter skimming for 30 seconds: no Unilever outcome, seniority or MSc in the first viewport; only three cards before the second scroll.
- Casey (one-handed on a phone): about 40% of the hero is empty; back-to-top overlaps card text; grey media on slow connections; contact at the end of a long single column.
- Riley (stress tester): video with no poster; Experience roles invisible until the scroll reveal fires; a deep link once landed at the page bottom.
- Jordan (first-timer): the typing line shows a fragment for most of each cycle; the colour key must be learnt before the roles.

## Minor observations
DESIGN.md is stale (banner hero, filter count pills, card tags, alternating timeline). Skills is a 30-item keyword wall with trailing mid-dots. Hyphens in titles where the style guide wants an en dash or colon. No aria-current on active nav links. The project bar has no About link. No closing line or footer after Contact. A faint background seam between Skills and Contact.

## Questions to consider
- Why is the most persuasive element (the result readout) the smallest text on the card?
- Does "a Data Analyst" in the typing line help or hurt the level signal?
- What would a card look like designed as a figure from the write-up?
- Should About's strongest number and the Bath, YC, Unilever arc move into the hero?
