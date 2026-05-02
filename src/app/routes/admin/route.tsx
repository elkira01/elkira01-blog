import { AdminLayout } from "@/widgets/admin-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	// beforeLoad: ({location}) => {
	//   if(!isAdminAuthenticated()){
	//     throw redirect({
	//       to: routePaths.LOGIN,
	//       search: {
	//         redirectTo: location.href,
	//       },
	//     })
	//   }
	// },
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	);
}
