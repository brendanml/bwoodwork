import { useState, useEffect } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { getOptimizedUrl } from "~/utils/image" // Adjust path to where your helper is located

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
                    {imageUrls.map((rawUrl, index) => {
                        const optUrl = getOptimizedUrl(rawUrl, 800)
                        const srcSet = `${getOptimizedUrl(rawUrl, 400)} 400w, ${getOptimizedUrl(rawUrl, 800)} 800w, ${getOptimizedUrl(rawUrl, 1200)} 1200w`

                        return (
                            <CarouselItem key={rawUrl}>
                                <img
                                    className="w-full aspect-square object-cover rounded-xs bg-muted"
                                    src={optUrl}
                                    srcSet={srcSet}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    alt="Project preview"
                                    loading={index === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                    onError={(e) => {
                                        e.currentTarget.srcset = ""
                                        e.currentTarget.src = rawUrl
                                    }}
                                />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>

            {imageUrls.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                    {imageUrls.map((rawUrl, index) => {
                        // Request tiny 300px versions for thumbnails (~5-10KB per image)
                        const thumbUrl = getOptimizedUrl(rawUrl, 300)

                        return (
                            <button
                                key={rawUrl}
                                type="button"
                                onClick={() => api?.scrollTo(index)}
                                className={`relative shrink-0 w-12 aspect-square rounded-xs overflow-hidden border bg-muted transition-all outline-none ${
                                    current === index
                                        ? "border-neutral-900 ring-2 ring-neutral-900/10 scale-95"
                                        : "border-transparent opacity-50 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={thumbUrl}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover bg-muted"
                                    onError={(e) => {
                                        e.currentTarget.src = rawUrl
                                    }}
                                />
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}