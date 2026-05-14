# tigerschueler.dev

Source for [bigcatsoftware.github.io](https://bigcatsoftware.github.io/) — my personal portfolio.

Single-page React app with a Phaser tic tac toe section, a PDF.js flip-card resume preview, and a credential verification widget that links out to the UW Registrar. Catppuccin Latte palette with Lavender as the primary accent and Peach as the secondary.

## Stack

- React 19, Vite 7
- Tailwind CSS v4, with design tokens declared in `src/index.css` via `@theme`
- Phaser 3 for the Tic Tac Toe scene (lazy-loaded so it doesn't bloat the initial bundle)
- Framer Motion for entrance and hover motion
- pdfjs-dist for the resume preview, rendered to canvas on both faces of a CSS 3D flip card
- lucide-react plus inline brand SVGs (`GithubMark`, `LinkedinMark`) for icons
- canvas-confetti for the credential-verification burst

## Design

`DESIGN.md` and `design.json` at the repo root are the source of truth for tokens, copy, and component specs. The implementation in `src/` is meant to match those documents — when they disagree, DESIGN.md wins on intent and design.json wins on values.

## Sections

1. Hero — asymmetric portrait + thesis, with an ambient Lavender-to-Peach gradient drifting behind the text.
2. About — three short paragraphs of prose.
3. Featured Work — long-form list of four projects (BNB ETL platform, SHA3-SHAKE, j-- compiler, Procedural Dungeon Generation). Each row has an inline SVG identifier and a cursor-following 3D tilt on hover.
4. Tic Tac Toe — Phaser 3 board with tile breathing, hover lift, X/O entrance tweens, a winning-line pulse, particle bursts, camera shake, and a Victory Master modal after a third session win. Audio is procedural Web Audio oscillators in `useSound.js`, preserved verbatim from the prior version of the site.
5. Credentials — the section sits on a full Lavender panel. A credential ID with a copy-to-clipboard button, a verify flow with a theatrical 1200ms loading + status cascade + confetti, the diploma image, and a PDF.js flip-card preview of the resume with View / Download buttons.
6. Contact — three ghost-outline buttons for email, LinkedIn, and GitHub.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs to docs/
npm run preview  # serve the built docs/
```

## Deployment

GitHub Pages serves from `main`'s `/docs` folder. To deploy: `npm run build`, then commit the changed `docs/` artifacts and push to `main`.

## Layout

```
DESIGN.md
design.json
public/
  diploma_image.png
  tiger_graduation_square_crop.jpg
  Tiger_Schueler_New_Software_Engineer_Resume.pdf
  Tiger_Schueler_UWT_BS_CSS.pdf
  favicon.svg
src/
  App.jsx
  index.css                  Tailwind @theme tokens + global reset
  components/
    Hero.jsx
    About.jsx
    FeaturedWork.jsx
    TicTacToe.jsx            React shell that mounts the Phaser scene
    Credentials.jsx
    Contact.jsx
    Footer.jsx
    icons/                   GithubMark, LinkedinMark
  game/
    PhaserBoardScene.js      board, tile/piece animations, celebration
    ticTacToeLogic.js        win detection and AI heuristic
  hooks/
    useSound.js              Web Audio oscillator routines
docs/                        Vite build output, served by GH Pages
```

## Background

I'm Tiger Schueler. Data Engineer at BNBuilders in the Pacific Northwest, working in C# and T-SQL. UW Tacoma B.S. Computer Science & Systems with a math minor, 2025. Four years in the Navy before that (Aviation Ordnance, USS Nimitz, 2018-2022).

- [GitHub](https://github.com/BigCatSoftware)
- [LinkedIn](https://www.linkedin.com/in/tigerschueler/)
