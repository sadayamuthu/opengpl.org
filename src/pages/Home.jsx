import { Link } from 'react-router-dom'
import Citation from '../components/Citation'
import { CodeBlock, Eyebrow, Pill } from '../components/ui'

const POLICY = `policy "restrict-pii-output" {
  agent:    *
  action:   generate
  resource: user_data
  effect:   deny
  when:     output.contains_pii == true
}`

const WHY = [
  { title: "Existing tools weren't built for this", body: 'OPA/Rego and AWS Cedar were designed for deterministic systems. Generative AI outputs are probabilistic, not binary.' },
  { title: 'LLM-native primitives', body: 'Trust levels, hallucination thresholds, and tool access are first-class concepts in every OpenGPL policy.' },
  { title: 'Compliance evidence at runtime', body: 'OpenGPL auto-generates OSCAL artifacts. Not just policy enforcement: provable compliance at rest and in motion.' },
]

const GATES = [
  { name: 'Input Gate', short: 'Input', desc: 'Detect and sanitize harmful prompts before they reach the model.' },
  { name: 'Model Gate', short: 'Model', desc: 'Govern LLM behavior, trust levels, and tool access.' },
  { name: 'Output Gate', short: 'Output', desc: 'Block sensitive data exposure and enforce attribution.' },
]
const AUDIT = { name: 'Audit Gate', short: 'Audit', desc: 'Generate OSCAL compliance artifacts at runtime and at rest.' }

const BADGES = ['NIST AI RMF', 'FedRAMP', 'HIPAA', 'EU AI Act', 'SOC 2', 'ISO 42001']

const DOCS = [
  { to: '/spec', name: 'Spec', desc: 'The four control gates, policy syntax, and compliance framework mapping.' },
  { to: '/schema', name: 'Schema', desc: 'JSON Schema for .gpl files: IDE validation and autocomplete with no build step.' },
  { to: '/sdk', name: 'SDK', desc: 'pip install opengpl-sdk. Load, evaluate, and audit policies from Python and the CLI.' },
  { to: '/sidecar', name: 'Sidecar', desc: 'A Docker HTTP sidecar that enforces policies for services in any language.' },
]

function Gate({ gate }) {
  return (
    <div className="bg-card border border-rule rounded-sm p-4 flex-1">
      <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-acc">{gate.short}</p>
      <h3 className="font-medium mt-1">{gate.name}</h3>
      <p className="text-sm text-ink-muted mt-1 leading-relaxed">{gate.desc}</p>
    </div>
  )
}

const Arrow = () => <span aria-hidden="true" className="self-center text-ink-muted rotate-90 md:rotate-0">→</span>
const Endpoint = ({ children }) => (
  <span className="self-center font-mono text-xs px-2 py-1 rounded-sm border border-dashed border-ink/30 text-ink-muted">{children}</span>
)

function Section({ id, label, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="py-12 border-t border-rule scroll-mt-24">
      <Eyebrow id={`${id}-label`}>{label}</Eyebrow>
      {title && <h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-3 max-w-3xl">{title}</h2>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

const btn = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border text-sm font-medium transition-colors'

export default function Home() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 sm:py-20 items-start">
        <div>
          <Eyebrow>VI · Governance &amp; Compliance · v0.1 · Public Draft</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] tracking-tight mt-4">
            The policy language for <em className="text-acc">AI systems.</em>
          </h1>
          <p className="text-lg text-ink-muted mt-6 leading-relaxed max-w-xl">
            OpenGPL (Open Governance Policy Language) is an open, declarative standard for governing how
            AI agents behave: what they can access, what they can produce, and how they prove compliance at runtime.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/spec" className={`${btn} bg-ink text-paper border-ink hover:bg-acc hover:border-acc`}>Read the Spec</Link>
            <Link to="/schema" className={`${btn} border-ink text-ink hover:bg-ink hover:text-paper`}>Get the Schema ↗</Link>
          </div>
        </div>
        <div className="min-w-0">
          <CodeBlock title="# Example policy (policy.gpl)">{POLICY}</CodeBlock>
          <div className="flex gap-2 mt-3">
            <Pill accent>ALLOW</Pill>
            <Pill accent>DENY</Pill>
            <Pill accent>AUDIT</Pill>
          </div>
        </div>
      </section>

      <Section id="why" label="Why OpenGPL">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY.map((w, i) => (
            <div key={w.title}>
              <p className="font-mono text-xs text-acc">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl leading-snug mt-2">{w.title}</h3>
              <p className="text-ink-muted mt-2 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gates" label="Control gates" title="One policy file. Four control gates.">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <Endpoint>prompt</Endpoint>
          <Arrow />
          {GATES.map((g, i) => (
            <div key={g.name} className="contents">
              <Gate gate={g} />
              {i < GATES.length - 1 && <Arrow />}
            </div>
          ))}
          <Arrow />
          <Endpoint>response</Endpoint>
        </div>
        <div className="mt-2 border-t-2 border-dashed border-acc/40 pt-2">
          <Gate gate={AUDIT} />
        </div>
        <p className="text-xs text-ink-muted mt-2">The audit gate records every decision across the other three, at runtime and at rest.</p>
      </Section>

      <Section id="compliance" label="Compliance" title="Built for regulated environments.">
        <ul className="flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <li key={b} className="px-4 py-1.5 rounded-full border border-ink/25 text-xs tracking-widest uppercase">{b}</li>
          ))}
        </ul>
        <Link to="/spec" className="inline-block mt-4 text-sm hover:text-acc">How each framework maps →</Link>
      </Section>

      <Section id="docs" label="Documentation" title="Spec, schema, and two ways to enforce it.">
        <ul>
          {DOCS.map((d, i) => (
            <li key={d.to}>
              <Link to={d.to} className="group grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_8rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 border-b border-rule hover:border-acc transition-colors">
                <span aria-hidden="true" className="font-mono text-xs text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-2xl group-hover:text-acc transition-colors">{d.name}</span>
                <span className="col-start-2 sm:col-start-auto text-sm text-ink-muted">{d.desc}</span>
                <span aria-hidden="true" className="hidden sm:inline text-ink-muted group-hover:text-acc">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cite" label="Cite OpenGPL">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-rule rounded-sm p-5"><Citation /></div>
          <div className="border border-dashed border-ink/30 rounded-sm p-6 text-center flex flex-col justify-center gap-1">
            <Eyebrow>Status</Eyebrow>
            <p className="font-serif text-2xl">v0.1 public draft</p>
            <p className="text-sm text-ink-muted">Feedback on the spec is welcome on GitHub.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
