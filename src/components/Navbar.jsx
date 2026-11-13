const LINKS = [
  { href: '#why', label: 'Why' },
  { href: '#planes', label: 'Planes' },
  { href: '#schema', label: 'Schema' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#cite', label: 'Cite' },
]

export default function Navbar() {
  return (
    <header className="bg-paper/95 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-page mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b-2 border-ink">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <a href="#top" aria-label="OpenGPL" className="font-serif text-xl tracking-tight">
            Open<span className="text-acc">GPL</span>
          </a>
          <a href="https://openastra.org" target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-ink">
            An OpenAstra framework ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-muted hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
          <a href="https://github.com/sadayamuthu/opengpl" target="_blank" rel="noreferrer" className="text-sm text-ink-muted hover:text-ink">
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
