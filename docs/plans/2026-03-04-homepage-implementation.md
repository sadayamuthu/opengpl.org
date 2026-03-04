# OpenGPL Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the opengpl.org single-page homepage as a React + Vite + Tailwind site matching the openastra.org design system.

**Architecture:** Single-page React app with no routing — one `Home.jsx` containing all 7 sections (Navbar, Hero, Why, Control Planes, Compliance, Schema, Footer) as components. No React Router needed.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Vitest 4 + @testing-library/react 16, jsdom

---

### Task 1: Scaffold project config files

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `eslint.config.js`
- Create: `index.html`

**Step 1: Create `package.json`**

```json
{
  "name": "opengpl",
  "private": true,
  "engines": { "node": ">=20.0.0" },
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "@vitest/ui": "^4.0.18",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "jsdom": "^22.1.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "vite": "^7.3.1",
    "vitest": "^4.0.18"
  }
}
```

**Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

**Step 3: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#050A14',
        surface: '#0D1424',
        subtle: '#1E2D4A',
        'accent-blue': '#4F8EF7',
        'accent-cyan': '#00D4FF',
        'text-primary': '#F0F6FF',
        'text-muted': '#7A90B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 4: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Step 5: Create `eslint.config.js`**

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

**Step 6: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="OpenGPL — The policy language for AI systems. An open, declarative standard for governing AI agent behavior, access, and compliance." />
    <meta property="og:title" content="OpenGPL" />
    <meta property="og:description" content="The policy language for AI systems." />
    <meta property="og:type" content="website" />
    <title>OpenGPL — The policy language for AI systems</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Step 7: Install dependencies**

```bash
npm install
```

Expected: `node_modules` created, no errors.

**Step 8: Commit**

```bash
git add package.json vite.config.js tailwind.config.js postcss.config.js eslint.config.js index.html
git commit -m "chore: scaffold project config"
```

---

### Task 2: Set up CSS, test setup, main entry, and App

**Files:**
- Create: `src/index.css`
- Create: `src/test/setup.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

**Step 1: Create `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-space text-text-primary font-sans;
  }
}

@layer utilities {
  .glow-cyan {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  .glow-blue {
    box-shadow: 0 0 20px rgba(79, 142, 247, 0.3);
  }
}
```

**Step 2: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom'
```

**Step 3: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Step 4: Create `src/App.jsx`**

```jsx
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </div>
  )
}
```

**Step 5: Commit**

```bash
git add src/
git commit -m "chore: add CSS, test setup, main entry, and App shell"
```

---

### Task 3: Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Navbar.test.jsx`

**Step 1: Write the failing test — `src/components/Navbar.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the OpenGPL logo', () => {
    render(<Navbar />)
    expect(screen.getByText('OpenGPL')).toBeInTheDocument()
  })

  it('renders Spec anchor link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /spec/i })).toHaveAttribute('href', '#spec')
  })

  it('renders Schema anchor link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /schema/i })).toHaveAttribute('href', '#schema')
  })

  it('renders GitHub external link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Navbar.test.jsx
```

Expected: FAIL — `Cannot find module './Navbar'`

**Step 3: Create `src/components/Navbar.jsx`**

```jsx
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-text-primary font-semibold text-lg">
          <span className="text-accent-cyan">📜</span>
          <span>OpenGPL</span>
        </a>
        <div className="flex items-center gap-8">
          <a href="#spec" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Spec
          </a>
          <a href="#schema" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Schema
          </a>
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

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/Navbar.test.jsx
```

Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: add Navbar component"
```

---

### Task 4: Footer component

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.test.jsx`

**Step 1: Write the failing test — `src/components/Footer.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders copyright with OpenAstra attribution', () => {
    render(<Footer />)
    expect(screen.getByText(/OpenAstra/i)).toBeInTheDocument()
  })

  it('renders CC BY 4.0 license notice', () => {
    render(<Footer />)
    expect(screen.getByText(/CC BY 4\.0/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/sadayamuthu/opengpl')
  })

  it('renders openastra.org link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /openastra/i })).toHaveAttribute('href', 'https://openastra.org')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/Footer.test.jsx
```

Expected: FAIL — `Cannot find module './Footer'`

**Step 3: Create `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} OpenAstra · OpenGPL is CC BY 4.0
        </p>
        <div className="flex items-center gap-6 text-sm">
          <a href="#spec" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Spec
          </a>
          <a href="#schema" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Schema
          </a>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-accent-cyan transition-colors duration-200"
          >
            GitHub ↗
          </a>
          <a
            href="https://openastra.org"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-accent-cyan transition-colors duration-200"
          >
            OpenAstra ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/Footer.test.jsx
```

Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.test.jsx
git commit -m "feat: add Footer component"
```

---

### Task 5: Home page — Hero section

**Files:**
- Create: `src/pages/Home.jsx` (start with Hero only)
- Create: `src/pages/Home.test.jsx` (start with Hero tests)

**Step 1: Write the failing test — `src/pages/Home.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home — Hero', () => {
  it('renders version badge', () => {
    render(<Home />)
    expect(screen.getByText(/v0\.1/i)).toBeInTheDocument()
  })

  it('renders hero headline', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The policy language for AI systems.')
  })

  it('renders Read the Spec CTA linking to GitHub', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /read the spec/i })).toHaveAttribute(
      'href',
      'https://github.com/sadayamuthu/opengpl'
    )
  })

  it('renders Get the Schema CTA linking to schema file', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /get the schema/i })).toHaveAttribute(
      'href',
      'https://opengpl.org/schema/v0.1/schema.json'
    )
  })

  it('renders sample policy code block', () => {
    render(<Home />)
    expect(screen.getByText(/restrict-pii-output/i)).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: FAIL — `Cannot find module './Home'`

**Step 3: Create `src/pages/Home.jsx` with Hero section**

```jsx
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-32">

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-subtle text-text-muted text-xs tracking-widest uppercase">
          <span className="text-accent-cyan">✦</span> v0.1 · Public Draft
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight max-w-3xl text-accent-cyan">
          The policy language for AI systems.
        </h1>
        <p className="text-text-muted text-lg max-w-xl leading-relaxed">
          OpenGPL is an open, declarative standard for governing how AI agents behave —
          what they can access, produce, and how they prove compliance at runtime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
          >
            Read the Spec
          </a>
          <a
            href="https://opengpl.org/schema/v0.1/schema.json"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200"
          >
            Get the Schema ↗
          </a>
        </div>
        <div className="w-full max-w-2xl bg-surface border border-subtle rounded-xl p-6 font-mono text-sm text-left flex flex-col gap-1">
          <p className="text-text-muted"># Example policy (policy.gpl)</p>
          <p className="text-accent-cyan mt-1">{'policy "restrict-pii-output" {'}</p>
          <p className="text-accent-cyan pl-4">{'agent:    *'}</p>
          <p className="text-accent-cyan pl-4">{'action:   generate'}</p>
          <p className="text-accent-cyan pl-4">{'resource: user_data'}</p>
          <p className="text-accent-cyan pl-4">{'effect:   deny'}</p>
          <p className="text-accent-cyan pl-4">{'when:     output.contains_pii == true'}</p>
          <p className="text-accent-cyan">{'}'}</p>
        </div>
      </section>

    </div>
  )
}
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: add Home page Hero section"
```

---

### Task 6: Home page — Why OpenGPL section

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.test.jsx`

**Step 1: Add failing tests to `src/pages/Home.test.jsx`**

Add inside the `describe` block:

```jsx
describe('Home — Why OpenGPL', () => {
  it('renders Why OpenGPL section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Why OpenGPL/i)).toBeInTheDocument()
  })

  it('renders the three why cards', () => {
    render(<Home />)
    expect(screen.getByText(/Existing tools weren't built for this/i)).toBeInTheDocument()
    expect(screen.getByText(/LLM-native primitives/i)).toBeInTheDocument()
    expect(screen.getByText(/Compliance evidence at runtime/i)).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: FAIL — cannot find "Why OpenGPL"

**Step 3: Add Why section to `src/pages/Home.jsx`**

Add after the Hero section closing `</section>` tag, before the closing `</div>`:

```jsx
      {/* Why OpenGPL */}
      <section id="spec" className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary text-center">Why OpenGPL</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Existing tools weren't built for this",
              body: "OPA/Rego and AWS Cedar were designed for deterministic systems. Generative AI outputs are probabilistic — not binary.",
            },
            {
              title: "LLM-native primitives",
              body: "Trust levels, hallucination thresholds, and tool access are first-class concepts in every OpenGPL policy.",
            },
            {
              title: "Compliance evidence at runtime",
              body: "OpenGPL auto-generates OSCAL artifacts. Not just policy enforcement — provable compliance at rest and in motion.",
            },
          ].map((card, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-3">
              <h3 className="text-text-primary font-semibold text-base">{card.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: PASS (all tests)

**Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: add Why OpenGPL section"
```

---

### Task 7: Home page — Four Control Planes section

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.test.jsx`

**Step 1: Add failing tests**

```jsx
describe('Home — Control Planes', () => {
  it('renders control planes section heading', () => {
    render(<Home />)
    expect(screen.getByText(/One policy file\. Four planes of control\./i)).toBeInTheDocument()
  })

  it('renders all four control plane cards', () => {
    render(<Home />)
    expect(screen.getByText('Input Controls')).toBeInTheDocument()
    expect(screen.getByText('Model Controls')).toBeInTheDocument()
    expect(screen.getByText('Output Controls')).toBeInTheDocument()
    expect(screen.getByText('Audit Controls')).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: FAIL

**Step 3: Add Control Planes section to `src/pages/Home.jsx`**

```jsx
      {/* Four Control Planes */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary text-center">
          One policy file. Four planes of control.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { icon: '🛡️', name: 'Input Controls', desc: 'Detect and sanitize harmful prompts before they reach the model.' },
            { icon: '🤖', name: 'Model Controls', desc: 'Govern LLM behavior, trust levels, and tool access.' },
            { icon: '📤', name: 'Output Controls', desc: 'Block sensitive data exposure and enforce attribution.' },
            { icon: '📋', name: 'Audit Controls', desc: 'Generate OSCAL compliance artifacts at runtime and at rest.' },
          ].map((plane, i) => (
            <div key={i} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col items-center text-center gap-3">
              <span className="text-3xl">{plane.icon}</span>
              <h3 className="text-text-primary font-semibold text-sm">{plane.name}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{plane.desc}</p>
            </div>
          ))}
        </div>
      </section>
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: add Four Control Planes section"
```

---

### Task 8: Home page — Compliance Coverage section

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.test.jsx`

**Step 1: Add failing tests**

```jsx
describe('Home — Compliance', () => {
  it('renders compliance section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Built for regulated environments/i)).toBeInTheDocument()
  })

  it('renders all five compliance badges', () => {
    render(<Home />)
    expect(screen.getByText('NIST AI RMF')).toBeInTheDocument()
    expect(screen.getByText('FedRAMP')).toBeInTheDocument()
    expect(screen.getByText('HIPAA')).toBeInTheDocument()
    expect(screen.getByText('EU AI Act')).toBeInTheDocument()
    expect(screen.getByText('SOC 2')).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: FAIL

**Step 3: Add Compliance section to `src/pages/Home.jsx`**

```jsx
      {/* Compliance Coverage */}
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold text-text-primary text-center">
          Built for regulated environments.
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['NIST AI RMF', 'FedRAMP', 'HIPAA', 'EU AI Act', 'SOC 2'].map((badge) => (
            <span
              key={badge}
              className="px-4 py-1.5 rounded-full border border-subtle text-text-muted text-xs tracking-widest uppercase"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: add Compliance Coverage section"
```

---

### Task 9: Home page — Schema Quick-Start section

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.test.jsx`

**Step 1: Add failing tests**

```jsx
describe('Home — Schema Quick-Start', () => {
  it('renders schema section heading', () => {
    render(<Home />)
    expect(screen.getByText(/Use it today/i)).toBeInTheDocument()
  })

  it('renders VS Code settings snippet', () => {
    render(<Home />)
    expect(screen.getByText(/yaml\.schemas/i)).toBeInTheDocument()
  })

  it('renders Download Schema CTA', () => {
    render(<Home />)
    const links = screen.getAllByRole('link', { name: /download schema/i })
    expect(links.length).toBeGreaterThan(0)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: FAIL

**Step 3: Add Schema section to `src/pages/Home.jsx`**

```jsx
      {/* Schema Quick-Start */}
      <section id="schema" className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary text-center">Use it today.</h2>
        <div className="max-w-2xl mx-auto w-full bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-2">
          <p className="text-text-muted"># Add to VS Code (settings.json)</p>
          <p className="text-accent-cyan mt-1">{'{'}</p>
          <p className="text-accent-cyan pl-4">{'"yaml.schemas": {'}</p>
          <p className="text-accent-cyan pl-8">
            {'"https://opengpl.org/schema/v0.1/schema.json": "*.gpl"'}
          </p>
          <p className="text-accent-cyan pl-4">{'}'}</p>
          <p className="text-accent-cyan">{'}'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://opengpl.org/schema/v0.1/schema.json"
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
        </div>
      </section>
```

**Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/Home.test.jsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: add Schema Quick-Start section"
```

---

### Task 10: Run full test suite and verify dev server

**Step 1: Run all tests**

```bash
npx vitest run
```

Expected: All tests PASS. Note count — should be 20+ tests total.

**Step 2: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Dark space background loads
- Navbar is sticky with correct links
- Hero shows version badge, headline, code block, two CTAs
- Why OpenGPL shows 3 cards
- Control Planes shows 4 cards
- Compliance shows 5 badge pills
- Schema section shows code block + 2 CTAs
- Footer shows copyright + links

**Step 3: Build to verify no build errors**

```bash
npm run build
```

Expected: `dist/` folder created, no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: verify full test suite and build"
```

---

### Task 11: Add `docs/plans/` to `.gitignore` (optional) or CNAME

**Step 1: Create `CNAME` file**

```
opengpl.org
```

**Step 2: Commit**

```bash
git add CNAME
git commit -m "chore: add CNAME for opengpl.org"
```
