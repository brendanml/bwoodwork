export default function Paragraph({ children }) {
    return (
        <p className="text-foreground/90 leading-loose whitespace-pre-line w-full">
            {children}
        </p>
    )
}
