import Citation from '../components/Citation'
import { Button, CodeBlock, Eyebrow, Pill, Section } from '../components/ui'

const SCHEMA_URL = 'https://opengpl.org/schema/v0.1/schema.json'
const REPO = 'https://github.com/sadayamuthu/opengpl'

const POLICY = `policy "restrict-pii-output" {
  agent:    *
  action:   generate
  resource: user_data
  effect:   deny
  when:     output.contains_pii == true
}`

const WHY = [
  {
    title: "Existing tools weren't built for this",
    body: 'OPA/Rego and AWS Cedar were designed for deterministic systems. Generative AI outputs are probabilistic, not binary.',
  },
  {
    title: 'LLM-native primitives',
    body: 'Trust levels, hallucination thresholds, and tool access are first-class concepts in every OpenGPL policy.',
  },
  {
    title: 'Compliance evidence at runtime',
    body: 'OpenGPL auto-generates OSCAL artifacts. Not just policy enforcement: provable compliance at rest and in motion.',
  },
]

const PLANES = [
  { name: 'Input Controls', short: 'Input', desc: 'Detect and sanitize harmful prompts before they reach the model.' },
  { name: 'Model Controls', short: 'Model', desc: 'Govern LLM behavior, trust levels, and tool access.' },
  { name: 'Output Controls', short: 'Output', desc: 'Block sensitive data exposure and enforce attribution.' },
]
const AUDIT = { name: 'Audit Controls', short: 'Audit', desc: 'Generate OSCAL compliance artifacts at runtime and at rest.' }

const BADGES = ['NIST AI RMF', 'FedRAMP', 'HIPAA', 'EU AI Act', 'SOC 2', 'ISO 42001']

const ECOSYSTEM = [
  {
    name: 'SDK',
    desc: 'Python. Load and evaluate .gpl policies inside your application.',
    cmd: 'pip install opengpl-sdk',
    link: { label: 'opengpl-sdk on PyPI', href: 'https://pypi.org/project/opengpl-sdk/' },
  },
  {
    name: 'Sidecar',
    desc: 'A Docker policy decision point for any language, served on :8080.',
    cmd: 'docker run --rm -p 8080:8080 -v "$PWD/policies:/policies:ro" ghcr.io/sadayamuthu/opengpl/sidecar:latest',
    link: { label: 'Sidecar image on GHCR', href: 'https://github.com/sadayamuthu/opengpl/pkgs/container/opengpl%2Fsidecar' },
  },
  {
    name: 'Schema',
    desc: 'JSON Schema v0.1 for editor validation and CI linting of .gpl files.',
    cmd: 'curl -O https://opengpl.org/schema/v0.1/schema.json',
    link: { label: 'schema.json', href: SCHEMA_URL },
  },
]

function Plane({ plane }) {
  return (
    <div className="bg-card border border-rule rounded-sm p-4 flex-1">
      <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-acc">{plane.short}</p>
      <h3 className="font-medium mt-1">{plane.name}</h3>
      <p className="text-sm text-ink-muted mt-1 leading-relaxed">{plane.desc}</p>
    </div>
  )
}

const Arrow = () => <span aria-hidden="true" className="self-center text-ink-muted rotate-90 md:rotate-0">→</span>
const Endpoint = ({ children }) => (
  <span className="self-center font-mono text-xs px-2 py-1 rounded-sm border border-dashed border-ink/30 text-ink-muted">{children}</span>
)

export default function Home() {
  return (
    <div id="top" className="max-w-page mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section id="spec" className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 sm:py-20 items-start">
        <div>
          <Eyebrow>II · Security Controls · v0.1 · Public draft</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] tracking-tight mt-4">
            The policy language for <em className="text-acc">AI systems.</em>
          </h1>
          <p className="text-lg text-ink-muted mt-6 leading-relaxed max-w-xl">
            OpenGPL is an open, declarative standard for governing how AI agents behave: what they
            can access, what they can produce, and how they prove compliance at runtime.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href={REPO} variant="solid">Read the Spec</Button>
            <Button href={SCHEMA_URL}>Get the Schema</Button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {WHY.map((w, i) => (
            <div key={w.title}>
              <p className="font-mono text-xs text-acc">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl leading-snug mt-2">{w.title}</h3>
              <p className="text-ink-muted mt-2 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="planes" label="Control planes" title="One policy file. Four planes of control.">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <Endpoint>prompt</Endpoint>
          <Arrow />
          {PLANES.map((p, i) => (
            <div key={p.name} className="contents">
              <Plane plane={p} />
              {i < PLANES.length - 1 && <Arrow />}
            </div>
          ))}
          <Arrow />
          <Endpoint>response</Endpoint>
        </div>
        <div className="mt-2 border-t-2 border-dashed border-acc/40 pt-2">
          <Plane plane={AUDIT} />
        </div>
        <p className="text-xs text-ink-muted mt-2">Audit runs across every plane, at runtime and at rest.</p>
      </Section>

      <Section id="compliance" label="Compliance" title="Built for regulated environments.">
        <ul className="flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <li key={b} className="px-4 py-1.5 rounded-full border border-ink/25 text-xs tracking-widest uppercase">{b}</li>
          ))}
        </ul>
      </Section>

      <Section id="schema" label="Schema" title="Use it today.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="min-w-0">
            <CodeBlock title="# Add to VS Code (settings.json)">{`{
  "yaml.schemas": {
    "${SCHEMA_URL}": "*.gpl"
  }
}`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-ink-muted leading-relaxed">
              Point your editor at the published JSON Schema to get validation and autocomplete for
              every <span className="font-mono text-ink">.gpl</span> file.
            </p>
            <div><Button href={SCHEMA_URL} variant="solid">Download Schema</Button></div>
          </div>
        </div>
      </Section>

      <Section id="ecosystem" label="Ecosystem" title="Enforce it anywhere.">
        <ul>
          {ECOSYSTEM.map((e, i) => (
            <li key={e.name} className="grid grid-cols-1 md:grid-cols-[3rem_10rem_1fr] gap-x-4 gap-y-2 py-5 border-b border-rule">
              <span className="font-mono text-xs text-ink-muted pt-1">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-serif text-2xl">{e.name}</h3>
                <a href={e.link.href} target="_blank" rel="noreferrer" className="text-xs text-acc underline underline-offset-2 hover:text-ink">
                  {e.link.label} ↗
                </a>
              </div>
              <div className="min-w-0 flex flex-col gap-2">
                <p className="text-ink-muted">{e.desc}</p>
                <code className="block bg-ink text-[#EDE7DA] rounded-sm px-3 py-2 font-mono text-xs overflow-x-auto whitespace-pre">{e.cmd}</code>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cite" label="Cite OpenGPL">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-card border border-rule rounded-sm p-5">
            <Citation />
          </div>
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
