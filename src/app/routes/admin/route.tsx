import { AdminLayout } from "@/widgets/admin-layout"
import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
}
