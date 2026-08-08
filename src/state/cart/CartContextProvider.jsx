import { useState, useEffect } from "react"
import { CartContext } from "./CartContext"

export function CartProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    const changeCartQuantity = (product, amount, options = {}) => {
        const { selectedWood = null, selectedPriceUsd } = options

        setCart((prevCart) => {
            const index = prevCart.findIndex(
                (item) =>
                    item._id === product._id &&
                    item.selectedWood === selectedWood,
            )

            if (index > -1) {
                const newQty = prevCart[index].quantity + amount

                if (newQty <= 0) {
                    return prevCart.filter((_, i) => i !== index)
                }

                const updated = [...prevCart]
                updated[index] = { ...updated[index], quantity: newQty }
                return updated
            }

            if (amount <= 0) return prevCart

            // Add new item
            const newItem = {
                ...product,
                selectedWood,
                selectedPriceUsd:
                    selectedPriceUsd ?? product.options?.[0]?.price_usd ?? 0,
                quantity: amount,
            }

            return [...prevCart, newItem]
        })

        if (amount > 0) openCart()
    }

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                openCart,
                closeCart,
                cart,
                changeCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
