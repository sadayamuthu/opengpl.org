import { CodeBlock } from '../components/ui'
import { DocPage, DocSection, LinkButton } from '../components/DocPage'

const gates = [
  {
    icon: '🛡️',
    name: 'Input Gate',
    desc: 'Intercepts all prompts before they reach the model. Detects prompt injection, jailbreak attempts, and PII in user input. Supports semantic filters, not just keyword matching, so policies apply to intent, not just surface text.',
  },
  {
    icon: '🤖',
    name: 'Model Gate',
    desc: 'Controls which models an agent can invoke, at what trust level, and with which tools. Hallucination thresholds, max token limits, and tool use permissions are first-class policy primitives, not config files.',
  },
  {
    icon: '📤',
    name: 'Output Gate',
    desc: 'Scans generated responses before delivery. Blocks PII exposure, enforces attribution requirements, and applies data classification labels. Policies can redact, replace, or deny based on output content.',
  },
  {
    icon: '📋',
    name: 'Audit Gate',
    desc: 'Auto-generates OSCAL compliant audit artifacts at runtime. Every policy decision is logged with agent identity, policy name, matched condition, and effect. Produces compliance evidence at rest and in motion.',
  },
]

const complianceFrameworks = [
  { name: 'NIST AI RMF', coverage: 'Maps to Govern, Map, Measure, and Manage functions. Input and output gates address Map/Measure; audit gate produces evidence for Govern.' },
  { name: 'FedRAMP', coverage: 'OSCAL artifact generation satisfies FedRAMP Moderate documentation requirements. Policy enforcement addresses AC, AU, and SI control families.' },
  { name: 'HIPAA', coverage: 'Output gate PII/PHI detection enforces minimum necessary standard. Audit gate provides required access logs for ePHI.' },
  { name: 'EU AI Act', coverage: 'Risk classification primitives align with Article 9 (risk management) and Article 12 (record-keeping) for high-risk AI systems.' },
  { name: 'SOC 2', coverage: 'Audit gate evidence satisfies CC7 (Monitoring) and CC9 (Risk Mitigation) trust service criteria.' },
]

const policyFields = [
  { field: 'agent', desc: 'Agent identifier or wildcard (*). Scopes the policy to specific AI agents.' },
  { field: 'action', desc: 'The operation being governed: generate, invoke_tool, retrieve, embed.' },
  { field: 'resource', desc: 'The target resource or data class the action is applied to.' },
  { field: 'effect', desc: 'allow or deny. Determines the outcome when the policy matches.' },
  { field: 'when', desc: 'Optional boolean condition. Supports dot-notation on agent, input, output context.' },
]

const SYNTAX = `# Deny PII in generated output
policy "restrict-pii-output" {
  agent:    *                        # applies to all agents
  action:   generate
  resource: user_data
  effect:   deny
  when:     output.contains_pii == true
}

# Restrict tool access by trust level
policy "tool-access-control" {
  agent:    customer-support-bot
  action:   invoke_tool
  resource: payment_api
  effect:   deny
  when:     agent.trust_level < 3
}`

export default function Spec() {
  return (
    <DocPage
      eyebrow="Specification · v0.1"
      title="The OpenGPL Specification"
      lede={<>
        <p>
          OpenGPL (Open Governance Policy Language) is an open, declarative policy language purpose-built for AI systems.
          It defines how AI agents behave, what resources they can access, what they can produce,
          and how they demonstrate compliance, in a single, auditable policy file.
        </p>
        <p className="text-base">
          Existing policy engines like OPA/Rego and AWS Cedar were designed for deterministic systems.
          Generative AI introduces probabilistic outputs, semantic reasoning requirements, and novel
          threat vectors (prompt injection, hallucination, and jailbreaks) that older frameworks
          were never built to handle. OpenGPL treats these as first-class primitives.
        </p>
      </>}
    >
      <DocSection title="One policy file. Four control gates.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gates.map((gate, i) => (
            <div key={gate.name} className="bg-card border border-rule rounded-sm p-5">
              <p className="font-mono text-xs text-acc">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl mt-1">{gate.name}</h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">{gate.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Policy syntax"
        lede="A policy is a named block that declares the agent scope, action, resource, effect, and an optional condition. Multiple policies in one file are evaluated in order; the first matching policy wins."
      >
        <CodeBlock>{SYNTAX}</CodeBlock>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6">
          {policyFields.map((f) => (
            <div key={f.field} className="py-3 border-b border-rule">
              <dt><code className="font-mono text-acc">{f.field}</code></dt>
              <dd className="text-sm text-ink-muted mt-1 leading-relaxed">{f.desc}</dd>
            </div>
          ))}
        </dl>
      </DocSection>

      <DocSection title="Compliance framework mapping">
        <ul>
          {complianceFrameworks.map((fw) => (
            <li key={fw.name} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-2 py-4 border-b border-rule">
              <span className="self-start px-3 py-1 rounded-full border border-ink/25 text-xs tracking-widest uppercase justify-self-start">{fw.name}</span>
              <p className="text-sm text-ink-muted leading-relaxed">{fw.coverage}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <div className="py-10 border-t border-rule flex flex-wrap gap-3">
        <LinkButton href="https://github.com/sadayamuthu/opengpl" solid>View on GitHub ↗</LinkButton>
      </div>
    </DocPage>
  )
}
