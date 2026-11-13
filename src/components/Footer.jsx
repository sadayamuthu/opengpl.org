export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-8 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          <span className="font-serif text-ink">Open<span className="text-acc">GPL</span></span> · An{' '}
          <a href="https://openastra.org" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">OpenAstra</a>{' '}
          framework · II. Security Controls
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a href="#schema" className="hover:text-ink">Schema</a>
          <a href="#ecosystem" className="hover:text-ink">Ecosystem</a>
          <a href="#cite" className="hover:text-ink">Cite</a>
          <a href="https://github.com/sadayamuthu/opengpl" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub ↗</a>
        </div>
        <p>© {new Date().getFullYear()} · Open standard · CC BY 4.0</p>
      </div>
    </footer>
  )
}
