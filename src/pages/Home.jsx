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

    </div>
  )
}
