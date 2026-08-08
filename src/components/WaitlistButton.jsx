import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"

import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createWaitlistReminder } from "@/services/productService"

export default function WaitlistButton({ productId }) {
    const [email, setEmail] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault()

        if (!email) return

        try {
            await createWaitlistReminder(productId, email)
            setIsOpen(false)
            setIsError(false)
            setEmail("")
        } catch (e) {
            console.error("Failed to join waitlist:", e)
            setIsError(true)
        }
    }
    console.log(productId)
    return (
        <div className="text-lg relative shadow-sm">
            <span className="text-xs text-muted-foreground absolute -top-4">
                This will be available soon!
            </span>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">Join Waitlist</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm rounded-xs h-50">
                    <form onSubmit={submitHandler}>
                        <DialogHeader>
                            <DialogTitle>Enter the Waitlist!</DialogTitle>
                            <DialogDescription>
                                Enter your email below and I will let you know
                                as soon as this is available.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="mt-2">
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="something@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mx-auto">
                            <div className="flex flex-col w-full mt-2">
                                <Button type="submit" className="w-full">
                                    Submit
                                </Button>
                                <span className="text-center">
                                    {isError ? "invalid email format" : ""}
                                </span>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
