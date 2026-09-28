import { getOptimizedUrl } from "@/lib/utils"
import { Link } from "react-router"

export default function ProjectCardContents({ project }) {
    const rawUrl = project.image_urls?.[0]

    const thumbnailUrl = rawUrl ? getOptimizedUrl(rawUrl, 600) : null
    const srcSet = rawUrl
        ? `${getOptimizedUrl(rawUrl, 300)} 300w, ${getOptimizedUrl(rawUrl, 600)} 600w, ${getOptimizedUrl(rawUrl, 900)} 900w`
        : undefined

    const dateObj = project.date ? new Date(project.date) : null
    const year = dateObj && !isNaN(dateObj) ? dateObj.getFullYear() : null

    return (
        <div className="text-left space-y-3">
            <Link to={`/projects/${project._id}`} className="block space-y-2">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        srcSet={srcSet}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt={project.name || "Project thumbnail"}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-square object-cover rounded-xs shadow bg-muted"
                    />
                ) : (
                    <div className="w-full aspect-square rounded-xs shadow bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        No image
                    </div>
                )}
                <div className="grid grid-cols-8 w-full gap-2">
                    <h2 className="col-span-5 text-left text-sm truncate">
                        {project.name}
                    </h2>
                    {year && (
                        <p className="col-span-3 text-right text-xs text-muted-foreground">
                            {year}
                        </p>
                    )}
                    <p className="col-span-8 text-xs text-muted-foreground/80 line-clamp-2">
                        {project.description}
                    </p>
                </div>
            </Link>
        </div>
    )
}
