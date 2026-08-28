import { Plus, Minus, Trash2, Package } from "lucide-react"
import { useCart } from "../state/cart/useCart"
import { handleCheckout } from "@/services/paymentService"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import ShoppingCartImage from "@/assets/cart.svg"

export function CartSheet() {
    const { isCartOpen, openCart, closeCart, cart, changeCartQuantity } =
        useCart()

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce(
        (sum, item) => sum + item.selectedPriceUsd * item.quantity,
        0,
    )

    const formatWoodName = (woodId) =>
        woodId.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

    return (
        <Sheet
            open={isCartOpen}
            onOpenChange={(open) => (open ? openCart() : closeCart())}
        >
            <SheetTrigger asChild>
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <img src={ShoppingCartImage} className="w-6" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-in zoom-in-50">
                            {totalItems}
                        </span>
                    )}
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-full sm:max-w-md flex flex-col justify-between p-6"
            >
                <div className="flex flex-col flex-1 min-h-0">
                    <SheetHeader className="pb-4 border-b border-border">
                        <SheetTitle className="font-heading tracking-tight text-lg">
                            Cart
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-0">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-12">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Empty :(
                                </p>
                                <p className="text-xs text-muted-foreground/70">
                                    Add items to get started.
                                </p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={`${item._id}-${item.selectedWood}`}
                                    className="flex justify-between items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-14 w-14 rounded-md bg-muted shrink-0 overflow-hidden border flex items-center justify-center">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <Package className="h-6 w-6 text-muted-foreground/40" />
                                        )}
                                    </div>

                                    {/* Details & Controls */}
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-foreground leading-tight truncate">
                                            {item.name}
                                        </h4>

                                        {item.selectedWood && (
                                            <p className="text-[11px] text-muted-foreground capitalize bg-muted inline-block px-1.5 py-0.5 rounded">
                                                Wood:{" "}
                                                {formatWoodName(
                                                    item.selectedWood,
                                                )}
                                            </p>
                                        )}

                                        <p className="text-xs text-muted-foreground font-mono">
                                            $
                                            {(
                                                item.selectedPriceUsd / 100
                                            ).toFixed(2)}{" "}
                                            each
                                        </p>

                                        <div className="flex items-center gap-1.5 pt-1">
                                            <button
                                                onClick={() =>
                                                    changeCartQuantity(
                                                        item,
                                                        -1,
                                                        {
                                                            selectedWood:
                                                                item.selectedWood,
                                                            selectedPriceUsd:
                                                                item.selectedPriceUsd,
                                                        },
                                                    )
                                                }
                                                className="p-1 border border-input rounded hover:bg-accent text-muted-foreground transition-colors cursor-pointer"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-xs font-mono w-6 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    changeCartQuantity(
                                                        item,
                                                        1,
                                                        {
                                                            selectedWood:
                                                                item.selectedWood,
                                                            selectedPriceUsd:
                                                                item.selectedPriceUsd,
                                                        },
                                                    )
                                                }
                                                className="p-1 border border-input rounded hover:bg-accent text-muted-foreground transition-colors cursor-pointer"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    changeCartQuantity(
                                                        item,
                                                        -item.quantity,
                                                        {
                                                            selectedWood:
                                                                item.selectedWood,
                                                            selectedPriceUsd:
                                                                item.selectedPriceUsd,
                                                        },
                                                    )
                                                }
                                                className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors ml-2 cursor-pointer"
                                                title="Remove item"
                                                aria-label="Remove item from cart"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end justify-between h-full space-y-4">
                                        <span className="text-sm font-mono font-medium text-foreground">
                                            $
                                            {(
                                                (item.selectedPriceUsd *
                                                    item.quantity) /
                                                100
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {cart.length > 0 && (
                    <SheetFooter className="border-t border-border pt-4 mt-auto flex-col sm:flex-col w-full space-y-4">
                        <div className="space-y-1.5 w-full">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-medium">
                                    Subtotal
                                </span>
                                <span className="font-mono font-semibold text-base text-foreground">
                                    ${(subtotal / 100).toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 leading-normal">
                                Shipping, taxes, and discounts calculated
                                securely at checkout.
                            </p>
                        </div>
                        <button
                            onClick={() => handleCheckout(cart)}
                            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.98] transform cursor-pointer"
                        >
                            Checkout
                        </button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
