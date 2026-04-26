import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

export function AppLayout({children}:{children:ReactNode}){
    const { pathname } = useLocation();

    const isAdminRoute = /^\/admin(?:\/|$)/.test(pathname);

    const isEditorRoute =
        /^\/posts\/new\/?$/.test(pathname) || /^\/posts\/[^/]+\/edit\/?$/.test(pathname);

    if (isEditorRoute || isAdminRoute) {
        return <main>{children}</main>
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}