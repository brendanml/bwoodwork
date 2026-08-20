import { NavLink, Outlet } from "react-router"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export default function ContentLayout() {
    return (
        <div className="flex flex-col min-h-dvh max-w-7xl mx-auto sm:p-4 px-4 justify-center">
            <header className="pt-6">
                <NavLink to="/projects" end>
                    <h1 className="justify-start text-left text-xl tracking-tighter mb-2">
                        bwoodwork
                    </h1>
                </NavLink>
                <Navigation />
            </header>

            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
