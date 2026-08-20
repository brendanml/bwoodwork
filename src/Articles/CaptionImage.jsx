export default function CaptionImage({
    src,
    caption,
    className = "max-h-100",
}) {
    return (
        <figure className={`space-y-2`}>
            <img
                src={src}
                alt={caption || "No alt provided."}
                className={`w-full shadow-sm ${className}`}
            />
            {caption && (
                <figcaption className="text-xs text-center text-muted-foreground italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
