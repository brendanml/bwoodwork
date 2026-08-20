import { Plus } from "lucide-react"
import Card from "../components/Card"
import CardGrid from "../components/CardGrid"
import ProjectCardContents from "../components/ProjectCardContents"
import { getAllProjects } from "@/services/projectService"
import { useEffect, useState } from "react"

import Loading from "../components/Loading"

import { Link } from "react-router"
export default function ProjectPage() {
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

    return (
        <div className="mt-4">
            <CardGrid>
                {projects.map((p) => (
                    <Card key={p._id}>
                        <ProjectCardContents project={p} />
                    </Card>
                ))}
            </CardGrid>
            {import.meta.env.VITE_ENVIRONMENT == "dev" && (
                <Link
                    to="/projects/create"
                    className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                    aria-label="Create new project"
                >
                    <Plus className="h-6 w-6" />
                </Link>
            )}
        </div>
    )
}
