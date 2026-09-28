import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function getOptimizedUrl(blobUrl, width = 800, quality = 75) {
    if (!blobUrl) return ""

    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
    ) {
        return blobUrl
    }

    return `/_vercel/image?url=${encodeURIComponent(blobUrl)}&w=${width}&q=${quality}`
}
