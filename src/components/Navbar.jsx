export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-text-primary font-semibold text-lg">
          <span className="text-accent-cyan">📜</span>
          <span>OpenGPL</span>
        </a>
        <div className="flex items-center gap-8">
          <a href="#spec" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Spec
          </a>
          <a href="#schema" className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
            Schema
          </a>
          <a
            href="https://github.com/sadayamuthu/opengpl"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
