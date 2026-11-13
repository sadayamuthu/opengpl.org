# OpenGPL.org: Research Lab Restyle

**Date:** 2026-11-13
**Status:** Approved (wireframe G1, `openastra.org/.superpowers/brainstorm/…/anysql-opengpl-wire.html`)

## Intent

Restyle opengpl.org to match the redesigned openastra.org, so the OpenAstra family
reads as one. OpenGPL keeps its own accent color, **indigo `#3B4A9C`**.

## Goals

- Same design system as openastra.org: paper, card, ink, rules, Newsreader / Inter /
  JetBrains Mono, thick rule under the nav, dark code blocks.
- Single page with anchor navigation: `Open`**`GPL`** wordmark · "An OpenAstra
  framework ↗" · Why (`#why`) · Planes (`#planes`) · Schema (`#schema`) ·
  Ecosystem (`#ecosystem`) · Cite (`#cite`) · GitHub ↗. Keep a `#spec` anchor on
  the hero for existing links.
- Sections in order:
  1. Hero (eyebrow "II · Security Controls · v0.1 · Public draft", serif H1 "The
     policy language for AI systems.", lede, Read the spec ↗ (GitHub), Get the
     schema ↗, policy code block, ALLOW / DENY / AUDIT chips)
  2. Why OpenGPL (3 numbered columns, existing copy)
  3. Four planes, drawn as a flow (prompt → Input → Model → Output → response, Audit bar underneath)
  4. Built for regulated environments: NIST AI RMF, FedRAMP, HIPAA, EU AI Act, SOC 2, **ISO 42001**
  5. Schema · Use it today: the VS Code snippet and a Download schema link
  6. **Ecosystem (new):** SDK `pip install opengpl-sdk` (PyPI), Sidecar
     `ghcr.io/sadayamuthu/opengpl/sidecar:latest` (GHCR package page), Schema JSON
  7. **Cite (new):** `Sadayamuthu, K. (2026). OpenGPL: Governance Policy Language
     (v0.2.0) [Software]. Zenodo. https://doi.org/10.5281/zenodo.23844061`, with
     Copy, BibTeX and a clipboard fallback
  8. Footer: "An OpenAstra framework · II. Security Controls", CC BY 4.0, links.

## Non-goals

- No /spec page (the spec text lives in the opengpl repo). No router added.

## Anti-goals

- Losing existing copy, or breaking `#spec` / `#schema` links.

## Approaches

1. **Restyle in place with small section components (chosen).** Home is
   split into section components plus shared `ui.jsx` and `Citation.jsx`.
2. Add a router and multiple pages. There's no content to justify it.

## Testing

Existing Vitest suite (22 tests), updated for the new copy and structure, plus
new tests for the nav anchors, ISO 42001, Ecosystem links, Cite DOI, and the
clipboard behavior. Fix lint by adding vitest globals for test files.
`npm test`, `npm run lint` and `npm run build` must pass, with no horizontal
overflow at 375px.
