import { Link } from "react-router"

import { useEffect, useState } from "react"

import { getAllProjects } from "@/services/projectService"

export default function AdminDashboard() {
    const [projects, setProjects] = useState()

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getAllProjects()
            setProjects(data)
        }

        fetchProjects()
    }, [])

    return (
        <div className="flex flex-col">

            {projects.map}
            <Link to={`/projects/edit/123`}>Edit Project</Link>
            <Link to={`/projects/create`}>Add Project</Link>
        </div>
    )
}
