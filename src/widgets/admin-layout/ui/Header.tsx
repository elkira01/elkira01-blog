import { Link } from '@tanstack/react-router'
import {getAdminSession, signOutAdmin} from "@/features/auth";

// const navItems = [
//     { to: '/', label: 'Essays' },
//     { to: '/about', label: 'About' },
//     { to: '/admin/posts/new', label: 'New Draft' },
// ] as const

export default function Header() {
    const session = getAdminSession()

    function handleSignOut() {
        signOutAdmin()
        window.location.replace('/admin/login?redirectTo=/admin/posts/new')
    }

    return (
        <div>
            <header className="admin-shell-header">
                <div className="mx-auto flex w-full max-w-[1760px] items-center gap-3 px-4 py-3 sm:px-6">
                    <Link
                        to="/"
                        className="engineer-font-serif text-xl font-semibold tracking-tight text-[var(--engineer-ink)] no-underline"
                    >
                        THE ENGINEER
                    </Link>

                    <span className="engineer-panel-title hidden md:inline">/ ADMIN</span>

                    <div className="ml-auto flex items-center gap-2">
                        <Link
                            to="/admin/posts/new"
                            className="engineer-action-button rounded px-3 py-2 no-underline"
                        >
                            New Draft
                        </Link>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="engineer-action-button rounded px-3 py-2"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="admin-shell-meta px-4 py-2 text-xs sm:px-6">
                {session ? `Signed in as ${session.username}` : 'Admin session'}
            </div>
        </div>
    )
}
