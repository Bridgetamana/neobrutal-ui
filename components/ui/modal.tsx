"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Check, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const modalVariants = cva("", {
    variants: {
        variant: {
            success: "",
            warning: "",
            destructive: "",
        },
    },
    defaultVariants: {
        variant: "success",
    },
})


const confirmButtonVariants = cva(
    "inline-flex h-9 items-center justify-center rounded-base border-2 border-black px-4 text-sm font-bold transition-colors focus-brutal",
    {
        variants: {
            variant: {
                success: "bg-mint text-black hover:bg-mint/60",
                warning: "bg-lemon text-black hover:bg-lemon/60",
                destructive: "bg-hot-pink text-white hover:bg-hot-pink/60",
            },
        },
        defaultVariants: {
            variant: "success",
        },
    }
)

function getIcon(variant: "success" | "warning" | "destructive" | null | undefined) {
    switch (variant) {
        case "warning":
            return <AlertTriangle className="h-6 w-6 text-lemon" />
        case "destructive":
            return <XCircle className="h-6 w-6 text-hot-pink" />
        case "success":
        default:
            return <Check className="h-6 w-6 text-mint" />
    }
}

interface ModalProps extends VariantProps<typeof modalVariants> {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
    children?: React.ReactNode
}

function Modal({
    variant = "success",
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    children,
}: ModalProps) {
    function handleCancel() {
        onCancel?.()
        onOpenChange?.(false)
    }

    function handleConfirm() {
        onConfirm?.()
        onOpenChange?.(false)
    }

    return (
        <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
            {children && <BaseDialog.Trigger render={React.isValidElement(children) ? children : undefined}>
                {!React.isValidElement(children) && children}
            </BaseDialog.Trigger>}
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black opacity-80 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
                <BaseDialog.Popup className="fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-base border-2 border-black bg-white p-6 shadow-brutal transition-opacity data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                    <BaseDialog.Close
                        aria-label="Close modal"
                        className="absolute right-3 top-3 rounded-base opacity-70 transition-opacity hover:opacity-100 focus-brutal"
                    >
                        <X className="h-4 w-4" />
                    </BaseDialog.Close>

                    <div className="flex flex-col items-center text-center">
                        {/* Icon */}
                        {getIcon(variant)}

                        {/* Title */}
                        <BaseDialog.Title className="mt-4 text-lg font-bold text-black">
                            {title}
                        </BaseDialog.Title>

                        {/* Description */}
                        {description && (
                            <BaseDialog.Description className="mt-1 text-sm text-black/70">
                                {description}
                            </BaseDialog.Description>
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex w-full items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex h-9 items-center justify-center rounded-base border-2 border-black bg-white px-4 text-sm font-bold text-black transition-colors hover:bg-main/10 focus-brutal"
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className={cn(confirmButtonVariants({ variant }))}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    )
}
Modal.displayName = "Modal"

export { Modal, modalVariants }
export type { ModalProps }
