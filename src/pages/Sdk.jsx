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
    desc: 'Assesses a policy file against a compliance framework and reports coverage gaps. Supported: FedRAMP-Moderate, NIST-AI-RMF, HIPAA, EU-AI-Act.',
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

      {/* Installation */}
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
        <pre className="bg-surface border border-subtle rounded-xl p-6 font-mono text-sm text-text-muted overflow-x-auto whitespace-pre-wrap">{`from opengpl import PolicyEngine

# Load a policy file
engine = PolicyEngine("policy.gpl")

# Check a user prompt against the policy
result = engine.check_input(
    agent="customer-support-bot",
    prompt="Can you share the user's SSN?"
)

# result.passed → False
# result.matched_policy → "restrict-pii-output"
# result.effect → "deny"

if not result.passed:
    raise PolicyViolation(result.reasons)`}</pre>
      </section>

      {/* CLI Reference */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">CLI reference</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          The SDK ships with the <code className="text-accent-cyan">opengpl</code> CLI for local development and CI integration.
        </p>
        <div className="flex flex-col gap-4">
          {cliCommands.map((cmd) => (
            <div key={cmd.command} className="bg-surface border border-subtle rounded-xl p-5 flex flex-col gap-3">
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
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          View on PyPI ↗
        </a>
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200 text-center"
        >
          View on GitHub ↗
        </a>
      </section>

    </div>
  )
}
