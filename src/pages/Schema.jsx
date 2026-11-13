import { CodeBlock } from '../components/ui'
import { Code, DocPage, DocSection, LinkButton } from '../components/DocPage'

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
    <DocPage
      eyebrow="Schema · v0.1"
      title="OpenGPL JSON Schema"
      lede={<>
        <p>
          This schema validates <Code>.gpl</Code> policy files and enables IDE autocompletion,
          inline documentation, and syntax checking, without any build step.
        </p>
        <p className="text-base">
          Versioned alongside the specification and compatible with any JSON Schema-aware editor.
          The schema URL is shown in the IDE integration section below.
        </p>
      </>}
    >
      <DocSection
        title="IDE integration"
        lede={<>Add to VS Code <Code>.vscode/settings.json</Code> for instant validation and autocomplete on all <Code>.gpl</Code> files:</>}
      >
        <div className="max-w-3xl">
          <CodeBlock title="# .vscode/settings.json">{`{
  "yaml.schemas": {
    "${SCHEMA_URL}": "*.gpl"
  }
}`}</CodeBlock>
        </div>
        <p className="text-xs text-ink-muted mt-3">
          Requires the{' '}
          <a href="https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-2">
            YAML extension by Red Hat
          </a>{' '}
          for VS Code.
        </p>
      </DocSection>

      <DocSection title="Schema structure" lede={<>Each policy block in a <Code>.gpl</Code> file maps to the following schema fields:</>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[32rem]">
            <thead>
              <tr className="border-b-2 border-ink text-left">
                <th className="pb-2 pr-6 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium">Field</th>
                <th className="pb-2 pr-6 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium">Type</th>
                <th className="pb-2 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.field} className="border-b border-rule align-top">
                  <td className="py-3 pr-6 font-mono text-acc">{f.field}</td>
                  <td className="py-3 pr-6 font-mono text-xs text-ink-muted whitespace-nowrap">{f.type}</td>
                  <td className="py-3 text-ink-muted leading-relaxed">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <div className="py-10 border-t border-rule flex flex-wrap gap-3">
        <LinkButton href={SCHEMA_URL} solid>Download Schema</LinkButton>
        <LinkButton href="https://github.com/sadayamuthu/opengpl">View on GitHub ↗</LinkButton>
      </div>
    </DocPage>
  )
}
