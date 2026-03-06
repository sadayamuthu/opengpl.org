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

export default function Sidecar() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">

      {/* Header */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan">OpenGPL Docker Sidecar</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          A self-hosted Docker container that enforces OpenGPL policies as an HTTP sidecar.
          Drop it alongside any LLM service — no SDK integration required.
          Any application that can make an HTTP request can enforce policies.
        </p>
      </section>

      {/* Docker Run */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Run the sidecar</h2>
        <div className="bg-surface border border-subtle rounded-xl p-6 font-mono text-sm flex flex-col gap-1">
          <p className="text-text-muted"># Mount your policy file and expose port 8080</p>
          <p className="text-accent-cyan mt-2">docker run \</p>
          <p className="text-accent-cyan pl-4">-v $(pwd)/policy.gpl:/etc/opengpl/policy.gpl \</p>
          <p className="text-accent-cyan pl-4">-p 8080:8080 \</p>
          <p className="text-accent-cyan pl-4">ghcr.io/sadayamuthu/opengpl-sidecar:latest</p>
        </div>
        <div className="bg-surface border border-subtle rounded-xl p-5 flex flex-col gap-2">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">Local development</p>
          <p className="text-text-muted text-sm">Build from source at the repo root:</p>
          <code className="text-accent-cyan text-sm font-mono">docker build -f sidecar/Dockerfile -t opengpl-sidecar .</code>
        </div>
      </section>

      {/* Endpoints */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-text-primary">Endpoints</h2>
        <div className="flex flex-col gap-6">
          {endpoints.map((ep) => (
            <div key={ep.path} className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-accent-blue text-space">{ep.method}</span>
                <code className="text-accent-cyan text-sm font-mono">{ep.path}</code>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{ep.desc}</p>
              {ep.request && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Request</p>
                    <div className="bg-space border border-subtle rounded-lg p-4 font-mono text-xs text-accent-cyan whitespace-pre">{ep.request}</div>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Response</p>
                    <div className="bg-space border border-subtle rounded-lg p-4 font-mono text-xs text-accent-cyan whitespace-pre">{ep.response}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Policy Caching Note */}
      <section className="bg-surface border border-subtle rounded-xl p-6 flex flex-col gap-3">
        <p className="text-text-primary font-semibold text-sm">Policy caching</p>
        <p className="text-text-muted text-sm leading-relaxed">
          The sidecar caches loaded policies for the lifetime of the process.
          If you update your mounted <code className="text-accent-cyan">.gpl</code> file,
          restart the container to apply the new policies.
        </p>
        <code className="text-accent-cyan text-sm font-mono">docker restart &lt;container-id&gt;</code>
      </section>

      {/* CTAs */}
      <section className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://github.com/sadayamuthu/opengpl/tree/main/sidecar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity glow-blue text-center"
        >
          View Sidecar on GitHub ↗
        </a>
        <a
          href="https://github.com/sadayamuthu/opengpl"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-subtle text-text-primary text-sm hover:border-accent-cyan transition-colors duration-200 text-center"
        >
          View Full Repo ↗
        </a>
      </section>

    </div>
  )
}
