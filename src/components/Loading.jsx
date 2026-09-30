import { useState, useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`flex flex-col items-center mx-auto text-center w-80 transition-opacity duration-500 ease-in-out ${
                show ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="flex items-center gap-2">
                <h2>Loading</h2>
                <Spinner />
            </div>
            <span className="text-muted-foreground text-sm">
                this is taking longer than usual...
            </span>
        </div>
    )
}
