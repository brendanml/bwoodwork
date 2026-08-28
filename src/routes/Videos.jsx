import CardGrid from "@/components/CardGrid"
import Loading from "@/components/Loading"
import YoutubeCard from "@/components/YoutubeCard"
import { getAllProjects } from "@/services/projectService"
import { useState, useEffect } from "react"

export default function Videos() {
    const [projects, setProjects] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getAllProjects()
            setIsLoading(false)
            setProjects(data)
        }

        fetchProjects()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    const videoProjects = projects.filter((p) => p.youtube_url)
    return (
        <CardGrid>
            {videoProjects.map((p) => (
                <YoutubeCard
                    key={p._id}
                    youtubeURL={p.youtube_url}
                    project={p}
                />
            ))}
        </CardGrid>
    )
}
