import type { ReactNode } from 'react'
import Header from "./Header"

type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {

  return (
    <div className="engineer-workspace min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  )
}
