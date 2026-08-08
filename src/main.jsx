import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "./app/router.jsx"
import "./index.css"
import "./app.css"
import { CartProvider } from "./state/cart/CartContextProvider.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    </StrictMode>,
)
