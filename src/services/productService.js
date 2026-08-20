const API_URL = import.meta.env.VITE_API_URL

export const getAllProducts = async (projectId = null) => {
    const url = projectId
        ? `${API_URL}/api/products?project_id=${encodeURIComponent(projectId)}`
        : `${API_URL}/api/products`

    const response = await fetch(url)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()

    return result.data || []
}

export const getProduct = async (productId) => {
    const response = await fetch(`${API_URL}/api/products/${productId}`)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()

    return result.data || result
}

export const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()

    return result.data
}

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || "Failed to update product.")
    }

    const result = await response.json()

    return result.data || result
}

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || "Failed to delete product.")
    }

    return await response.json()
}

export const createWaitlistReminder = async (productId, email) => {
    const response = await fetch(
        `${API_URL}/api/products/wishlist/${productId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        },
    )

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(
            errorData.message || "Failed to create wishlist reminder.",
        )
    }

    return await response.json()
}
