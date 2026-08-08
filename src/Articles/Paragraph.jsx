export default function Paragraph({ children }) {
    return (
        <p className="text-muted-foreground leading-loose whitespace-pre-line w-full">
            {children}
        </p>
    )
}
