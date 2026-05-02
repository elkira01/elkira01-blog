import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { signInAdmin } from "@/features/auth";

type AdminLoginPageProps = {
	redirectTo?: string;
};

function resolveRedirectTarget(value: string | undefined) {
	if (!value) {
		return "/admin/posts/new";
	}

	return value.startsWith("/admin") ? value : "/admin/posts/new";
}

export function AdminLoginPage({ redirectTo }: AdminLoginPageProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const isSuccess = signInAdmin({ username, password });

		if (!isSuccess) {
			setErrorMessage("Invalid credentials. Please try again.");
			return;
		}

		setErrorMessage(null);

		window.location.replace(resolveRedirectTarget(redirectTo));
	}

	return (
		<div className="engineer-workspace flex min-h-screen items-center justify-center px-4 py-12">
			<section className="admin-auth-card w-full max-w-lg p-8 sm:p-10">
				<p className="engineer-panel-title mb-3">Protected Admin Area</p>

				<h1 className="engineer-font-serif mb-3 text-4xl leading-tight font-semibold text-[var(--engineer-ink)]">
					Admin Sign In
				</h1>

				<p className="mb-7 text-sm leading-6 text-[var(--engineer-muted)]">
					Use your admin credentials to access the drafting workspace.
				</p>

				<form onSubmit={handleSubmit} className="space-y-5">
					<label className="block">
						<span className="engineer-input-label">Username</span>
						<input
							type="text"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							autoComplete="username"
							className="engineer-input"
							required
						/>
					</label>

					<label className="block">
						<span className="engineer-input-label">Password</span>
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							autoComplete="current-password"
							className="engineer-input"
							required
						/>
					</label>

					{errorMessage ? (
						<p className="text-sm text-[var(--engineer-accent)]">
							{errorMessage}
						</p>
					) : null}

					<button
						type="submit"
						className="engineer-action-button is-primary w-full rounded px-4 py-3"
					>
						Continue to Admin
					</button>
				</form>

				<p className="mt-6 text-xs text-[var(--engineer-muted)]">
					Back to public site:{" "}
					<Link
						to="/"
						className="underline decoration-[var(--engineer-border-strong)] underline-offset-3"
					>
						home
					</Link>
				</p>
			</section>
		</div>
	);
}
