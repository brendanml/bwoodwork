import { useEffect, useState } from "react"
import Card from "../components/Card"
import CardGrid from "../components/CardGrid"
import ProductCardContents from "../components/ProductCardContents"
import { getAllProducts } from "@/services/productService"
import Loading from "@/components/Loading"

export default function ProductPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts()
                setProducts(data)
            } catch (err) {
                console.error("Failed to fetch products:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <CardGrid>
            {products.map((p) => (
                <Card key={p._id}>
                    <ProductCardContents product={p} />
                </Card>
            ))}
        </CardGrid>
    )
}
