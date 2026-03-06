# Website Tabs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add four rich dedicated pages (Spec, Schema, SDK, Sidecar) to opengpl.org using React Router, update the Navbar, and rename "control planes" to "control gates" throughout.

**Architecture:** Add `react-router-dom` and switch `App.jsx` to use `HashRouter` (required for GitHub Pages — no server-side fallback). Each section gets its own page component under `src/pages/`. Home page stays as the landing overview.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, react-router-dom, Vitest + Testing Library

---

### Task 1: Install react-router-dom

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

```bash
npm install react-router-dom
```

Expected output: `added N packages` with `react-router-dom` in `dependencies`.

**Step 2: Verify install**

```bash
grep "react-router-dom" package.json
```

Expected: `"react-router-dom": "^7.x.x"` in `dependencies`.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add react-router-dom"
```

---

### Task 2: Wire up routing in App.jsx

**Files:**
- Modify: `src/App.jsx`

**Step 1: Write failing test**

In `src/components/Navbar.test.jsx`, add a routing test (existing test file — check it renders with router):

```jsx
// src/App.test.jsx (new file)
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders home page by default', () => {
  render(<App />)
  expect(screen.getByText(/The policy language for AI systems/i)).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails or passes baseline**

```bash
npm test -- --run App.test
```

**Step 3: Update App.jsx**

```jsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Spec from './pages/Spec'
import Schema from './pages/Schema'
import Sdk from './pages/Sdk'
import Sidecar from './pages/Sidecar'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spec" element={<Spec />} />
            <Route path="/schema" element={<Schema />} />
            <Route path="/sdk" element={<Sdk />} />
            <Route path="/sidecar" element={<Sidecar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
```

**Step 4: Create stub pages so App compiles**

Create `src/pages/Spec.jsx`:
```jsx
export default function Spec() {
  return <div>Spec</div>
}
```

Create `src/pages/Schema.jsx`:
```jsx
export default function Schema() {
  return <div>Schema</div>
}
```

Create `src/pages/Sdk.jsx`:
```jsx
export default function Sdk() {
  return <div>Sdk</div>
}
```

Create `src/pages/Sidecar.jsx`:
```jsx
export default function Sidecar() {
  return <div>Sidecar</div>
}
```

**Step 5: Run tests**

```bash
npm test -- --run
```

Expected: all existing tests pass.

**Step 6: Commit**

```bash
git add src/App.jsx src/App.test.jsx src/pages/Spec.jsx src/pages/Schema.jsx src/pages/Sdk.jsx src/pages/Sidecar.jsx
git commit -m "feat: wire up HashRouter with routes for spec, schema, sdk, sidecar"
```

---

### Task 3: Update Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.test.jsx`

**Step 1: Read existing test**

Read `src/components/Navbar.test.jsx` and add tests for new links:

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Navbar from './Navbar'

function renderWithRouter(ui) {
  return render(<HashRouter>{ui}</HashRouter>)
}

test('renders OpenGPL logo', () => {
  renderWithRouter(<Navbar />)
  expect(screen.getByText('OpenGPL')).toBeInTheDocument()
})

test('renders all nav links', () => {
  renderWithRouter(<Navbar />)
  expect(screen.getByText('Spec')).toBeInTheDocument()
  expect(screen.getByText('Schema')).toBeInTheDocument()
  expect(screen.getByText('SDK')).toBeInTheDocument()
  expect(screen.getByText('Sidecar')).toBeInTheDocument()
  expect(screen.getByText(/GitHub/)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm SDK/Sidecar links fail**

```bash
npm test -- --run Navbar.test
```

Expected: FAIL — "SDK" and "Sidecar" not found.

**Step 3: Update Navbar.jsx**

```jsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-text-primary font-semibold text-lg">
          <span className="text-accent-cyan">📜</span>
          <span>OpenGPL</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/spec" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Spec
          </Link>
          <Link to="/schema" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Schema
          </Link>
          <Link to="/sdk" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            SDK
          </Link>
          <Link to="/sidecar" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Sidecar
          </Link>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Navbar.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: add SDK and Sidecar nav links, switch to React Router Link"
```

---

### Task 4: Update Footer

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.test.jsx`

**Step 1: Read existing footer test and update it**

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Footer from './Footer'

function renderWithRouter(ui) {
  return render(<HashRouter>{ui}</HashRouter>)
}

test('renders footer links', () => {
  renderWithRouter(<Footer />)
  expect(screen.getByText('Spec')).toBeInTheDocument()
  expect(screen.getByText('Schema')).toBeInTheDocument()
  expect(screen.getByText('SDK')).toBeInTheDocument()
  expect(screen.getByText('Sidecar')).toBeInTheDocument()
  expect(screen.getByText(/GitHub/)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm new links fail**

```bash
npm test -- --run Footer.test
```

**Step 3: Update Footer.jsx**

```jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} · OpenGPL is CC BY 4.0 · by{' '}
          <a
            href="https://openastra.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-cyan transition-colors duration-200"
          >
            OpenAstra
          </a>
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/spec" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Spec
          </Link>
          <Link to="/schema" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Schema
          </Link>
          <Link to="/sdk" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            SDK
          </Link>
          <Link to="/sidecar" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Sidecar
          </Link>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-accent-cyan transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Footer.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.test.jsx
git commit -m "feat: add SDK and Sidecar links to footer"
```

---

### Task 5: Update Home page — rename control planes to control gates

**Files:**
- Modify: `src/pages/Home.jsx`

**Step 1: Update the Four Control Gates section in Home.jsx**

Find the "Four Control Planes" section and replace:

```jsx
{/* Four Control Gates */}
<section className="flex flex-col gap-8">
  <h2 className="text-2xl font-semibold text-text-primary text-center">
    One policy file. Four control gates.
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
    {[
      { icon: '🛡️', name: 'Input Gate', desc: 'Detect and sanitize harmful prompts before they reach the model.' },
      { icon: '🤖', name: 'Model Gate', desc: 'Govern LLM behavior, trust levels, and tool access.' },
      { icon: '📤', name: 'Output Gate', desc: 'Block sensitive data exposure and enforce attribution.' },
      { icon: '📋', name: 'Audit Gate', desc: 'Generate OSCAL compliance artifacts at runtime and at rest.' },
    ].map((gate, i) => (
      <div key={i} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col items-center text-center gap-3">
        <span className="text-3xl">{gate.icon}</span>
        <h3 className="text-text-primary font-semibold text-sm">{gate.name}</h3>
        <p className="text-text-muted text-xs leading-relaxed">{gate.desc}</p>
      </div>
    ))}
  </div>
</section>
```

Also update the Hero CTA buttons to use React Router `Link` and point to the new pages:

```jsx
import { Link } from 'react-router-dom'

// Replace the two hero <a> tags with:
<Link
  to="/spec"
  className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
>
  Read the Spec
</Link>
<Link
  to="/schema"
  className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200"
>
  Get the Schema ↗
</Link>
```

Remove the "Schema Quick-Start" section from Home (it moves to the Schema page).

**Step 2: Run tests**

```bash
npm test -- --run Home.test
```

Expected: PASS (update assertions if needed to match new text).

**Step 3: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: rename control planes to control gates, update hero CTAs to router links"
```

---

### Task 6: Build Spec page

**Files:**
- Modify: `src/pages/Spec.jsx`

**Step 1: Write test**

Create `src/pages/Spec.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Spec from './Spec'

function renderWithRouter(ui) {
  return render(<HashRouter>{ui}</HashRouter>)
}

test('renders spec page heading', () => {
  renderWithRouter(<Spec />)
  expect(screen.getByText(/The OpenGPL Specification/i)).toBeInTheDocument()
})

test('renders four control gates', () => {
  renderWithRouter(<Spec />)
  expect(screen.getByText('Input Gate')).toBeInTheDocument()
  expect(screen.getByText('Model Gate')).toBeInTheDocument()
  expect(screen.getByText('Output Gate')).toBeInTheDocument()
  expect(screen.getByText('Audit Gate')).toBeInTheDocument()
})

test('renders compliance frameworks', () => {
  renderWithRouter(<Spec />)
  expect(screen.getByText(/NIST AI RMF/i)).toBeInTheDocument()
  expect(screen.getByText(/FedRAMP/i)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm they fail**

```bash
npm test -- --run Spec.test
```

**Step 3: Implement Spec.jsx**

```jsx
export default function Spec() {
  const gates = [
    {
      icon: '🛡️',
      name: 'Input Gate',
      desc: 'Intercepts all prompts before they reach the model. Detects prompt injection, jailbreak attempts, and PII in user input. Supports semantic filters — not just keyword matching — so policies apply to intent, not just surface text.',
    },
    {
      icon: '🤖',
      name: 'Model Gate',
      desc: 'Controls which models an agent can invoke, at what trust level, and with which tools. Hallucination thresholds, max token limits, and tool-use permissions are first-class policy primitives — not config files.',
    },
    {
      icon: '📤',
      name: 'Output Gate',
      desc: 'Scans generated responses before delivery. Blocks PII exposure, enforces attribution requirements, and applies data classification labels. Policies can redact, replace, or deny based on output content.',
    },
    {
      icon: '📋',
      name: 'Audit Gate',
      desc: 'Auto-generates OSCAL-compliant audit artifacts at runtime. Every policy decision is logged with agent identity, policy name, matched condition, and effect. Produces compliance evidence at rest and in motion.',
    },
  ]

  const complianceFrameworks = [
    { name: 'NIST AI RMF', coverage: 'Maps to Govern, Map, Measure, and Manage functions. Input and output gates address Map/Measure; audit gate produces evidence for Govern.' },
    { name: 'FedRAMP', coverage: 'OSCAL artifact generation satisfies FedRAMP Moderate documentation requirements. Policy enforcement addresses AC, AU, and SI control families.' },
    { name: 'HIPAA', coverage: 'Output gate PII/PHI detection enforces minimum necessary standard. Audit gate provides required access logs for ePHI.' },
    { name: 'EU AI Act', coverage: 'Risk classification primitives align with Article 9 (risk management) and Article 12 (record-keeping) for high-risk AI systems.' },
    { name: 'SOC 2', coverage: 'Audit gate evidence satisfies CC7 (Monitoring) and CC9 (Risk Mitigation) trust service criteria.' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">The OpenGPL Specification</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          OpenGPL is an open, declarative policy language purpose-built for generative AI systems.
          It defines how AI agents behave, what resources they can access, what they can produce,
          and how they demonstrate compliance — in a single, auditable policy file.
        </p>
        <p className="text-text-muted text-base leading-relaxed">
          Existing policy engines like OPA/Rego and AWS Cedar were designed for deterministic systems.
          Generative AI introduces probabilistic outputs, semantic reasoning requirements, and novel
          threat vectors — prompt injection, hallucination, and jailbreaks — that older frameworks
          were never built to handle. OpenGPL treats these as first-class primitives.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
          >
            View on GitHub ↗
          </a>
        </div>
      </section>

      {/* Four Control Gates */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary">One policy file. Four control gates.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gates.map((gate, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{gate.icon}</span>
                <h3 className="text-text-primary font-semibold text-base">{gate.name}</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{gate.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Syntax */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary">Policy syntax</h2>
        <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
          A policy is a named block that declares the agent scope, action, resource, effect, and an optional condition.
          Multiple policies in one file are evaluated in order; the first matching policy wins.
        </p>
        <div className="bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted"># Deny PII in generated output</p>
          <p className="text-accent-cyan mt-2">{'policy "restrict-pii-output" {'}</p>
          <p className="text-accent-cyan pl-4">{'agent:    *                        # applies to all agents'}</p>
          <p className="text-accent-cyan pl-4">{'action:   generate'}</p>
          <p className="text-accent-cyan pl-4">{'resource: user_data'}</p>
          <p className="text-accent-cyan pl-4">{'effect:   deny'}</p>
          <p className="text-accent-cyan pl-4">{'when:     output.contains_pii == true'}</p>
          <p className="text-accent-cyan">{'}'}</p>
          <p className="text-text-muted mt-4"># Restrict tool access by trust level</p>
          <p className="text-accent-cyan mt-2">{'policy "tool-access-control" {'}</p>
          <p className="text-accent-cyan pl-4">{'agent:    customer-support-bot'}</p>
          <p className="text-accent-cyan pl-4">{'action:   invoke_tool'}</p>
          <p className="text-accent-cyan pl-4">{'resource: payment_api'}</p>
          <p className="text-accent-cyan pl-4">{'effect:   deny'}</p>
          <p className="text-accent-cyan pl-4">{'when:     agent.trust_level < 3'}</p>
          <p className="text-accent-cyan">{'}'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { field: 'agent', desc: 'Agent identifier or wildcard (*). Scopes the policy to specific AI agents.' },
            { field: 'action', desc: 'The operation being governed: generate, invoke_tool, retrieve, embed.' },
            { field: 'resource', desc: 'The target resource or data class the action is applied to.' },
            { field: 'effect', desc: 'allow or deny. Determines the outcome when the policy matches.' },
            { field: 'when', desc: 'Optional boolean condition. Supports dot-notation on agent, input, output context.' },
          ].map((f, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-4 flex flex-col gap-1">
              <code className="text-accent-cyan text-sm font-mono">{f.field}</code>
              <p className="text-text-muted text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Mapping */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary">Compliance framework mapping</h2>
        <div className="flex flex-col gap-3">
          {complianceFrameworks.map((fw, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-5 flex flex-col sm:flex-row gap-4">
              <span className="px-3 py-1 rounded-full border border-subtle text-text-muted text-xs tracking-widest uppercase shrink-0 self-start">
                {fw.name}
              </span>
              <p className="text-text-muted text-sm leading-relaxed">{fw.coverage}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Spec.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/Spec.jsx src/pages/Spec.test.jsx
git commit -m "feat: add rich Spec page with control gates, policy syntax, compliance mapping"
```

---

### Task 7: Build Schema page

**Files:**
- Modify: `src/pages/Schema.jsx`

**Step 1: Write test**

Create `src/pages/Schema.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Schema from './Schema'

test('renders schema page heading', () => {
  render(<HashRouter><Schema /></HashRouter>)
  expect(screen.getByText(/OpenGPL JSON Schema/i)).toBeInTheDocument()
})

test('renders schema URL', () => {
  render(<HashRouter><Schema /></HashRouter>)
  expect(screen.getByText(/schema\.json/i)).toBeInTheDocument()
})

test('renders download CTA', () => {
  render(<HashRouter><Schema /></HashRouter>)
  expect(screen.getByText(/Download Schema/i)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm they fail**

```bash
npm test -- --run Schema.test
```

**Step 3: Implement Schema.jsx**

```jsx
const SCHEMA_URL = 'https://opengpl.org/schema/v0.1/schema.json'

export default function Schema() {
  const fields = [
    { field: 'policy', type: 'string', desc: 'Unique name for the policy block. Used in audit logs and OSCAL artifacts.' },
    { field: 'agent', type: 'string | *', desc: 'Agent identifier or wildcard. Scopes which agents this policy applies to.' },
    { field: 'action', type: 'enum', desc: 'The governed operation: generate, invoke_tool, retrieve, embed, or *.' },
    { field: 'resource', type: 'string', desc: 'Target resource or data class. Supports namespacing (e.g. pii:ssn, finance:*).' },
    { field: 'effect', type: 'allow | deny', desc: 'Policy outcome when matched. deny takes precedence when multiple policies conflict.' },
    { field: 'when', type: 'expression', desc: 'Optional condition expression. Dot-notation over agent, input, output context objects.' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">OpenGPL JSON Schema</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          The OpenGPL JSON Schema validates <code className="text-accent-cyan">.gpl</code> policy files
          and enables IDE autocompletion, inline documentation, and syntax checking — without any build step.
        </p>
        <p className="text-text-muted text-base leading-relaxed">
          Hosted at <code className="text-accent-cyan text-sm">{SCHEMA_URL}</code>,
          the schema is versioned alongside the specification and compatible with any JSON Schema-aware editor.
        </p>
      </section>

      {/* IDE Integration */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">IDE integration</h2>
        <p className="text-text-muted text-sm leading-relaxed">Add to VS Code <code className="text-accent-cyan">settings.json</code> for instant validation and autocomplete on all <code className="text-accent-cyan">.gpl</code> files:</p>
        <div className="max-w-2xl bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted"># .vscode/settings.json</p>
          <p className="text-accent-cyan mt-2">{'{'}</p>
          <p className="text-accent-cyan pl-4">{'"yaml.schemas": {'}</p>
          <p className="text-accent-cyan pl-8">{`"${SCHEMA_URL}": "*.gpl"`}</p>
          <p className="text-accent-cyan pl-4">{'}'}</p>
          <p className="text-accent-cyan">{'}'}</p>
        </div>
        <p className="text-text-muted text-xs">Requires the <a href="https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml" target="_blank" rel="noreferrer" className="text-accent-cyan hover:underline">YAML extension by Red Hat</a> for VS Code.</p>
      </section>

      {/* Schema Structure */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Schema structure</h2>
        <p className="text-text-muted text-sm leading-relaxed">Each policy block in a <code className="text-accent-cyan">.gpl</code> file maps to the following schema fields:</p>
        <div className="flex flex-col gap-3">
          {fields.map((f, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-5 grid grid-cols-1 sm:grid-cols-[140px_100px_1fr] gap-3 items-start">
              <code className="text-accent-cyan text-sm font-mono">{f.field}</code>
              <span className="text-text-muted text-xs font-mono">{f.type}</span>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="flex flex-col sm:flex-row gap-4">
        <a
          href={SCHEMA_URL}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          Download Schema
        </a>
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200 text-center"
        >
          View on GitHub ↗
        </a>
      </section>

    </div>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Schema.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/Schema.jsx src/pages/Schema.test.jsx
git commit -m "feat: add rich Schema page with IDE integration and field reference"
```

---

### Task 8: Build SDK page

**Files:**
- Modify: `src/pages/Sdk.jsx`

**Step 1: Write test**

Create `src/pages/Sdk.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Sdk from './Sdk'

test('renders SDK page heading', () => {
  render(<HashRouter><Sdk /></HashRouter>)
  expect(screen.getByText(/OpenGPL Python SDK/i)).toBeInTheDocument()
})

test('renders install command', () => {
  render(<HashRouter><Sdk /></HashRouter>)
  expect(screen.getByText(/pip install opengpl-sdk/i)).toBeInTheDocument()
})

test('renders CLI commands', () => {
  render(<HashRouter><Sdk /></HashRouter>)
  expect(screen.getByText(/opengpl validate/i)).toBeInTheDocument()
  expect(screen.getByText(/opengpl eval/i)).toBeInTheDocument()
  expect(screen.getByText(/opengpl audit/i)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm they fail**

```bash
npm test -- --run Sdk.test
```

**Step 3: Implement Sdk.jsx**

```jsx
const cliCommands = [
  {
    command: 'opengpl validate <policy.gpl>',
    desc: 'Checks policy file syntax and schema validity. Exits 0 on success, 1 on error with line-level diagnostics.',
  },
  {
    command: 'opengpl eval <policy.gpl> --prompt "..."',
    desc: 'Tests a prompt string against the specified policy. Prints the matched policy name, effect, and any triggered conditions.',
  },
  {
    command: 'opengpl audit <policy.gpl> --framework FedRAMP-Moderate',
    desc: 'Assesses a policy file against a compliance framework and reports coverage gaps. Supported frameworks: FedRAMP-Moderate, NIST-AI-RMF, HIPAA, EU-AI-Act.',
  },
]

export default function Sdk() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">OpenGPL Python SDK</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          The official Python SDK for loading, evaluating, and auditing OpenGPL policies programmatically.
          Embed policy enforcement directly in your AI application or CI pipeline.
        </p>
      </section>

      {/* Install */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Installation</h2>
        <div className="max-w-lg bg-surface border border-subtle rounded-xl p-5 font-mono text-sm">
          <p className="text-text-muted text-xs mb-2"># requires Python 3.9+</p>
          <p className="text-accent-cyan">pip install opengpl-sdk</p>
        </div>
      </section>

      {/* Quickstart */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Quickstart</h2>
        <div className="bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted">from opengpl import PolicyEngine</p>
          <p className="text-text-muted mt-2"># Load a policy file</p>
          <p className="text-accent-cyan">engine = PolicyEngine("policy.gpl")</p>
          <p className="text-text-muted mt-2"># Check a user prompt against the policy</p>
          <p className="text-accent-cyan">result = engine.check_input(</p>
          <p className="text-accent-cyan pl-4">agent="customer-support-bot",</p>
          <p className="text-accent-cyan pl-4">prompt="Can you share the user's SSN?"</p>
          <p className="text-accent-cyan">)</p>
          <p className="text-text-muted mt-2"># result.passed → False</p>
          <p className="text-text-muted"># result.matched_policy → "restrict-pii-output"</p>
          <p className="text-text-muted"># result.effect → "deny"</p>
          <p className="text-accent-cyan mt-2">if not result.passed:</p>
          <p className="text-accent-cyan pl-4">raise PolicyViolation(result.reasons)</p>
        </div>
      </section>

      {/* CLI Reference */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">CLI reference</h2>
        <p className="text-text-muted text-sm leading-relaxed">The SDK ships with the <code className="text-accent-cyan">opengpl</code> CLI for local development and CI integration.</p>
        <div className="flex flex-col gap-4">
          {cliCommands.map((cmd, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-5 flex flex-col gap-3">
              <code className="text-accent-cyan text-sm font-mono">{cmd.command}</code>
              <p className="text-text-muted text-sm leading-relaxed">{cmd.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://pypi.org/project/opengpl-sdk"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          View on PyPI ↗
        </a>
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200 text-center"
        >
          View on GitHub ↗
        </a>
      </section>

    </div>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Sdk.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/Sdk.jsx src/pages/Sdk.test.jsx
git commit -m "feat: add rich SDK page with install, quickstart, and CLI reference"
```

---

### Task 9: Build Sidecar page

**Files:**
- Modify: `src/pages/Sidecar.jsx`

**Step 1: Write test**

Create `src/pages/Sidecar.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Sidecar from './Sidecar'

test('renders sidecar page heading', () => {
  render(<HashRouter><Sidecar /></HashRouter>)
  expect(screen.getByText(/OpenGPL Docker Sidecar/i)).toBeInTheDocument()
})

test('renders docker run command', () => {
  render(<HashRouter><Sidecar /></HashRouter>)
  expect(screen.getByText(/docker run/i)).toBeInTheDocument()
})

test('renders endpoint reference', () => {
  render(<HashRouter><Sidecar /></HashRouter>)
  expect(screen.getByText(/\/check\/input/i)).toBeInTheDocument()
  expect(screen.getByText(/\/check\/output/i)).toBeInTheDocument()
  expect(screen.getByText(/\/health/i)).toBeInTheDocument()
})
```

**Step 2: Run tests to confirm they fail**

```bash
npm test -- --run Sidecar.test
```

**Step 3: Implement Sidecar.jsx**

```jsx
const endpoints = [
  {
    method: 'GET',
    path: '/health',
    desc: 'Returns 200 OK with service status. Use for liveness and readiness probes in Kubernetes.',
    request: null,
    response: '{ "status": "ok" }',
  },
  {
    method: 'POST',
    path: '/check/input',
    desc: 'Validates a prompt against the named policy before it reaches the LLM. Returns pass/deny with matched policy and reasons.',
    request: '{\n  "policy": "restrict-pii-input",\n  "agent": "customer-support-bot",\n  "prompt": "What is the user SSN?"\n}',
    response: '{\n  "passed": false,\n  "effect": "deny",\n  "matched_policy": "restrict-pii-input",\n  "reasons": ["prompt.contains_pii == true"]\n}',
  },
  {
    method: 'POST',
    path: '/check/output',
    desc: 'Validates an LLM response before it is returned to the user. Same request/response shape as /check/input but evaluates output context.',
    request: '{\n  "policy": "restrict-pii-output",\n  "agent": "customer-support-bot",\n  "output": "The user SSN is 123-45-6789."\n}',
    response: '{\n  "passed": false,\n  "effect": "deny",\n  "matched_policy": "restrict-pii-output",\n  "reasons": ["output.contains_pii == true"]\n}',
  },
]

export default function Sidecar() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">OpenGPL Docker Sidecar</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          A self-hosted Docker container that enforces OpenGPL policies as an HTTP sidecar.
          Drop it alongside any LLM service — no SDK integration required.
          Any application that can make an HTTP request can enforce policies.
        </p>
      </section>

      {/* Docker Run */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Run the sidecar</h2>
        <div className="bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted"># Mount your policy file and expose port 8080</p>
          <p className="text-accent-cyan mt-2">docker run \</p>
          <p className="text-accent-cyan pl-4">-v $(pwd)/policy.gpl:/etc/opengpl/policy.gpl \</p>
          <p className="text-accent-cyan pl-4">-p 8080:8080 \</p>
          <p className="text-accent-cyan pl-4">ghcr.io/sadayamuthu/opengpl-sidecar:latest</p>
        </div>
        <div className="bg-surface border border-subtle rounded-xl p-5 flex flex-col gap-2">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">Local development</p>
          <p className="text-text-muted text-sm">Build from source at the repo root:</p>
          <code className="text-accent-cyan text-sm font-mono">docker build -f sidecar/Dockerfile -t opengpl-sidecar .</code>
        </div>
      </section>

      {/* Endpoints */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Endpoints</h2>
        <div className="flex flex-col gap-6">
          {endpoints.map((ep, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-accent-blue text-space">{ep.method}</span>
                <code className="text-accent-cyan text-sm font-mono">{ep.path}</code>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{ep.desc}</p>
              {ep.request && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Request</p>
                    <div className="bg-space border border-subtle rounded-lg p-4 font-mono text-xs text-accent-cyan whitespace-pre">{ep.request}</div>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Response</p>
                    <div className="bg-space border border-subtle rounded-lg p-4 font-mono text-xs text-accent-cyan whitespace-pre">{ep.response}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Policy Caching Note */}
      <section className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-3">
        <p className="text-text-primary font-semibold text-sm">Policy caching</p>
        <p className="text-text-muted text-sm leading-relaxed">
          The sidecar caches loaded policies for the lifetime of the process.
          If you update your mounted <code className="text-accent-cyan">.gpl</code> file,
          restart the container to apply the new policies.
        </p>
        <code className="text-accent-cyan text-sm font-mono">docker restart &lt;container-id&gt;</code>
      </section>

      {/* CTAs */}
      <section className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://github.com/sadayamuthu/opengpl/tree/main/sidecar"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          View Sidecar on GitHub ↗
        </a>
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200 text-center"
        >
          View Full Repo ↗
        </a>
      </section>

    </div>
  )
}
```

**Step 4: Run tests**

```bash
npm test -- --run Sidecar.test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/Sidecar.jsx src/pages/Sidecar.test.jsx
git commit -m "feat: add rich Sidecar page with Docker run, endpoints, and caching note"
```

---

### Task 10: Run full test suite and smoke-test locally

**Step 1: Run all tests**

```bash
npm test -- --run
```

Expected: all tests PASS.

**Step 2: Start dev server and verify all routes**

```bash
npm run dev
```

Open browser and verify:
- `http://localhost:5173/#/` — Home page renders
- `http://localhost:5173/#/spec` — Spec page renders with all sections
- `http://localhost:5173/#/schema` — Schema page renders
- `http://localhost:5173/#/sdk` — SDK page renders
- `http://localhost:5173/#/sidecar` — Sidecar page renders
- Navbar links navigate correctly between all pages

**Step 3: Build for production**

```bash
npm run build
```

Expected: build completes with no errors.

**Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address any issues found during smoke testing"
```
