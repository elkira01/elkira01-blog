import { AppLayout } from "@/widgets/app-layout"
import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return <AppLayout>
    <Outlet />
  </AppLayout>
}
