import { Link } from "react-router"

export default function ProductCardContents({ product }) {
    // Extract thumbnail URL
    const thumbnailUrl = product.image_url

    // Find lowest price from options (in cents)
    const options = product.options || []
    const prices = options.map((opt) => opt.price_usd).filter((p) => p != null)
    const minPriceCents = prices.length > 0 ? Math.min(...prices) : 0
    const formattedPrice = `$${(minPriceCents / 100).toFixed(2)}`

    return (
        <div className="text-left space-y-3">
            <Link to={`/products/${product._id}`} className="block space-y-2">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={product.name || "Product thumbnail"}
                        className="w-full aspect-square object-cover rounded-xs border bg-muted/20"
                    />
                ) : (
                    <div className="w-full aspect-square rounded-xs border bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
                        No image
                    </div>
                )}

                <div className="grid grid-cols-8 w-full gap-2">
                    <h2 className="col-span-5 text-left text-sm font-semibold truncate">
                        {product.name}
                    </h2>
                    <p className="col-span-3 text-right text-xs font-semibold">
                        {formattedPrice}
                    </p>
                    <p className="col-span-8 text-xs text-muted-foreground/80 line-clamp-2">
                        {product.description}
                    </p>
                </div>
            </Link>
        </div>
    )
}
