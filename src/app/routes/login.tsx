import { createFileRoute } from '@tanstack/react-router'
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
  },
  component: function AdminLoginRoute() {
    const { redirectTo } = Route.useSearch()

    return <AdminLoginPage redirectTo={redirectTo} />
  },
})
