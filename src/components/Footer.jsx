export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} · OpenGPL is CC BY 4.0 · by{' '}
          <a
            href="https://openastra.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-cyan transition-colors duration-200"
          >
            OpenAstra
          </a>
        </p>
        <div className="flex items-center gap-6 text-sm">
          <a href="#spec" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Spec
          </a>
          <a href="#schema" className="text-text-muted hover:text-accent-cyan transition-colors duration-200">
            Schema
          </a>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-accent-cyan transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
