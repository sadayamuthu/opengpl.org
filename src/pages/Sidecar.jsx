import { CodeBlock } from '../components/ui'
import { Code, DocPage, DocSection, LinkButton } from '../components/DocPage'

const endpoints = [
  {
    method: 'GET',
    path: '/health',
    desc: 'Returns 200 OK with service status. Use for liveness and readiness probes in Kubernetes.',
    request: null,
    response: '{ "status": "ok" }',
  },
  {
    method: 'POST',
    path: '/check/input',
    desc: 'Validates a prompt against the named policy before it reaches the LLM. Returns pass/deny with matched policy and reasons.',
    request: '{\n  "policy": "restrict-pii-input",\n  "agent": "customer-support-bot",\n  "prompt": "What is the user SSN?"\n}',
    response: '{\n  "passed": false,\n  "effect": "deny",\n  "matched_policy": "restrict-pii-input",\n  "reasons": ["prompt.contains_pii == true"]\n}',
  },
  {
    method: 'POST',
    path: '/check/output',
    desc: 'Validates an LLM response before it is returned to the user. Same request shape as the input endpoint, but evaluates output context.',
    request: '{\n  "policy": "restrict-pii-output",\n  "agent": "customer-support-bot",\n  "output": "The user SSN is 123-45-6789."\n}',
    response: '{\n  "passed": false,\n  "effect": "deny",\n  "matched_policy": "restrict-pii-output",\n  "reasons": ["output.contains_pii == true"]\n}',
  },
]

const RUN = `docker run --rm -p 8080:8080 \\
  -v "$PWD/policies:/policies:ro" \\
  ghcr.io/sadayamuthu/opengpl/sidecar:latest`

export default function Sidecar() {
  return (
    <DocPage
      eyebrow="Sidecar · Docker"
      title="OpenGPL Docker Sidecar"
      lede={<p>
        A self-hosted Docker container that enforces OpenGPL policies as an HTTP sidecar.
        Drop it alongside any LLM service, with no SDK integration required.
        Any application that can make an HTTP request can enforce policies.
      </p>}
    >
      <DocSection title="Run the sidecar">
        <div className="max-w-3xl">
          <CodeBlock title="# Mount your policies directory and expose port 8080">{RUN}</CodeBlock>
        </div>
        <div className="mt-4 max-w-3xl border border-dashed border-ink/30 rounded-sm p-4">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted">Local development</p>
          <p className="text-sm text-ink-muted mt-1">Build from source at the repo root:</p>
          <code className="block mt-2 font-mono text-sm text-acc break-words">docker build -f sidecar/Dockerfile -t opengpl-sidecar .</code>
        </div>
      </DocSection>

      <DocSection title="Endpoints">
        <div className="flex flex-col">
          {endpoints.map((ep) => (
            <div key={ep.path} className="py-6 border-b border-rule last:border-0">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-sm text-xs font-mono font-semibold bg-acc text-paper">{ep.method}</span>
                <code className="font-mono text-base">{ep.path}</code>
              </div>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed max-w-3xl">{ep.desc}</p>
              {ep.request ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-2">Request</p>
                    <CodeBlock>{ep.request}</CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-2">Response</p>
                    <CodeBlock>{ep.response}</CodeBlock>
                  </div>
                </div>
              ) : (
                <div className="mt-4 max-w-md"><CodeBlock>{ep.response}</CodeBlock></div>
              )}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Policy caching">
        <p className="text-ink-muted leading-relaxed max-w-3xl">
          The sidecar caches loaded policies for the lifetime of the process.
          If you update your mounted <Code>.gpl</Code> files, restart the container to apply the new policies.
        </p>
        <div className="max-w-md mt-4"><CodeBlock>{'docker restart <container-id>'}</CodeBlock></div>
      </DocSection>

      <div className="py-10 border-t border-rule flex flex-wrap gap-3">
        <LinkButton href="https://github.com/sadayamuthu/opengpl/tree/main/sidecar" solid>View Sidecar on GitHub ↗</LinkButton>
        <LinkButton href="https://github.com/sadayamuthu/opengpl">View Full Repo ↗</LinkButton>
        <LinkButton href="https://github.com/sadayamuthu/opengpl/pkgs/container/opengpl%2Fsidecar">Image on GHCR ↗</LinkButton>
      </div>
    </DocPage>
  )
}
