import { Link2 } from "lucide-react"
import Youtube from "@/assets/youtube.svg"
import Github from "@/assets/github.svg"

export default function IconLink({ url }) {
    const determineLinkIcon = () => {
        try {
            const parsedUrl = new URL(url || "")

            if (parsedUrl.hostname.includes("github")) {
                return <img src={Github} />
            }
            if (
                parsedUrl.hostname.includes("youtube") ||
                parsedUrl.hostname.includes("youtu.be")
            ) {
                return <img src={Youtube} />
            }
        } catch (error) {
            return error
        }

        return <Link2 className="w-6 h-6 text-neutral-500" />
    }

    if (!url) return null

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
        >
            {determineLinkIcon()}
        </a>
    )
}
