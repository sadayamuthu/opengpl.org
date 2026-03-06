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

const policyFields = [
  { field: 'agent', desc: 'Agent identifier or wildcard (*). Scopes the policy to specific AI agents.' },
  { field: 'action', desc: 'The operation being governed: generate, invoke_tool, retrieve, embed.' },
  { field: 'resource', desc: 'The target resource or data class the action is applied to.' },
  { field: 'effect', desc: 'allow or deny. Determines the outcome when the policy matches.' },
  { field: 'when', desc: 'Optional boolean condition. Supports dot-notation on agent, input, output context.' },
]

export default function Spec() {
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
      </section>

      {/* Four Control Gates */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-text-primary">One policy file. Four control gates.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gates.map((gate) => (
            <div key={gate.name} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{gate.icon}</span>
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
          {policyFields.map((f) => (
            <div key={f.field} className="bg-surface border border-subtle rounded-xl p-4 flex flex-col gap-1">
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
          {complianceFrameworks.map((fw) => (
            <div key={fw.name} className="bg-surface border border-subtle rounded-xl p-5 flex flex-col sm:flex-row gap-4">
              <span className="px-3 py-1 rounded-full border border-subtle text-text-muted text-xs tracking-widest shrink-0 self-start">
                {fw.name}
              </span>
              <p className="text-text-muted text-sm leading-relaxed">{fw.coverage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex gap-4 flex-wrap">
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
        >
          View on GitHub ↗
        </a>
      </section>

    </div>
  )
}
