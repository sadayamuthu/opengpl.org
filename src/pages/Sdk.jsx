import { CodeBlock } from '../components/ui'
import { Code, DocPage, DocSection, LinkButton } from '../components/DocPage'

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

const QUICKSTART = `from opengpl import PolicyEngine

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
    raise PolicyViolation(result.reasons)`

export default function Sdk() {
  return (
    <DocPage
      eyebrow="SDK · Python"
      title="OpenGPL Python SDK"
      lede={<p>
        The official Python SDK for loading, evaluating, and auditing OpenGPL policies programmatically.
        Embed policy enforcement directly in your AI application or CI pipeline.
      </p>}
    >
      <DocSection title="Installation">
        <div className="max-w-xl">
          <CodeBlock title="# requires Python 3.9+">pip install opengpl-sdk</CodeBlock>
        </div>
      </DocSection>

      <DocSection title="Quickstart">
        <div className="max-w-3xl"><CodeBlock>{QUICKSTART}</CodeBlock></div>
      </DocSection>

      <DocSection title="CLI reference" lede={<>The SDK ships with the <Code>opengpl</Code> CLI for local development and CI integration.</>}>
        <ul>
          {cliCommands.map((cmd) => (
            <li key={cmd.command} className="py-4 border-b border-rule">
              <code className="font-mono text-sm text-acc break-words">{cmd.command}</code>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed max-w-3xl">{cmd.desc}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <div className="py-10 border-t border-rule flex flex-wrap gap-3">
        <LinkButton href="https://pypi.org/project/opengpl-sdk" solid>View on PyPI ↗</LinkButton>
        <LinkButton href="https://github.com/sadayamuthu/opengpl">View on GitHub ↗</LinkButton>
      </div>
    </DocPage>
  )
}
