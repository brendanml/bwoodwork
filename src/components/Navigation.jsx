import { NavLink } from "react-router"
import { CartSheet } from "./CartSheet"

export default function Navigation() {
    const linkStyle = ({ isActive }) =>
        `${isActive ? "text-foreground underline" : "text-muted-foreground/80"}`

    return (
        <div className="flex justify-between mb-4 text-sm">
            <ul className="flex gap-4">
                <li>
                    <NavLink to="/projects" end className={linkStyle}>
                        projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/videos" className={linkStyle}>
                        videos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/store" className={linkStyle}>
                        store
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={linkStyle}>
                        about
                    </NavLink>
                </li>
            </ul>
            <div className="flex">{/* <Input type="text" /> */}</div>
            <CartSheet />
        </div>
    )
}
