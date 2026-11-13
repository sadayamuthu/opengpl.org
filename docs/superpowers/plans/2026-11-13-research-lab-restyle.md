# OpenGPL.org Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle opengpl.org in the OpenAstra Research Lab system with an indigo accent, adding Ecosystem and Cite sections.

**Architecture:** One page. `Home.jsx` is composed from section components. `ui.jsx` and `Citation.jsx` are ported from openastra.org (accent token `acc`).

**Tech Stack:** React 19, Tailwind 3, Vite 7, Vitest 4.

**Spec:** `docs/superpowers/specs/2026-11-13-research-lab-restyle-design.md`

## Global Constraints

- Tokens: paper `#F6F3EC`, card `#FFFDF8`, ink `#1B1B1B`, ink-muted `#5E5B55`, rule `#D9D4C8`, acc `#3B4A9C`.
- DOI `10.5281/zenodo.23844061`, version `0.2.0`; SDK `opengpl-sdk`; sidecar `ghcr.io/sadayamuthu/opengpl/sidecar:latest`.
- No dark-theme class names remain (`bg-space`, `text-accent-cyan`, `bg-surface`, `border-subtle`, `text-text-*`).

## Review Focus

- Clipboard unavailable: Copy and BibTeX reveal and select the text, without throwing. Test in Task 2.
- `#spec` and `#schema` anchors still exist for inbound links. Test in Task 3.
- 375px width: navbar wraps, and the policy code block scrolls inside its own box. Visual check in Task 4.

---

### Task 1: Theme + lint
- [ ] Replace the Tailwind colors with the tokens above; set fonts and the Google Fonts import (same as openastra.org); give body `bg-paper text-ink`; update `index.html` meta and theme-color.
- [ ] Add a vitest-globals block for test files to `eslint.config.js`; `npm run lint` passes.
- [ ] Commit `chore: research-lab theme tokens; lint test files`.

### Task 2: ui primitives + Citation
- [ ] Port `ui.jsx` (Eyebrow, Pill, Button, CodeBlock) and `Citation.jsx` from openastra.org, with the data inline (`CITATION`, `BIBTEX`, `DOI_URL` constants in `src/data/cite.js`).
- [ ] Tests: the doi.org link, Copy writes the APA text, BibTeX writes `@software{sadayamuthu2026opengpl,` …, and with no clipboard a textbox appears with the text selected. Watch RED, then GREEN, then commit.

### Task 3: Navbar, Footer, Home sections
- [ ] Update tests first:
  - Navbar has the anchors `#why #planes #schema #ecosystem #cite` and GitHub, plus a family link to `https://openastra.org`.
  - Footer has CC BY 4.0, OpenAstra and GitHub.
  - Home: the h1 text is unchanged; Read the spec → GitHub; Get the schema → schema.json; the hero has `id="spec"`; Why has 3 cards; the 4 planes are Input, Model, Output and Audit; the 6 badges include ISO 42001; the `#schema` section has `yaml.schemas` and Download schema; Ecosystem links PyPI `https://pypi.org/project/opengpl-sdk/` and GHCR `https://github.com/sadayamuthu/opengpl/pkgs/container/opengpl%2Fsidecar`; Cite shows the DOI link.
- [ ] RED, then implement, then GREEN. Commit `feat: research-lab restyle with ecosystem and cite`.

### Task 4: Verify
- [ ] `npx vitest run`, `npm run lint` and `npm run build` pass. Measure scrollWidth at 375px with headless Chrome: 375. Commit any fixes.
