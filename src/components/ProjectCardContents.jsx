import { Link } from "react-router"

export default function ProjectCardContents({ project }) {
    const thumbnailUrl = project.image_urls?.[0]

    const rawDate = project.date || project.createdAt
    const year = rawDate ? new Date(rawDate).getFullYear() : ""

    return (
        <div className="text-left space-y-3">
            <Link to={`/projects/${project._id}`} className="block space-y-2">
                <img
                    src={thumbnailUrl}
                    alt={project.name || "Project thumbnail"}
                    className="w-full aspect-square object-cover rounded-xs shadow"
                />
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
