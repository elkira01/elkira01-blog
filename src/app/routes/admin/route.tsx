import { AdminLayout } from "@/widgets/admin-layout"
import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {isAdminAuthenticated} from "@/features/auth";
import {routePaths} from "@/shared/routes";

export const Route = createFileRoute('/admin')({
  beforeLoad: ({location}) => {
    if(!isAdminAuthenticated()){
      throw redirect({
        to: routePaths.LOGIN,
        search: {
          redirectTo: location.href,
        },
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
}
