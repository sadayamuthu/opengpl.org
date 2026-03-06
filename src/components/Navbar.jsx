import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" aria-label="OpenGPL home" className="flex items-center gap-2 text-text-primary font-semibold text-lg">
          <span className="text-accent-cyan" aria-hidden="true">📜</span>
          <span>OpenGPL</span>
        </Link>
        <div className="flex items-center gap-8">
          <NavLink to="/spec" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Spec
          </NavLink>
          <NavLink to="/schema" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Schema
          </NavLink>
          <NavLink to="/sdk" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            SDK
          </NavLink>
          <NavLink to="/sidecar" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Sidecar
          </NavLink>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
