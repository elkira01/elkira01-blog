import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-(--engineer-border) px-4 py-8 text-(--engineer-muted)">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-xs tracking-widest uppercase">
        <p className="m-0">
          &copy; {year} THE INTELLECTUAL ENGINEER. BUILT FOR PRECISION.
        </p>
        <div className="flex gap-6 font-semibold">
          <Link to="/" className="text-inherit hover:text-[var(--engineer-ink)] transition-colors">COLOPHON</Link>
          <Link to="/" className="text-inherit hover:text-(--engineer-ink) transition-colors">RSS FEED</Link>
          <Link to="/" className="text-inherit hover:text-(--engineer-ink) transition-colors">CHANGELOG</Link>
          <Link to="/" className="text-inherit hover:text-(--engineer-ink) transition-colors">PRIVACY</Link>
        </div>
      </div>
    </footer>
  )
}
