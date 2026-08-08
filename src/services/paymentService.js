export const handleCheckout = async (cartItems) => {
    const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cartItems: cartItems,
        }),
    })

    const data = await response.json()

    if (data.url) {
        window.location.href = data.url
    } else {
        console.log(data?.status || "problem sending to server")
    }
}
