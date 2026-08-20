import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { getProduct } from "@/services/productService"
import { useCart } from "../state/cart/useCart"
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/ImageCarousel"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import WaitlistButton from "@/components/WaitlistButton"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ProductDetail() {
    const { id } = useParams()
    const { changeCartQuantity } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [selectedWood, setSelectedWood] = useState("")

    useEffect(() => {
        if (!id) return

        const fetchProductData = async () => {
            try {
                const productData = await getProduct(id)
                setProduct(productData)

                // Pre-select first wood option if present
                const validWoodOptions =
                    productData?.options?.filter((opt) => opt.wood) || []
                if (validWoodOptions.length > 0) {
                    setSelectedWood(validWoodOptions[0].wood)
                }
            } catch (error) {
                console.error("Failed to load product detail:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductData()
    }, [id])

    if (loading) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                LOADING...
            </div>
        )
    }

    if (!product) {
        return (
            <div className="max-w-3xl mx-auto py-12 text-center space-y-4">
                <p className="text-muted-foreground">Product not found.</p>
                <Button variant="outline" asChild>
                    <Link to="/plans">Back to Plans & Products</Link>
                </Button>
            </div>
        )
    }

    const carouselImages = product.image_url
        ? [product.image_url]
        : product.image_urls?.map((img) => img.url) || []

    const woodOptions = product.options?.filter((opt) => opt.wood) || []

    const selectedOption =
        product.options?.find((opt) => opt.wood === selectedWood) ||
        product.options?.[0]

    const displayPriceCents = selectedOption
        ? selectedOption.price_usd
        : "Error with price."

    const formatWoodName = (woodString) => {
        if (!woodString) return ""
        return woodString
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
    }

    const handleAddToCart = () => {
        changeCartQuantity(product, quantity, {
            selectedWood: selectedWood || null,
            selectedPriceUsd: displayPriceCents,
        })
    }

    return (
        <div className="grid grid-cols-12 w-full gap-8 mx-auto">
            <div className="col-span-12">
                <Link
                    to="/"
                    className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="mr-1 h-3 w-3" /> Back
                </Link>
            </div>

            {/* Left: Image Carousel */}
            <div className="col-span-12 md:col-span-6 min-w-0">
                <ImageCarousel imageUrls={carouselImages} />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-y-6 text-left">
                <div className="space-y-2">
                    <h1 className="text-3xl font-heading capitalize font-bold">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-semibold text-primary">
                        ${(displayPriceCents / 100).toFixed(2)} USD
                    </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                </p>

                <div className="border-t pt-6 space-y-4">
                    {product.type === "physical" && woodOptions.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground block">
                                Wood Species
                            </label>
                            <Select
                                value={selectedWood}
                                onValueChange={setSelectedWood}
                            >
                                <SelectTrigger className="w-full text-sm capitalize">
                                    <SelectValue placeholder="Select wood species" />
                                </SelectTrigger>
                                <SelectContent>
                                    {woodOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.wood}
                                            value={opt.wood}
                                            className="capitalize"
                                        >
                                            {formatWoodName(opt.wood)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-2 sm:mb-0 mb-4">
                        <div className="w-24">
                            <label className="text-xs font-medium text-muted-foreground block mb-1">
                                Quantity
                            </label>
                            <Input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Number(e.target.value) || 1,
                                        ),
                                    )
                                }
                            />
                        </div>
                        <div className="flex-1 self-end">
                            {product.status == "available" && (
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full"
                                >
                                    Add to Cart
                                </Button>
                            )}
                            {product.status == "waitlist" && (
                                <WaitlistButton productId={product._id} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {product.requirements.length > 0 && (
                <div className="col-span-12 sm:col-span-6">
                    <h1 className="text-xl underline mb-2">Requirements</h1>
                    <ul>
                        {product.requirements.map((req) => (
                            <div className="flex items-center">
                                <li className="ml-2">- {req}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {product.recommendations.length > 0 && (
                <div className="col-span-12 sm:col-span-6">
                    <h1 className="text-xl underline mb-2">Recommendations</h1>
                    <ul>
                        {product.recommendations.map((req) => (
                            <div className="flex items-center">
                                <li className="ml-2">- {req}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
