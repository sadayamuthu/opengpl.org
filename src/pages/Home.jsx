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
