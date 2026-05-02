import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAdminAuthenticated } from "@/features/auth";

export const Route = createFileRoute("/admin/")({
	beforeLoad: () => {
		if (typeof window === "undefined") {
			return;
		}

		if (isAdminAuthenticated()) {
			throw redirect({
				to: "/admin/posts/new",
			});
		}

		throw redirect({
			to: "/admin/login",
			search: {
				redirectTo: "/admin/posts/new",
			},
		});
	},
	component: () => null,
});
