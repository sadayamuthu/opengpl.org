const SCHEMA_URL = 'https://opengpl.org/schema/v0.1/schema.json'

const fields = [
  { field: 'policy', type: 'string', desc: 'Unique name for the policy block. Used in audit logs and OSCAL artifacts.' },
  { field: 'agent', type: 'string | *', desc: 'Agent identifier or wildcard. Scopes which agents this policy applies to.' },
  { field: 'action', type: 'enum', desc: 'The governed operation: generate, invoke_tool, retrieve, embed, or *.' },
  { field: 'resource', type: 'string', desc: 'Target resource or data class. Supports namespacing (e.g. pii:ssn, finance:*).' },
  { field: 'effect', type: 'allow | deny', desc: 'Policy outcome when matched. deny takes precedence when multiple policies conflict.' },
  { field: 'when', type: 'expression', desc: 'Optional condition expression. Dot-notation over agent, input, output context objects.' },
]

export default function Schema() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">OpenGPL JSON Schema</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          This schema validates <code className="text-accent-cyan">.gpl</code> policy files
          and enables IDE autocompletion, inline documentation, and syntax checking — without any build step.
        </p>
        <p className="text-text-muted text-base leading-relaxed">
          Versioned alongside the specification and compatible with any JSON Schema-aware editor.
          The schema URL is shown in the IDE integration section below.
        </p>
      </section>

      {/* IDE Integration */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">IDE integration</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Add to VS Code <code className="text-accent-cyan">.vscode/settings.json</code> for instant validation
          and autocomplete on all <code className="text-accent-cyan">.gpl</code> files:
        </p>
        <div className="max-w-2xl bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted"># .vscode/settings.json</p>
          <p className="text-accent-cyan mt-2">{'{'}</p>
          <p className="text-accent-cyan pl-4">{'"yaml.schemas": {'}</p>
          <p className="text-accent-cyan pl-8">
            <span>{'"'}</span>
            <span>{SCHEMA_URL}</span>
            <span>{'": "*.gpl"'}</span>
          </p>
          <p className="text-accent-cyan pl-4">{'}'}</p>
          <p className="text-accent-cyan">{'}'}</p>
        </div>
        <p className="text-text-muted text-xs">
          Requires the{' '}
          <a
            href="https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            YAML extension by Red Hat
          </a>{' '}
          for VS Code.
        </p>
      </section>

      {/* Schema Structure */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Schema structure</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Each policy block in a <code className="text-accent-cyan">.gpl</code> file maps to the following schema fields:
        </p>
        <div className="flex flex-col gap-3">
          {fields.map((f) => (
            <div key={f.field} className="bg-surface border border-subtle rounded-xl p-5 grid grid-cols-1 sm:grid-cols-[140px_100px_1fr] gap-3 items-start">
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
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          Download Schema
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
