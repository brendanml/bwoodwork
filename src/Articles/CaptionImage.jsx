export default function CaptionImage({ src, caption }) {
    return (
        <figure className="space-y-2">
            <img
                src={src}
                alt={caption || "No alt provided."}
                className="w-full shadow-sm object-cover max-h-125"
            />
            {caption && (
                <figcaption className="text-xs text-center text-muted-foreground italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
