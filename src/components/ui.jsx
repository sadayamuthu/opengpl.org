export function Eyebrow({ children, className = '', ...props }) {
  return (
    <p className={`text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted ${className}`} {...props}>
      {children}
    </p>
  )
}

export function Pill({ children, accent = false, className = '' }) {
  const tone = accent ? 'border-acc text-acc' : 'border-ink/25 text-ink'
  return <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs ${tone} ${className}`}>{children}</span>
}

const buttonTone = {
  solid: 'bg-ink text-paper border-ink hover:bg-acc hover:border-acc',
  outline: 'border-ink text-ink hover:bg-ink hover:text-paper',
}

export function Button({ href, variant = 'outline', external = true, children, className = '' }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border text-sm font-medium transition-colors ${buttonTone[variant]} ${className}`}
    >
      {children}
      {external && <span aria-hidden="true">↗</span>}
    </a>
  )
}

export function CodeBlock({ title, children }) {
  return (
    <div className="bg-ink text-[#EDE7DA] rounded-sm p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
      {title && <p className="text-[#EDE7DA]/50 mb-1">{title}</p>}
      <pre className="whitespace-pre">{children}</pre>
    </div>
  )
}

export function Section({ id, label, title, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={`py-12 border-t border-rule ${className}`}>
      <Eyebrow id={`${id}-label`}>{label}</Eyebrow>
      {title && <h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-3 mb-8 max-w-3xl">{title}</h2>}
      {children}
    </section>
  )
}
