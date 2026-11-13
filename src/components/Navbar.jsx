import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/spec', label: 'Spec' },
  { to: '/schema', label: 'Schema' },
  { to: '/sdk', label: 'SDK' },
  { to: '/sidecar', label: 'Sidecar' },
]

const linkClass = ({ isActive }) =>
  `text-sm pb-0.5 border-b transition-colors ${isActive ? 'text-ink border-acc' : 'text-ink-muted border-transparent hover:text-ink'}`

export default function Navbar() {
  return (
    <header className="bg-paper/95 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-page mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b-2 border-ink">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <Link to="/" aria-label="OpenGPL home" className="font-serif text-xl tracking-tight">
            Open<span className="text-acc">GPL</span>
          </Link>
          <a href="https://openastra.org" target="_blank" rel="noopener noreferrer" className="text-xs text-ink-muted hover:text-ink">
            An OpenAstra framework ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>
          ))}
          <Link to={{ pathname: '/', hash: '#cite' }} className="text-sm text-ink-muted hover:text-ink">Cite</Link>
          <a href="https://github.com/sadayamuthu/opengpl" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-muted hover:text-ink">
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
