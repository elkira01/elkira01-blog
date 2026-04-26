import type { ReactNode } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

export function AppLayout({children}:{children:ReactNode}){

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}