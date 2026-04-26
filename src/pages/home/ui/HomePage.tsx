import { Link } from '@tanstack/react-router'

export default function HomePage() {
    return (
        <main className="page-wrap px-4 pb-8 pt-14 engineer-workspace">
            <section className="rise-in relative pb-10 sm:pb-14">
                <h1 className="display-title mb-4 max-w-4xl text-5xl leading-tight font-medium tracking-tight text-[var(--engineer-ink)] sm:text-7xl engineer-font-serif">
                    Clarity through constraints.
                </h1>
                <p className="max-w-2xl text-lg text-[var(--engineer-muted)]">
                    A rigorous examination of software architecture, minimal design principles,
                    and the philosophy of building enduring systems.
                </p>
                <div className="mt-12 h-px w-full bg-[var(--engineer-border)]"></div>
            </section>

            <section className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="border-l border-t border-[var(--engineer-border)] pt-4 pl-4 relative h-full flex flex-col">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--engineer-accent)]"></div>
                        <p className="text-xs font-bold tracking-widest uppercase text-[var(--engineer-accent)] mb-4">Featured Essay</p>
                        
                        <div className="aspect-[2/1] w-full bg-[#111] mb-6 overflow-hidden">
                            {/* Fake image placeholder */}
                            <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#222_2px,#222_4px)]"></div>
                        </div>

                        <h2 className="text-3xl font-medium engineer-font-serif text-[var(--engineer-ink)] mb-4">
                            The Architecture of Nothing
                        </h2>
                        
                        <p className="text-[var(--engineer-muted)] mb-8 flex-grow">
                            Why the absence of features often defines the most robust systems. Exploring the reductionist approach to scalable infrastructure and how to advocate for 'less' in a feature-obsessed culture.
                        </p>

                        <div className="flex items-center justify-between border-t border-[var(--engineer-border)] pt-4 text-sm font-medium">
                            <span className="text-[var(--engineer-muted)]">By A. H. Miller</span>
                            <Link to="/posts/1" className="text-[var(--engineer-ink)] no-underline hover:text-[var(--engineer-muted)] uppercase tracking-wider flex items-center gap-1">
                                READ <span className="text-[10px]">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="border border-[var(--engineer-border)] p-6 bg-[var(--engineer-paper-strong)]">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--engineer-accent)] mb-2">Technical</p>
                        <h3 className="text-xl font-medium engineer-font-serif text-[var(--engineer-ink)] mb-2">
                            State Machines in UI
                        </h3>
                        <p className="text-sm text-[var(--engineer-muted)] mb-6">
                            Predictable interfaces require strict state management.
                        </p>
                        <Link to="/posts/2" className="text-xs font-bold text-[var(--engineer-ink)] no-underline hover:text-[var(--engineer-muted)] uppercase tracking-wider">
                            READ
                        </Link>
                    </div>

                    <div className="border border-[var(--engineer-border)] p-6 bg-[var(--engineer-paper-strong)]">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--engineer-accent)] mb-2">Systems</p>
                        <h3 className="text-xl font-medium engineer-font-serif text-[var(--engineer-ink)] mb-2">
                            Decoupling Data
                        </h3>
                        <p className="text-sm text-[var(--engineer-muted)] mb-6">
                            When microservices become a distributed monolith.
                        </p>
                        <Link to="/posts/3" className="text-xs font-bold text-[var(--engineer-ink)] no-underline hover:text-[var(--engineer-muted)] uppercase tracking-wider">
                            READ
                        </Link>
                    </div>

                    <div className="border-l-4 border-[var(--engineer-accent)] p-6 bg-[color-mix(in_oklab,var(--engineer-paper-strong)_70%,transparent)]">
                        <p className="text-xs font-bold tracking-widest uppercase text-[var(--engineer-ink)] mb-3">From the Editor</p>
                        <p className="text-sm italic text-[var(--engineer-muted)] mb-4">
                            "We are transitioning from an era of abundance to an era of refinement. The code we write today must be leaner, more legible, and fundamentally constrained."
                        </p>
                        <p className="text-xs font-bold text-[var(--engineer-ink)]">Vol. IV — Issue 12</p>
                    </div>
                </div>
            </section>

            <section className="mt-24">
                <div className="flex items-end justify-between border-b border-[var(--engineer-border)] pb-4 mb-8">
                    <h2 className="text-3xl font-medium engineer-font-serif text-[var(--engineer-ink)]">
                        Recent Logs
                    </h2>
                    <Link to="/" className="text-xs font-bold text-[var(--engineer-ink)] no-underline hover:text-[var(--engineer-muted)] uppercase tracking-wider flex items-center gap-1">
                        VIEW ARCHIVE <span className="text-[10px]">&rarr;</span>
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { date: '04.12.24', title: 'Typographic Scales', desc: 'Implementing strict modular scales in CSS to ensure vertical rhythm across responsive breakpoints without relying on magic numbers.' },
                        { date: '04.05.24', title: 'The 1px Boundary', desc: 'Why shadows dilute structure. Embracing hairline borders to define container hierarchy in dense data applications.' },
                        { date: '03.28.24', title: 'Rust in Production', desc: 'Notes from migrating a core Python service to Rust. Memory safety as a feature, compilation times as a constraint.' }
                    ].map((post, i) => (
                        <div key={i} className="border border-[var(--engineer-border)] p-6 bg-[var(--engineer-paper-strong)] hover:border-[var(--engineer-border-strong)] transition-colors">
                            <p className="text-xs text-[var(--engineer-muted)] mb-2 font-mono">{post.date}</p>
                            <h3 className="text-xl font-medium engineer-font-serif text-[var(--engineer-ink)] mb-3">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[var(--engineer-muted)] leading-relaxed">
                                {post.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
