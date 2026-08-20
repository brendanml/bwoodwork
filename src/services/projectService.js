const API_URL = import.meta.env.VITE_API_URL

export const getAllProjects = async () => {
    const response = await fetch(`${API_URL}/api/projects`)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()

    return result.data || []
}

export const getProject = async (projectId) => {
    const response = await fetch(`${API_URL}/api/projects/${projectId}`)

    if (!response.ok) {
        throw new Error("Failed to fetch project data from server")
    }

    const result = await response.json()

    return result.data || result
}

export const createProject = async (projectData) => {
    const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()

    return result.data
}

export const updateProject = async (id, projectData) => {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(errorData.message || "Failed to update project.")
    }

    return await response.json()
}

export const deleteProject = async (projectId) => {
    const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        throw new Error(
            errorData.message ||
                `Failed to delete project (HTTP ${response.status})`,
        )
    }

    return await response.json()
}
