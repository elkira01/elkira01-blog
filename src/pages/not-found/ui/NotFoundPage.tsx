import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
	return (
		<main className="engineer-workspace min-h-screen px-4 py-16">
			<section className="mx-auto w-full max-w-3xl border border-[var(--engineer-border)] bg-[var(--engineer-paper-strong)] p-8 sm:p-12">
				<p className="mb-3 text-[10px] font-bold tracking-widest uppercase text-[var(--engineer-accent)]">
					Error 404
				</p>
				<h1 className="engineer-font-serif mb-4 text-4xl font-medium text-[var(--engineer-ink)] sm:text-5xl">
					Page not found.
				</h1>
				<p className="mb-8 max-w-2xl text-base leading-8 text-[var(--engineer-muted)]">
					The path you requested does not exist or may have been moved.
				</p>

				<div className="flex flex-wrap items-center gap-3">
					<Link
						to="/"
						className="engineer-action-button is-primary rounded px-4 py-2 text-[10px]"
					>
						Back to home
					</Link>
					<Link
						to="/admin/posts/new"
						className="rounded border border-[var(--engineer-border)] px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-[var(--engineer-ink)] no-underline transition-colors hover:border-[var(--engineer-border-strong)]"
					>
						Open editor
					</Link>
				</div>
			</section>
		</main>
	);
}
