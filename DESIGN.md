# BigCatSoftware Portfolio — Design Specification

This document is the source of truth for visual and interaction design across the portfolio site. It pairs with `design.json` (machine-readable tokens, component specs). When the two conflict, this document wins on intent and `design.json` wins on values.

---

## 1. Design philosophy

**Playful tech.** The site should feel like the work of someone who builds things because building is satisfying, not because they're trying to look professional. That means bright pastel color used with intention, motion that earns its place, and small moments of craft (interactive credential verification, juiced tic tac toe, asymmetric hero) that signal "this person enjoys what they do."

**Two feelings to evoke**, in this order:

1. **Intrigued** — the visitor wants to keep scrolling, click into things, replay the tic tac toe.
2. **Warmth** — the visitor leaves feeling they met a real person, not a template.

Trust and craft show up automatically when those two are right. Don't optimize for them directly.

**What this site is not:**

- Not a SaaS landing page. No "Why Choose Me" sections, no testimonial carousels, no fake urgency.
- Not a brutalist portfolio. Typography is generous and warm, not exposed-grid raw.
- Not a corporate CV in HTML. Credentials are verifiable and presented with care, but the site has a face.

---

## 2. Rhythm and density

The site uses **two density modes** in alternation:

- **Airy** — Hero, Credentials. One idea per viewport. Big type. Generous vertical padding (`py-32` to `py-44`). Content is the spotlight.
- **Balanced** — About, Featured Work, Tic Tac Toe, Contact. Substantive content, no crowding. Standard section padding (`py-24` to `py-28`).

The scroll experience alternates: airy → balanced → balanced → balanced → airy → balanced. The two airy bookends (Hero opening, Credentials near the end) create breathing space; the balanced middle carries the actual content weight.

---

## 3. Color application — the most important rule

The palette is Catppuccin Latte with Lavender as primary and Peach as secondary. Locked. The rule for *applying* it:

**One section gets the bold Lavender panel: Credentials.** Every other section uses Lavender as accent — links, headings, dividers, button fills, key highlights — on the neutral Base background.

**Why:** Credentials hosts the interactive verification widget, which is the most distinctive thing on the site. Giving it a full Lavender backdrop creates the visual signal that this is the centerpiece. Trying to make every section "bold" creates noise; reserving the loudest move for one location makes it land.

**Application rules per section:**

| Section | Background | Accent role |
|---|---|---|
| Hero | Base | Lavender for primary CTA, name kicker, ambient gradient |
| About | Base | Lavender for the section heading, italicized phrases |
| Featured Work | Base, Surface0 cards | Lavender for hover borders, "View source" links, BNBuilders tag |
| Tic Tac Toe | Base | Lavender = X, Peach = O |
| Credentials | **Lavender panel** | Base for text, Peach for the verify button |
| Contact | Base | Lavender for the social link hover states |

Peach is the second voice. It shows up sparingly: AI's O in tic tac toe, the Credentials verify button (to contrast against the Lavender panel), occasional accent on a hover or icon. Never as a primary background.

---

## 4. Typography

Three fonts, role-fixed:

- **Newsreader** (variable serif) — section headings, hero display type, anything meant to read literary or considered. Use opsz axis: smaller settings (opsz 14-20) for body-level serif, larger (opsz 36+) for display.
- **Inter** — all body copy, paragraph text, button labels, captions.
- **JetBrains Mono** — kickers (small uppercase labels above section headings), credential IDs, technical accents, anything that says "code" or "verified."

**Hierarchy:**

```
Hero display name         Newsreader 700, ~clamp(4rem, 10vw, 8rem)
Section headings          Newsreader 600, text-4xl to text-5xl
Lead paragraphs           Newsreader 400, text-xl to text-2xl, line-height 1.7
Body                      Inter 400, text-base to text-lg, line-height 1.7
Kickers                   JetBrains Mono 500, text-xs, uppercase, tracking-[0.22em]
Credential code           JetBrains Mono 500, prominent (text-2xl or larger), tracking-wide
Code/technical inline     JetBrains Mono 400, text-sm
Captions / metadata       Inter 400, text-sm, --color-text-muted
```

**Italic usage.** Use `<em>` for genuine emphasis only (the italicized "*that*" in About, project titles in prose, foreign terms). Don't italicize stylistically.

**Em dashes.** Permitted in body prose where rhythm calls for them. Banned in UI labels, button text, and CTAs.

---

## 5. Motion philosophy — "heavy juice"

Motion is a feature of this site, not a flourish. The site should feel **alive** — not gimmicky, but in clear motion at most scroll positions.

**Three categories of motion:**

### A. Entrance motion (every section)

- Scroll-triggered fade-up on initial section view: 16px y-offset → 0, 600ms, ease `[0.22, 1, 0.36, 1]`.
- Staggered by 70-90ms across child elements (heading → lead → cards/body).
- Trigger once per session per element. Do not replay on re-scroll.

### B. Section-signature motion (one defining moment per section)

Each major section gets one signature motion that distinguishes it:

- **Hero** — slow ambient gradient drift (Lavender → Peach radial moves on a 20s loop, very low opacity).
- **About** — none (intentionally still; it's prose, motion would compete).
- **Featured Work** — card hover does a 3D tilt (subtle, max 6deg) following cursor position via framer-motion or `react-use-gesture`. Spring-physics return.
- **Tic Tac Toe** — see section 9. The entire interaction is motion.
- **Credentials** — the verification widget animation. See section 10.
- **Contact** — social icons do a small bounce on hover (translate-y 0 → -4 → 0, 200ms).

### C. Continuous ambient motion

The Hero gradient and one or two other small details (a Lavender shimmer line under the section heading, a slowly rotating accent on a dividing element) keep the site visually breathing. These run on `requestAnimationFrame` and respect `prefers-reduced-motion`.

**Reduced motion.** All motion respects `prefers-reduced-motion: reduce` and collapses to instant state changes. No exceptions. This is a hard accessibility requirement, not a nice-to-have.

**Performance.** Animations target 60fps. If a section can't hold 60fps, the motion gets simplified before the section ships, not after.

---

## 6. Page structure

```
1. Hero               (airy)
2. About              (balanced)
3. Featured Work      (balanced)
4. Tic Tac Toe        (balanced)
5. Credentials        (airy, Lavender panel)
6. Contact            (balanced)
7. Footer             (minimal)
```

No top navigation bar. Single-page, anchor-scrolled. The Hero CTAs do the linking work (`#work`, `#contact`).

---

## 7. Hero — asymmetric

Per design pick 7D.

**Layout:** Two-column on `md+`, photo dominates one column (left), text stacked on the other (right). On mobile, stacks with photo above text.

**Photo column (left):**
- `public/tiger_graduation_square_crop.jpg`
- Rounded `2xl` (~16px), 1px Surface1 border, soft drop shadow
- Sized roughly 50% of the column width on `md+`, up to ~480px max
- Slight rotation (`rotate-[-2deg]`) for character — not a square block

**Text column (right):**
- Tiny mono kicker top: `TIGER SCHUELER` in JetBrains Mono uppercase, tracking-[0.22em], --color-text-muted
- Large Newsreader display heading directly below — this is where the "thesis" lives. Suggested copy: *"Building production data infrastructure in C# and .NET. Quietly, durably, well."*
- Subdued sub-heading in Inter, --color-text-muted: one-liner that names the role (`Data Engineer at BNBuilders, Pacific Northwest.`)
- Two CTA buttons in a row: **View Work** (Lavender filled) and **Get In Touch** (ghost/outline)

**Ambient gradient:** Continuous Lavender → Peach radial behind the text column, very low opacity (~0.18), slowly drifting via animated CSS background-position on a 20s loop.

---

## 8. Featured Work — long-form list

Per design pick 8B.

Departure from the current card grid. Each project gets a full horizontal row with breathing room.

**Row anatomy:**

```
[ Thumbnail or visual identifier ]   [ Title (Newsreader)         ]
                                     [ One-line summary           ]
                                     [ Tech stack tags (mono)     ]
                                     [ Description (3-4 lines)    ]
                                     [ View source link →         ]
```

- Thumbnail column: ~30% of row width on `md+`. For projects without screenshots, use a stylized visual identifier — for SHA-3 it could be a stylized hash block; for j-- a tokenized code snippet rendered in JetBrains Mono on Surface0; for Dungeon-Adventure a simplified BSP visualization (recursive rectangles); for ETL Platform an abstract data-flow line illustration. These are SVG, not photos.
- Rows stack vertically with `space-y-20` between them.
- On hover: subtle 3D tilt (max 6deg, follows cursor), Lavender border on the thumbnail container, "View source" link slides slightly right.
- The BNBuilders ETL row leads. It's the most current and substantial piece of work.

---

## 9. Tic Tac Toe — Phaser rebuild

Per design pick 6B.

Replace the current R3F implementation with a Phaser 3 scene. React renders a container `<div>`; Phaser owns everything inside it.

**Why Phaser:** Phaser is purpose-built for 2D game juice — sprite batching, particle emitters, tween chains, easing libraries, scene management. The tic tac toe should feel like a *game*, not an abstract 3D demo. Phaser also gets us pixel-perfect sprite work, which fits the "playful tech" philosophy better than realistic 3D.

**Scene design:**

- Top-down 2D board. 3×3 grid of square tiles in Surface0 with Surface1 borders.
- Tiles have a subtle resting animation: each tile breathes (scale 1.0 ↔ 1.02) on a slow staggered cycle.
- Hover: tile lifts slightly (scale 1.05, soft Lavender glow underneath).
- Click empty tile (player X): X sprite drops in with a bounce (scale 0.3 → 1.1 → 1.0, 280ms), tile color flashes Lavender briefly, click sound fires.
- AI O placement (1s delay): O sprite swirls in (rotation -180 → 0 + scale 0 → 1, 320ms), tile flashes Peach.
- Win: winning three tiles begin a chained sequence — Lavender pulse traveling along the line (one tile lights → fades → next lights), then all three lift and shimmer. Particle emitter at each winning tile fires Lavender + Peach particles in a hemisphere arc with gravity. Camera shake (small, ~6px amplitude, 220ms).
- Loss: winning AI line shows in a desaturated grey, particles in muted Surface1.
- Draw: all tiles do a single coordinated wiggle then settle.
- Third session win: same Victory Master modal as before (React-level component overlaid on top of Phaser canvas), restyled to Latte/Lavender. Long victory audio sequence plays.

**Audio — preserved exactly.** The existing oscillator-based sound routines port forward unchanged. Phaser doesn't replace them. The `useSound` hook keeps owning audio; Phaser triggers it via callbacks passed in from React.

**Game logic — preserved.** Win detection, AI heuristic, session win counter, victory thresholds — all unchanged from current implementation. Move from `TicTacToe.jsx` game state into a Phaser scene class; behavior identical.

**Implementation notes for CC:**

- Install `phaser` (current version 3.x). No React wrapper needed.
- Mount Phaser in a `useEffect` against a ref'd `<div>`; destroy on unmount.
- Communicate React → Phaser via Phaser's event emitter or scene `data` registry.
- Communicate Phaser → React (win events, counter updates, audio triggers) via callbacks passed into the scene at construction.
- Sprite assets: generate procedurally on first scene load via `this.add.graphics()` → `generateTexture()`. No image files in the repo for the X, O, or tile graphics. Keeps the asset surface minimal and theme-token-driven.
- Pixel-perfect rendering: `pixelArt: false`, anti-aliasing on. The look is clean pastel, not retro pixel art.

---

## 10. Credentials — interactive verification widget

Per design pick 9C.

This is the centerpiece. The section sits on a full Lavender panel and contains a custom verification flow that mimics a real credential check.

**Section background:** `--color-accent` (Lavender) full-width panel, generous vertical padding (`py-36` to `py-44`).

**Layout:** Single centered column, max-width ~720px.

**Content order:**

1. Mono kicker: `VERIFIABLE CREDENTIALS` in JetBrains Mono, uppercase, in `--color-bg` (Base) text on Lavender background.
2. Section heading: `Credentials` in Newsreader, large (text-5xl to text-6xl), in `--color-bg`.
3. One-line context: `B.S. Computer Science & Systems · University of Washington Tacoma · August 2025` in Inter, Base text at 80% opacity.
4. **The verification widget.** See below.
5. Resume download below the widget — a smaller secondary action.

**The widget:**

A Surface0 card sitting on top of the Lavender panel, rounded `2xl`, generous padding (`p-8` to `p-12`). Inside:

- Top label in mono: `CREDENTIAL ID`
- The credential code rendered character-by-character: `25C9-NTAN-TNRJ` in JetBrains Mono, very large (text-4xl to text-5xl), tracking-wide, in `--color-accent` (Lavender) on Surface0.
- Animation: on scroll into view, each character of the credential code fades in with a 60ms stagger (left to right), as if being read from a database.
- Below the code, a status line in Inter: starts as `Awaiting verification...` in muted text.
- A primary button: `Verify Credential`. Peach filled (contrasts against the Lavender panel and Surface0 card), Base text. Lucide ShieldCheck icon.
- On click of Verify Credential:
  - Button enters a loading state — spinner icon, label changes to `Verifying...`
  - 1200ms loading delay (this is intentional theater; the verification is real but the delay sells the moment)
  - Status line animates through three states with 400ms intervals:
    - `Connecting to UW Registrar...` (Inter, muted)
    - `Validating credential ID...` (Inter, muted)
    - `Verified ✓` (Inter, in `--color-accent` Lavender, with a small confetti burst — `canvas-confetti` library or hand-rolled in framer-motion)
  - Button transforms: label changes to `Open verification on UW Registrar →`, click now opens `https://apps.registrar.washington.edu/cecredential/verify/` in a new tab.
- A small mono caption at the bottom of the card: `Verification powered by UW Registrar.`

**Diploma image:** Shown to the side of or below the widget, depending on layout. Smaller than the widget itself — the widget is the hero. Rounded `xl`, 1px Surface1 border, soft shadow. Alt: `Tiger Schueler's University of Washington Tacoma diploma.`

**Resume embed:** Lives below the widget, distinctly secondary. Same `<object>` + `<iframe>` desktop / mobile-tap-to-open pattern from the previous spec. Download button in Lavender-filled style.

---

## 11. Contact — minimal

Per the broader site spirit, not a form. Three buttons in a row (stacking on mobile):

- **Email** — `mailto:tiger.schueler.dev@gmail.com`, lucide Mail icon
- **LinkedIn** — external link, lucide Linkedin icon (or inline SVG if lucide removed it for brand reasons)
- **GitHub** — external link, inline GithubMark SVG (already in repo from Featured Work)

Each button: ghost/outline style, Lavender border on hover, icon translate-y-[-2px] on hover (220ms).

Section heading in Newsreader: `Get In Touch`. Short Inter sub-line: `For collaborations, hiring conversations, or just to say hello.`

---

## 12. Footer

One line, centered, small Inter text in `--color-text-muted`:

`Built by Tiger Schueler · React · Phaser · Tailwind · 2026`

Each tech name links to its homepage. Year is current.

---

## 13. Accessibility floor

These are not aspirational. They're requirements.

- All interactive elements reachable via keyboard. Focus rings visible in Lavender (already wired via `--color-ring`).
- Color contrast: every text/background pair meets WCAG AA. The Lavender Credentials panel needs special attention — Base (`#eff1f5`) text on Lavender (`#7287fd`) is the riskiest combination. If AA fails on small text, drop the Base text to a true white (`#ffffff`) on that section only.
- All images have descriptive alt text. The decorative ambient gradient gets `aria-hidden="true"`.
- The Phaser canvas has an `aria-label="Interactive tic tac toe game"` and a visible "Skip game" link for keyboard users that anchors past the section.
- `prefers-reduced-motion` collapses all motion to instant state changes. No exceptions.
- Lighthouse Accessibility ≥ 95.

---

## 14. Bundle and performance

- Lighthouse Performance ≥ 90 on desktop, ≥ 80 on mobile (Phaser pulls weight on mobile; an 80 floor is realistic).
- Phaser tic tac toe lazy-loaded via `React.lazy` — only loads when user scrolls within ~400px of the section.
- Font loading uses `font-display: swap` and preconnects to Google Fonts.
- All images served from `/public`, lazy-loaded below the fold.
- No external analytics, no third-party trackers, no ads.

---

## 15. Out of scope (do not add)

- Top navigation bar
- Dark mode toggle (the site is Latte; dark mode would require a parallel palette and doubles the design surface — defer indefinitely)
- Blog or writing section
- Anything social-media-embedded (no Twitter cards, no LinkedIn widgets)
- Animated cursor / custom cursor
- Page transitions (the site is single-page, transitions don't apply)
- Loading screens / splash screens
