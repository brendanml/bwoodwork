import { useState, useEffect } from "react"

export default function Loading() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (!show) return null

    return (
        <div className="flex flex-col mx-auto text-center">
            <h2>Loading</h2>
            <span className="text-muted-foreground text-sm">
                this is taking longer than usual...
            </span>
        </div>
    )
}
