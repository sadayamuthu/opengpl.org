import { Link } from 'react-router-dom'
import { Eyebrow } from './ui'

export function DocPage({ eyebrow, title, children, lede }) {
  return (
    <article className="max-w-page mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
        <Link to="/" className="hover:text-ink">OpenGPL</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{eyebrow}</span>
      </nav>
      <header className="py-10 max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-6xl tracking-tight leading-[1.05] mt-3">{title}</h1>
        <div className="mt-6 flex flex-col gap-4 text-lg text-ink-muted leading-relaxed">{lede}</div>
      </header>
      <div className="flex flex-col">{children}</div>
    </article>
  )
}

export function DocSection({ title, children, lede }) {
  return (
    <section className="py-10 border-t border-rule">
      <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>
      {lede && <p className="text-ink-muted mt-2 max-w-2xl leading-relaxed">{lede}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Code({ children }) {
  return <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">{children}</code>
}

export function LinkButton({ href, solid = false, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border text-sm font-medium transition-colors text-center ${solid ? 'bg-ink text-paper border-ink hover:bg-acc hover:border-acc' : 'border-ink text-ink hover:bg-ink hover:text-paper'}`}
    >
      {children}
    </a>
  )
}
