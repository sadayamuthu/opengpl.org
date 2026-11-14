import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-8 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          © {new Date().getFullYear()} · OpenGPL is CC BY 4.0 · An{' '}
          <a href="https://openastra.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
            OpenAstra
          </a>{' '}
          framework · VI. Governance &amp; Compliance
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Link to="/spec" className="hover:text-ink">Spec</Link>
          <Link to="/schema" className="hover:text-ink">Schema</Link>
          <Link to="/sdk" className="hover:text-ink">SDK</Link>
          <Link to="/sidecar" className="hover:text-ink">Sidecar</Link>
          <a href="https://github.com/sadayamuthu/opengpl" target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub ↗</a>
        </div>
      </div>
    </footer>
  )
}
