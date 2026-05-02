import { Link } from "@tanstack/react-router";
import ThemeToggle from "../../../shared/ui/ThemeToggle";

const navItems = [
	{ to: "/", label: "Essays" },
	{ to: "/about", label: "About" },
	{ to: "/admin/posts/new", label: "New Draft" },
] as const;

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--engineer-border)] bg-[var(--engineer-paper)] px-4 backdrop-blur-lg">
			<nav className="page-wrap flex flex-wrap items-center justify-between py-4">
				<h1 className="m-0 flex-shrink-0 text-xl font-bold tracking-widest uppercase font-serif text-[var(--engineer-ink)]">
					<Link to="/" className="text-inherit no-underline">
						The Engineer
					</Link>
				</h1>

				<div className="hidden sm:flex items-center gap-6 text-sm">
					{navItems.map((item) => (
						<Link
							key={item.label}
							to={item.to}
							activeOptions={{ exact: item.to === "/" }}
							className="nav-link !text-[var(--engineer-muted)] hover:!text-[var(--engineer-ink)]"
							activeProps={{
								className:
									"nav-link is-active !text-[var(--engineer-ink)] border-b border-[var(--engineer-ink)]",
							}}
						>
							{item.label}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-4">
					<ThemeToggle />
					<button className="text-(--engineer-ink) p-2">
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
					</button>
				</div>
			</nav>
		</header>
	);
}
