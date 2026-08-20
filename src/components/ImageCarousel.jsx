import { useState, useEffect } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export default function ImageCarousel({ imageUrls = [] }) {
    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap())
        }

        api.on("select", handleSelect)
    }, [api])

    if (!imageUrls.length) return null

    return (
        <div className="w-full min-w-0 space-y-2">
            <Carousel setApi={setApi} className="w-full min-w-0 relative group">
                <CarouselContent>
                    {imageUrls.map((url) => (
                        <CarouselItem key={url}>
                            <img
                                className="w-full aspect-square object-cover rounded-xs"
                                src={url}
                                alt="Project preview"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {imageUrls.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                    {imageUrls.map((url, index) => (
                        <button
                            key={url}
                            type="button"
                            onClick={() => api?.scrollTo(index)}
                            className={`relative shrink-0 w-12 aspect-square rounded-xs overflow-hidden border bg-muted transition-all outline-none ${
                                current === index
                                    ? "border-neutral-900 ring-2 ring-neutral-900/10 scale-95"
                                    : "border-transparent opacity-50 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
