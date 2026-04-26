import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12 engineer-workspace">
      <section className="border border-[var(--engineer-border)] bg-[var(--engineer-paper-strong)] p-6 sm:p-8">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--engineer-accent)] mb-2">About</p>
        <h1 className="engineer-font-serif text-4xl font-medium text-[var(--engineer-ink)] sm:text-5xl mb-4">
          A rigorous examination.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--engineer-muted)]">
          The engineer minimalist template provides type-safe routing, server functions, and modern SSR defaults. Use this as a clean foundation, then layer in your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  )
}
