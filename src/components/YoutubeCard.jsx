import YoutubeSVG from "../assets/youtube.svg"

export function YoutubeThumbnail({ youtubeURL }) {
    const regex = /(?:v=)([0-9A-Za-z_-]{11})/
    const match = youtubeURL.match(regex)

    const youtubeId = match ? match[1] : null

    if (!youtubeId) return null
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    return (
        <div className="relative w-full max-w-7xl aspect-video overflow-hidden rounded-xs bg-black text-orange-50 shadow-xs">
            <img
                src={thumbnailUrl}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
            />
            <img
                src={YoutubeSVG}
                className="absolute bottom-1 right-1 w-6 opacity-80"
            />
        </div>
    )
}

export default function YoutubeCard({ youtubeURL, project }) {
    const year = new Date(project.date).getFullYear()
    return (
        <a href={youtubeURL}>
            <YoutubeThumbnail youtubeURL={youtubeURL} />
            <div className="flex w-full sm:justify-between sm:flex-row flex-col">
                <h3 className="sm:text-sm">{project.name}</h3>
                <p className="sm:text-sm">{year}</p>
            </div>
        </a>
    )
}
