# opengpl.org Website Tabs Design

**Date:** 2026-03-06
**Approach:** React Router with separate pages (Option C)
**Stack:** React + Vite + Tailwind CSS + React Router DOM

---

## Goal

Extend the opengpl.org website with four rich dedicated pages for Spec, Schema, SDK, and Sidecar — matching the openastra.org pattern of client-side routing with separate page components. Update all terminology from "control planes" to "control gates" for brand alignment with ControlGate.

---

## Architecture

Add React Router DOM (same as openastra.org). Wrap `App.jsx` in `BrowserRouter` with `Routes`.

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home.jsx` | Hero, Why OpenGPL, compliance badges, CTAs to each section |
| `/spec` | `Spec.jsx` | Full spec page — Four Control Gates, policy syntax, compliance mapping |
| `/schema` | `Schema.jsx` | Schema page — IDE integration, structure overview, download |
| `/sdk` | `Sdk.jsx` | SDK page — install, quickstart, CLI reference |
| `/sidecar` | `Sidecar.jsx` | Sidecar page — Docker run, endpoints, request/response examples |

### File Structure

```
src/
  App.jsx                  ← add BrowserRouter + Routes
  components/
    Navbar.jsx             ← add SDK + Sidecar links, switch to React Router <Link>
    Footer.jsx             ← update links
  pages/
    Home.jsx               ← keep hero + why OpenGPL + compliance badges
    Spec.jsx               ← new
    Schema.jsx             ← new
    Sdk.jsx                ← new
    Sidecar.jsx            ← new
```

---

## Navbar

Current: `Spec | Schema | GitHub ↗`
Updated: `Spec | Schema | SDK | Sidecar | GitHub ↗`

- `Spec`, `Schema`, `SDK`, `Sidecar` → React Router `<Link>` (client-side nav)
- `GitHub ↗` → external `<a>` (unchanged)

---

## Page Content

### Home (`/`)

Keep existing content:
- Hero (version badge, h1, subtitle, code block, CTAs)
- Why OpenGPL (3 cards)
- Four Control Gates (renamed from "Four Control Planes") — 4-column grid
- Built for regulated environments (compliance badges)
- Schema Quick-Start section removed (moved to `/schema`)

Update:
- Section heading: "One policy file. Four control gates."
- Gate names: Input Gate, Model Gate, Output Gate, Audit Gate
- CTA buttons updated to route to `/spec`, `/schema`, `/sdk`, `/sidecar`

### Spec (`/spec`)

Sections:
1. **Page header** — "The OpenGPL Specification" + intro paragraph
2. **Why OpenGPL** — why existing tools (OPA/Rego, AWS Cedar) fall short for generative AI
3. **Four Control Gates** — rich expanded cards:
   - Input Gate: detect/sanitize harmful prompts, prompt injection defense
   - Model Gate: govern LLM behavior, trust levels, tool access, hallucination thresholds
   - Output Gate: block PII exposure, enforce attribution, semantic filtering
   - Audit Gate: auto-generate OSCAL artifacts, runtime + at-rest compliance evidence
4. **Policy syntax** — annotated `.gpl` code block with field explanations
5. **Compliance framework mapping** — table: NIST AI RMF, FedRAMP, HIPAA, EU AI Act, SOC 2
6. **CTA** — View on GitHub

### Schema (`/schema`)

Sections:
1. **Page header** — "OpenGPL JSON Schema" + intro (what the schema validates)
2. **IDE integration** — VS Code `settings.json` code block (existing)
3. **Schema structure overview** — key fields: `policy`, `agent`, `action`, `resource`, `effect`, `when`
4. **Download CTAs** — Download Schema JSON + View on GitHub

### SDK (`/sdk`)

Sections:
1. **Page header** — "OpenGPL Python SDK" + intro
2. **Installation** — `pip install opengpl-sdk` code block
3. **Quickstart** — Python code block: `PolicyEngine` init + `check_input()` usage
4. **CLI reference** — table of 3 commands:
   - `opengpl validate <policy.gpl>` — checks policy syntax and structure
   - `opengpl eval <policy.gpl> --prompt "..."` — tests a prompt against a policy
   - `opengpl audit <policy.gpl> --framework FedRAMP-Moderate` — assesses compliance coverage
5. **CTAs** — PyPI + GitHub

### Sidecar (`/sidecar`)

Sections:
1. **Page header** — "OpenGPL Docker Sidecar" + intro (self-hosted HTTP enforcement layer)
2. **Docker run** — code block with `docker run` command, volume mount, port mapping
3. **Endpoints reference** — table:
   - `GET /health` — health check
   - `POST /check/input` — pre-LLM prompt validation
   - `POST /check/output` — post-LLM response validation
4. **Request/response example** — curl command + JSON response (`passed`, `action`, `reasons`)
5. **Important note** — policy caching: policies are cached for process lifetime; restart container after policy changes
6. **Local dev** — `docker build` command from repo root
7. **CTAs** — Docker Hub + GitHub

---

## Terminology Change

| Old | New |
|-----|-----|
| Four control planes | Four control gates |
| One policy file. Four planes of control. | One policy file. Four control gates. |
| Input Controls | Input Gate |
| Model Controls | Model Gate |
| Output Controls | Output Gate |
| Audit Controls | Audit Gate |

---

## Key Decisions

- React Router DOM added (matches openastra.org pattern)
- `vite.config.js` needs `historyApiFallback` or equivalent for client-side routing on GitHub Pages (or use hash router)
- All four section pages are rich/detailed — not summary cards
- Home page becomes pure landing/overview; detail lives in subpages
- No new external dependencies beyond React Router DOM
