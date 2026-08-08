import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { getProject } from "@/services/projectService"
import { getAllProducts } from "@/services/productService"
import { ArrowLeft, Pencil, ShoppingCart, NotepadText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import ImageCarousel from "../components/ImageCarousel"
import Loading from "@/components/Loading"
import Header from "@/Articles/Header"
import Paragraph from "@/Articles/Paragraph"
import CaptionImage from "@/Articles/CaptionImage"

export default function ProjectDetail() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectData, productsData] = await Promise.all([
                    getProject(id),
                    getAllProducts(id),
                ])
                setProject(projectData)
                setProducts(productsData || [])
            } catch (err) {
                console.error("Failed to load project details:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return <Loading />
    }

    if (!project) {
        return (
            <div className="max-w-3xl mx-auto py-12 text-center space-y-4">
                <p className="text-muted-foreground">Project not found.</p>
                <Link to="/" className="text-sm font-medium underline">
                    Back to home
                </Link>
            </div>
        )
    }

    const digitalProduct = products.find((p) => p.type === "digital")
    const physicalProduct = products.find((p) => p.type === "physical")

    return (
        <article className="w-full leading-relaxed">
            <header className="">
                <Link
                    to="/"
                    className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="mr-1 h-3 w-3" /> Back
                </Link>
            </header>
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-12 sm:col-span-5">
                    <ImageCarousel imageUrls={project.image_urls} />
                </div>
                <div className="col-span-12 sm:col-span-7 ml-6">
                    <h1 className="text-xl underline mb-4">{project.name}</h1>
                    <p className="text text-secondary whitespace-pre-wrap">
                        {project.description}
                    </p>
                </div>
            </div>

            {project.writeup && project.writeup.length > 0 && (
                <section className="space-y-10 pt-8 w-10/12 pb-10">
                    {project.writeup.map((sec, idx) => (
                        <div key={idx} className="space-y-4">
                            {sec.header && <Header>{sec.header}</Header>}

                            {sec.body && <Paragraph>{sec.body}</Paragraph>}

                            {sec.image && (
                                <CaptionImage
                                    src={sec.image}
                                    caption={sec.caption}
                                />
                            )}
                        </div>
                    ))}
                </section>
            )}
            <div className="fixed bottom-5 right-10 w-22 h-40 flex flex-col justify-center gap-2">
                {project.youtube_url && (
                    <Button
                        size="lg"
                        asChild
                        className="px-0 ml-4 p-2 border-black/5 shadow-xs w-full"
                    >
                        <a
                            href={project.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Video
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                    </Button>
                )}
                {digitalProduct && (
                    <Button
                        size="lg"
                        className="px-0 ml-4 p-2 border-black/5 shadow-xs w-full"
                        asChild
                    >
                        <Link to={`/products/${digitalProduct._id}`}>
                            Plans <NotepadText className="mr-1.5 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                )}
                {physicalProduct && (
                    <Button
                        size="lg"
                        className="px-0 ml-4 p-2 border-black/5 shadow-xs w-full"
                        asChild
                    >
                        <Link to={`/products/${physicalProduct?._id}`}>
                            Buy <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                )}
                <Button
                    size="lg"
                    className="px-0 ml-4 p-2 border-black/5 shadow-xs w-full"
                    asChild
                >
                    <Link to={`/projects/edit/${id}`}>
                        Edit <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    </Link>
                </Button>
            </div>
        </article>
    )
}
