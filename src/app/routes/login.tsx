import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAdminAuthenticated } from '@/features/auth'
import { AdminLoginPage } from '@/pages/admin-login'

type LoginSearch = {
  redirectTo?: string
}

function parseLoginSearch(search: Record<string, unknown>): LoginSearch {
  return {
    redirectTo: typeof search.redirectTo === 'string' ? search.redirectTo : undefined,
  }
}

export const Route = createFileRoute('/login')({
  validateSearch: parseLoginSearch,
  beforeLoad: () => {
    if (typeof window === 'undefined') {
      return
    }

    if (isAdminAuthenticated()) {
      throw redirect({
        to: '/admin/posts/new',
      })
    }
  },
  component: function AdminLoginRoute() {
    const { redirectTo } = Route.useSearch()

    return <AdminLoginPage redirectTo={redirectTo} />
  },
})
