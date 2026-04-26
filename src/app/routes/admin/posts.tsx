import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { isAdminAuthenticated } from '@/features/auth'
import { AdminLayout } from '@/widgets/layout/AdminLayout'

export const Route = createFileRoute('/admin/posts')({
  beforeLoad: ({ location }) => {
    if (typeof window === 'undefined') {
      return
    }

    if (!isAdminAuthenticated()) {
      throw redirect({
        to: '/admin/login',
        search: {
          redirectTo: location.pathname,
        },
      })
    }
  },
  component: function AdminPostsLayoutRoute() {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    )
  },
})
