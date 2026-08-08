export default function CardGrid({ children }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 w-full">
            {children}
        </div>
    )
}
