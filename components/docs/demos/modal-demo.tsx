"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export function ModalSuccessDemo() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button variant="neutral" onClick={() => setOpen(true)}>
                Success Modal
            </Button>
            <Modal
                variant="success"
                open={open}
                onOpenChange={setOpen}
                title="Payment done"
                description="Your account has been created successfully."
                confirmText="Confirm"
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export function ModalWarningDemo() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button variant="neutral" onClick={() => setOpen(true)}>
                Warning Modal
            </Button>
            <Modal
                variant="warning"
                open={open}
                onOpenChange={setOpen}
                title="Unsaved changes"
                description="Do you want to save or discard changes?"
                confirmText="Save changes"
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export function ModalDestructiveDemo() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button variant="neutral" onClick={() => setOpen(true)}>
                Destructive Modal
            </Button>
            <Modal
                variant="destructive"
                open={open}
                onOpenChange={setOpen}
                title="Deactivate account"
                description="Are you sure you want to deactivate your account?"
                confirmText="Delete"
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}
