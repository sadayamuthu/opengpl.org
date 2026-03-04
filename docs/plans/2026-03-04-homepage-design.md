# opengpl.org Homepage Design

**Date:** 2026-03-04
**Approach:** Spec-First (Option A)
**Stack:** React + Vite + Tailwind CSS (matching openastra.org)

---

## Goal

Establish OpenGPL as a canonical open standard for AI policy — the way GraphQL.org or JSON Schema.org present their specs. Primary CTA is reading the spec, with secondary CTAs for schema download and GitHub.

## Design System

Inherit all tokens from openastra.org:

- `space: #050A14` — page background
- `surface: #0D1424` — card/navbar background
- `subtle: #1E2D4A` — borders
- `accent-blue: #4F8EF7` — primary CTA buttons (glow-blue)
- `accent-cyan: #00D4FF` — headings, highlights, links
- `text-primary: #F0F6FF` — body text
- `text-muted: #7A90B0` — secondary text
- Font: Inter

## Sections

### 1. Navbar

Sticky top bar, `bg-surface border-b border-subtle`.

- Logo: `📜 OpenGPL` (cyan icon)
- Nav links: **Spec** (anchor `#spec`), **Schema** (anchor `#schema`), **GitHub ↗** (external, `https://github.com/sadayamuthu/opengpl`)

### 2. Hero

- Version badge pill: `✦ v0.1 · Public Draft` (same pill style as openastra.org hero)
- `h1`: "The policy language for AI systems." — `text-accent-cyan text-5xl sm:text-6xl font-bold`
- Subtitle: "OpenGPL is an open, declarative standard for governing how AI agents behave — what they can access, produce, and how they prove compliance at runtime."
- CTAs:
  - Primary: `[Read the Spec]` → `bg-accent-blue glow-blue` → GitHub spec link
  - Secondary: `[Get the Schema ↗]` → `border-subtle` → schema JSON URL
- Code block below CTAs showing a sample `.gpl` policy:
  ```
  policy "restrict-pii-output" {
    agent:    *
    action:   generate
    resource: user_data
    effect:   deny
    when:     output.contains_pii == true
  }
  ```
  Styled: `bg-surface border border-subtle rounded-xl p-6 font-mono text-sm text-accent-cyan`

### 3. Why OpenGPL

3-column cards comparing existing tools vs the gap vs OpenGPL's solution.

| Card | Title | Body |
|------|-------|------|
| 1 | Existing tools weren't built for this | OPA/Rego and AWS Cedar were designed for deterministic systems. Generative AI outputs are probabilistic. |
| 2 | LLM-native primitives | Trust levels, hallucination thresholds, tool access — first-class concepts in every policy. |
| 3 | Compliance evidence at runtime | Auto-generates OSCAL artifacts. Not just policy enforcement — provable compliance. |

### 4. Four Control Planes

Section heading: "One policy file. Four planes of control."

4-column grid:

| Icon | Name | Description |
|------|------|-------------|
| 🛡️ | Input Controls | Detect and sanitize harmful prompts before they reach the model. |
| 🤖 | Model Controls | Govern LLM behavior, trust levels, and tool access. |
| 📤 | Output Controls | Block sensitive data exposure, enforce attribution. |
| 📋 | Audit Controls | Generate OSCAL compliance artifacts at runtime and at rest. |

### 5. Compliance Coverage

Centered section: "Built for regulated environments."

Badge row: `[ NIST AI RMF ]  [ FedRAMP ]  [ HIPAA ]  [ EU AI Act ]  [ SOC 2 ]`

Each badge: `px-4 py-1.5 rounded-full border border-subtle text-text-muted text-xs tracking-widest uppercase`

### 6. Schema Quick-Start

Section heading: "Use it today."
Anchor: `id="schema"`

Code block showing VS Code `settings.json` integration:
```json
{
  "yaml.schemas": {
    "https://opengpl.org/schema/v0.1/schema.json": "*.gpl"
  }
}
```

CTAs:
- `[Download Schema]` → schema JSON file
- `[View on GitHub ↗]` → GitHub repo

### 7. Footer

- Left: `© 2026 OpenAstra · OpenGPL is CC BY 4.0`
- Right links: **Spec ↗**, **Schema ↗**, **GitHub ↗**, **openastra.org ↗**

---

## File Structure

```
opengpl.org/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    App.jsx
    index.css
    components/
      Navbar.jsx
      Footer.jsx
    pages/
      Home.jsx          ← all 7 sections
```

## Key Decisions

- Single-page site for now — no routing needed, all sections on one page
- No React Router (no multi-page navigation)
- Schema URL placeholder: `https://opengpl.org/schema/v0.1/schema.json`
- All external links open in new tab with `rel="noreferrer"`
- Copy openastra.org's exact Tailwind config and CSS tokens for visual consistency
