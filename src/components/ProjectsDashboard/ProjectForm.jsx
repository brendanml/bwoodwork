import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router"
import {
    Trash2,
    PackagePlus,
    Loader2,
    Plus,
    ArrowUp,
    ArrowDown,
    FileText,
} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
} from "@/services/projectService"
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/services/productService"

const PRODUCT_STATUS = [
    { label: "Unavailable", value: "unavailable" },
    { label: "Waitlist", value: "waitlist" },
    { label: "Available", value: "available" },
]
const PRODUCT_TYPE = [
    { label: "Digital", value: "digital" },
    { label: "physical", value: "physical" },
]

export default function ProjectForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Form Loading & Submitting state
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Project state
    const [projectId, setProjectId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [projectImages, setProjectImages] = useState([])

    // Modular Writeup state
    const [writeup, setWriteup] = useState([])

    // Dynamic Wood Options state (GET /api/woods)
    const [woodOptions, setWoodOptions] = useState([])
    const [isLoadingWoods, setIsLoadingWoods] = useState(true)

    // Products state & tracking deleted product IDs
    const [products, setProducts] = useState([])
    const [deletedProductIds, setDeletedProductIds] = useState([])

    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone.",
        )
        if (!confirmed) return

        setIsDeleting(true)
        try {
            await deleteProject(id)
            navigate("/")
        } catch (err) {
            console.error("Failed to delete project:", err)
            alert(err.message || "Failed to delete the project.")
        } finally {
            setIsDeleting(false)
        }
    }

    const formatWoodName = (woodId) =>
        woodId
            ? woodId
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""

    useEffect(() => {
        const fetchWoods = async () => {
            try {
                const res = await fetch("/api/woods")
                const data = await res.json()
                if (data.success && Array.isArray(data.data)) {
                    setWoodOptions(data.data)
                }
            } catch (err) {
                console.error("Failed to fetch wood species:", err)
            } finally {
                setIsLoadingWoods(false)
            }
        }

        fetchWoods()
    }, [])

    useEffect(() => {
        if (!id) return

        const fetchProjectAndProducts = async () => {
            try {
                const projectData = await getProject(id)
                if (projectData) {
                    setProjectId(projectData._id)
                    setName(projectData.name || "")
                    setDescription(projectData.description || "")
                    setYoutubeUrl(projectData.youtube_url || "")
                    setProjectImages(projectData.image_urls || [])
                    setWriteup(projectData.writeup || [])
                }

                // Fetch associated products for this project
                const productsData = await getAllProducts(id)
                setProducts(productsData || [])
            } catch (err) {
                console.error("Error loading project details:", err)
            }
        }

        fetchProjectAndProducts()
    }, [id])

    const addWriteupSection = () => {
        setWriteup((prev) => [
            ...prev,
            { header: "", body: "", image: "", caption: "" },
        ])
    }

    const removeWriteupSection = (index) => {
        setWriteup((prev) => prev.filter((_, i) => i !== index))
    }

    const updateWriteupField = (index, field, value) => {
        setWriteup((prev) =>
            prev.map((sec, i) =>
                i === index ? { ...sec, [field]: value } : sec,
            ),
        )
    }

    const moveWriteupSection = (index, direction) => {
        const targetIndex = direction === "up" ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= writeup.length) return

        setWriteup((prev) => {
            const nextWriteup = [...prev]
            const [movedItem] = nextWriteup.splice(index, 1)
            nextWriteup.splice(targetIndex, 0, movedItem)
            return nextWriteup
        })
    }

    const addProduct = () => {
        setProducts((prev) => [
            ...prev,
            {
                name: "",
                type: "digital",
                status: "unavailable",
                image_url: "",
                options: [{ wood: null, price_usd: 0 }],
                description: "",
                requirements: [],
                recommendations: [],
                shipping_usd: 0,
            },
        ])
    }

    const removeProduct = (pIndex) => {
        const targetProduct = products[pIndex]

        if (targetProduct._id) {
            setDeletedProductIds((prev) => [...prev, targetProduct._id])
        }

        setProducts((prev) => prev.filter((_, i) => i !== pIndex))
    }

    const updateProductField = (pIndex, field, value) => {
        setProducts((prev) =>
            prev.map((prod, i) => {
                if (i !== pIndex) return prod

                if (field === "type") {
                    const newType = value
                    const updatedOptions =
                        newType === "digital"
                            ? [
                                  {
                                      wood: null,
                                      price_usd:
                                          prod.options?.[0]?.price_usd || 0,
                                  },
                              ]
                            : []
                    return { ...prod, type: newType, options: updatedOptions }
                }

                return { ...prod, [field]: value }
            }),
        )
    }

    const toggleWoodForProduct = (pIndex, woodId) => {
        setProducts((prev) =>
            prev.map((prod, i) => {
                if (i !== pIndex) return prod
                const currentOptions = prod.options || []
                const exists = currentOptions.some((opt) => opt.wood === woodId)

                const updatedOptions = exists
                    ? currentOptions.filter((opt) => opt.wood !== woodId)
                    : [...currentOptions, { wood: woodId, price_usd: 0 }]

                return { ...prod, options: updatedOptions }
            }),
        )
    }
    const updateOptionPrice = (pIndex, woodId, priceVal) => {
        const newPrice =
            priceVal === "" ? "" : Math.max(0, parseInt(priceVal, 10) || 0) // allow for deleting 0

        setProducts((prev) =>
            prev.map((prod, i) => {
                if (i !== pIndex) return prod

                const currentOptions = prod.options || []

                if (prod.type === "digital") {
                    return {
                        ...prod,
                        options: [{ wood: null, price_usd: newPrice }],
                    }
                }

                const updatedOptions = currentOptions.map((opt) => {
                    if (opt.wood === woodId) {
                        return { ...opt, price_usd: newPrice }
                    }
                    return opt
                })

                return { ...prod, options: updatedOptions }
            }),
        )
    }

    const updateProductStringArray = (pIndex, field, index, value) => {
        setProducts((prev) =>
            prev.map((prod, i) => {
                if (i !== pIndex) return prod

                const updated = [...(prod[field] || [])]
                updated[index] = value

                return {
                    ...prod,
                    [field]: updated,
                }
            }),
        )
    }

    const addProductStringArrayItem = (pIndex, field) => {
        setProducts((prev) =>
            prev.map((prod, i) =>
                i === pIndex
                    ? {
                          ...prod,
                          [field]: [...(prod[field] || []), ""],
                      }
                    : prod,
            ),
        )
    }

    const removeProductStringArrayItem = (pIndex, field, index) => {
        setProducts((prev) =>
            prev.map((prod, i) =>
                i === pIndex
                    ? {
                          ...prod,
                          [field]: (prod[field] || []).filter(
                              (_, idx) => idx !== index,
                          ),
                      }
                    : prod,
            ),
        )
    }

    // --- Form Submit Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const activeProjectId = projectId || id

        const projectPayload = {
            _id: activeProjectId,
            name,
            description,
            youtube_url: youtubeUrl || null,
            image_urls: projectImages,
            writeup: writeup.map((sec) => ({
                header: sec.header || "",
                body: sec.body || "",
                image: sec.image || "",
                caption: sec.caption || "",
            })),
        }

        try {
            if (id) {
                await updateProject(id, projectPayload)
            } else {
                await createProject(projectPayload)
            }

            if (deletedProductIds.length > 0) {
                await Promise.all(
                    deletedProductIds.map((prodId) => deleteProduct(prodId)),
                )
            }

            const productPromises = products.map((prod) => {
                const productPayload = {
                    name: prod.name,
                    type: prod.type,
                    status: prod.status,
                    image_url: prod.image_url || "",
                    options: (prod.options || []).map((opt) => ({
                        wood: opt.wood || null,
                        price_usd: Number(opt.price_usd) || 0,
                    })),
                    description: prod.description || "",
                    requirements: prod.requirements || [],
                    recommendations: prod.recommendations || [],
                    shipping_usd: Number(prod.shipping_usd) || 0,
                    project_id: activeProjectId,
                }

                if (prod._id) {
                    return updateProduct(prod._id, productPayload)
                } else {
                    return createProduct(productPayload)
                }
            })

            await Promise.all(productPromises)

            navigate(`/projects/${activeProjectId}`)
        } catch (error) {
            console.error("Submission error:", error)
            alert(error.message || "An error occurred while saving.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-8 pb-12"
        >
            <FieldGroup className="space-y-4 border p-5 rounded-lg bg-background shadow-sm">
                <h2 className="text-xl font-bold">Project Overview</h2>

                <Field>
                    <FieldLabel htmlFor="_id">Project Slug ID</FieldLabel>
                    <Input
                        id="_id"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="some-project-name"
                        required
                        disabled={!!id}
                    />
                    <FieldDescription>
                        Navigation slug used as the MongoDB `_id`.
                    </FieldDescription>
                </Field>

                <Field>
                    <FieldLabel htmlFor="name">Project Name</FieldLabel>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Some Project Name"
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="description">
                        Short Overview
                    </FieldLabel>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief overview or meta summary..."
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="youtube_url">YouTube URL</FieldLabel>
                    <Input
                        id="youtube_url"
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                    />
                </Field>

                <Field>
                    <FieldLabel>Project Gallery Images</FieldLabel>
                    <div className="space-y-2">
                        {projectImages.map((imgUrl, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[auto_1fr_auto] gap-2 items-center"
                            >
                                {/* Thumbnail Preview */}
                                <div className="w-10 h-10 rounded border bg-muted flex items-center justify-center overflow-hidden">
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none"
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            🖼️
                                        </span>
                                    )}
                                </div>

                                {/* URL Input */}
                                <Input
                                    type="url"
                                    value={imgUrl}
                                    onChange={(e) => {
                                        const newImages = [...projectImages]
                                        newImages[index] = e.target.value
                                        setProjectImages(newImages)
                                    }}
                                    placeholder="https://img.com/table1.jpg"
                                />

                                {/* Action Buttons (Move Up, Move Down, Remove) */}
                                <div className="flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        disabled={index === 0}
                                        onClick={() => {
                                            const newImages = [...projectImages]
                                            const [movedItem] =
                                                newImages.splice(index, 1)
                                            newImages.splice(
                                                index - 1,
                                                0,
                                                movedItem,
                                            )
                                            setProjectImages(newImages)
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        disabled={
                                            index === projectImages.length - 1
                                        }
                                        onClick={() => {
                                            const newImages = [...projectImages]
                                            const [movedItem] =
                                                newImages.splice(index, 1)
                                            newImages.splice(
                                                index + 1,
                                                0,
                                                movedItem,
                                            )
                                            setProjectImages(newImages)
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const newImages =
                                                projectImages.filter(
                                                    (_, i) => i !== index,
                                                )
                                            setProjectImages(newImages)
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() =>
                                setProjectImages([...projectImages, ""])
                            }
                        >
                            + Add Image URL
                        </Button>
                    </div>
                </Field>
            </FieldGroup>

            <div className="space-y-4 border p-5 rounded-lg bg-background shadow-sm">
                <div className="flex items-center justify-between border-b pb-3">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Article Writeup
                        </h2>
                    </div>
                    <Button
                        type="button"
                        onClick={addWriteupSection}
                        variant="outline"
                        size="sm"
                    >
                        <Plus className="mr-1.5 h-4 w-4" /> Add Section
                    </Button>
                </div>

                {writeup.length === 0 ? (
                    <div className="text-center py-8 border border-dashed rounded-md bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                            No writeup sections added yet. Click "Add Section"
                            to begin drafting.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {writeup.map((sec, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 space-y-4 bg-muted/10 relative"
                            >
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        Section #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === 0}
                                            onClick={() =>
                                                moveWriteupSection(index, "up")
                                            }
                                            className="h-7 w-7 p-0"
                                        >
                                            <ArrowUp className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            disabled={
                                                index === writeup.length - 1
                                            }
                                            onClick={() =>
                                                moveWriteupSection(
                                                    index,
                                                    "down",
                                                )
                                            }
                                            className="h-7 w-7 p-0"
                                        >
                                            <ArrowDown className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:bg-destructive/10 h-7 text-xs ml-2"
                                            onClick={() =>
                                                removeWriteupSection(index)
                                            }
                                        >
                                            <Trash2 className="h-3.5 w-3.5 mr-1" />{" "}
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                                <Field>
                                    <FieldLabel>Section Header</FieldLabel>
                                    <Input
                                        value={sec.header}
                                        onChange={(e) =>
                                            updateWriteupField(
                                                index,
                                                "header",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Cutting Joinery & Leg Tapers"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Body Content</FieldLabel>
                                    <Textarea
                                        value={sec.body}
                                        onChange={(e) =>
                                            updateWriteupField(
                                                index,
                                                "body",
                                                e.target.value,
                                            )
                                        }
                                        rows={4}
                                        placeholder="Detailed explanation for this phase of the build..."
                                    />
                                </Field>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>
                                            Section Image URL
                                        </FieldLabel>
                                        <Input
                                            type="url"
                                            value={sec.image}
                                            onChange={(e) =>
                                                updateWriteupField(
                                                    index,
                                                    "image",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://example.com/section-step.jpg"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Image Caption</FieldLabel>
                                        <Input
                                            value={sec.caption}
                                            onChange={(e) =>
                                                updateWriteupField(
                                                    index,
                                                    "caption",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="e.g. Router jig alignment prior to mortising"
                                        />
                                    </Field>
                                </div>

                                {/* Preview image thumbnail if present */}
                                {sec.image && (
                                    <div className="flex items-center gap-3 p-2 border rounded bg-background">
                                        <img
                                            src={sec.image}
                                            alt={
                                                sec.caption ||
                                                "Section image preview"
                                            }
                                            className="h-16 w-24 object-cover rounded border shrink-0"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none"
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground italic truncate">
                                            {sec.caption ||
                                                "No caption provided."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Products</h2>
                    </div>
                    <Button
                        type="button"
                        onClick={addProduct}
                        variant="outline"
                        size="sm"
                    >
                        <PackagePlus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>

                {products.map((prod, pIndex) => {
                    const isDigital = prod.type === "digital"
                    const currentOptions = prod.options || []

                    return (
                        <div
                            key={prod._id || pIndex}
                            className="border-2 rounded-lg p-5 space-y-4 bg-muted/10 relative"
                        >
                            <div className="flex justify-between items-center border-b pb-3">
                                <span className="font-semibold text-lg">
                                    Product #{pIndex + 1}:{" "}
                                    {prod.name || "New Product"}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => removeProduct(pIndex)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    Product
                                </Button>
                            </div>

                            <Field>
                                <FieldLabel>Product Name</FieldLabel>
                                <Input
                                    value={prod.name}
                                    onChange={(e) =>
                                        updateProductField(
                                            pIndex,
                                            "name",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. Digital Build Plans"
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Select
                                    items={PRODUCT_TYPE}
                                    value={prod.type}
                                    onValueChange={(value) =>
                                        updateProductField(
                                            pIndex,
                                            "type",
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="digital" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {PRODUCT_TYPE.map((item) => (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Select
                                    items={PRODUCT_STATUS}
                                    value={prod.status}
                                    onValueChange={(value) =>
                                        updateProductField(
                                            pIndex,
                                            "status",
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="unavailable" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {PRODUCT_STATUS.map((item) => (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Product Image URL Input & Live Preview */}
                            <Field>
                                <FieldLabel>Product Image URL</FieldLabel>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1 space-y-1">
                                        <Input
                                            type="url"
                                            value={prod.image_url || ""}
                                            onChange={(e) =>
                                                updateProductField(
                                                    pIndex,
                                                    "image_url",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://example.com/product-thumb.jpg"
                                        />
                                    </div>
                                    {prod.image_url && (
                                        <div className="h-14 w-14 rounded-md border bg-background overflow-hidden shrink-0 flex items-center justify-center">
                                            <img
                                                src={prod.image_url}
                                                alt={prod.name || "Preview"}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none"
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Field>

                            {/* Digital Flat Price & Shipping Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {isDigital && (
                                    <Field>
                                        <FieldLabel>
                                            Price (Cents USD)
                                        </FieldLabel>
                                        <Input
                                            type="number"
                                            value={
                                                currentOptions[0]?.price_usd ??
                                                0
                                            }
                                            onChange={(e) =>
                                                updateOptionPrice(
                                                    pIndex,
                                                    null,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="1999 ($19.99)"
                                            required
                                        />
                                    </Field>
                                )}

                                <Field
                                    className={isDigital ? "" : "sm:col-span-2"}
                                >
                                    <FieldLabel>
                                        Shipping (Cents USD)
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        value={prod.shipping_usd || 0}
                                        onChange={(e) =>
                                            updateProductField(
                                                pIndex,
                                                "shipping_usd",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </Field>
                            </div>

                            {!isDigital && (
                                <Field>
                                    <FieldLabel>Wood Options</FieldLabel>

                                    {isLoadingWoods ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            <div className="flex flex-wrap gap-2">
                                                {woodOptions.map((wood) => (
                                                    <Button
                                                        key={wood._id}
                                                        type="button"
                                                        variant={
                                                            currentOptions.some(
                                                                (opt) =>
                                                                    opt.wood ===
                                                                    wood._id,
                                                            )
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            toggleWoodForProduct(
                                                                pIndex,
                                                                wood._id,
                                                            )
                                                        }
                                                    >
                                                        {formatWoodName(
                                                            wood._id,
                                                        )}
                                                    </Button>
                                                ))}
                                            </div>

                                            {currentOptions.map((opt) => (
                                                <div
                                                    key={opt.wood}
                                                    className="flex items-center gap-2 mt-2"
                                                >
                                                    <span className="w-32 text-sm">
                                                        {formatWoodName(
                                                            opt.wood,
                                                        )}
                                                    </span>

                                                    <Input
                                                        type="number"
                                                        value={opt.price_usd}
                                                        onChange={(e) =>
                                                            updateOptionPrice(
                                                                pIndex,
                                                                opt.wood,
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </Field>
                            )}

                            <Field>
                                <FieldLabel>Product Description</FieldLabel>
                                <Textarea
                                    value={prod.description || ""}
                                    onChange={(e) =>
                                        updateProductField(
                                            pIndex,
                                            "description",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Details regarding this product build or digital file..."
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center justify-between mb-2">
                                    <FieldLabel>Requirements</FieldLabel>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            addProductStringArrayItem(
                                                pIndex,
                                                "requirements",
                                            )
                                        }
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {(prod.requirements || []).map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <Input
                                                    value={item}
                                                    placeholder="Requirement..."
                                                    onChange={(e) =>
                                                        updateProductStringArray(
                                                            pIndex,
                                                            "requirements",
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                />

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeProductStringArrayItem(
                                                            pIndex,
                                                            "requirements",
                                                            index,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Field>
                            <Field>
                                <div className="flex items-center justify-between mb-2">
                                    <FieldLabel>Recommendations</FieldLabel>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            addProductStringArrayItem(
                                                pIndex,
                                                "recommendations",
                                            )
                                        }
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {(prod.recommendations || []).map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <Input
                                                    value={item}
                                                    placeholder="Recommendation..."
                                                    onChange={(e) =>
                                                        updateProductStringArray(
                                                            pIndex,
                                                            "recommendations",
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                />

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeProductStringArrayItem(
                                                            pIndex,
                                                            "recommendations",
                                                            index,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Field>
                        </div>
                    )
                })}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    asChild
                    disabled={isSubmitting}
                >
                    <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Saving...
                        </>
                    ) : (
                        "Save Project"
                    )}
                </Button>
                {id && (
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isSubmitting || isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Deleting...
                            </>
                        ) : (
                            "Delete Project"
                        )}
                    </Button>
                )}
            </div>
        </form>
    )
}
