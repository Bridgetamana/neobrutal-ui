"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = BaseDialog.Root

const DialogTrigger = BaseDialog.Trigger

const DialogPortal = BaseDialog.Portal

const DialogClose = BaseDialog.Close

type DialogOverlayProps = React.ComponentProps<typeof BaseDialog.Backdrop>

const DialogOverlay = ({ className, ref, ...props }: DialogOverlayProps) => (
    <BaseDialog.Backdrop
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black opacity-80 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0",
            className
        )}
        {...props}
    />
)

type DialogContentProps = React.ComponentProps<typeof BaseDialog.Popup>

const DialogContent = ({ className, children, ref, ...props }: DialogContentProps) => (
    <DialogPortal>
        <DialogOverlay />
        <BaseDialog.Popup
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-black bg-white p-6 shadow-brutal duration-200 transition-opacity motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 rounded-base",
                className
            )}
            {...props}
        >
            {children}
            <BaseDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus-brutal disabled:pointer-events-none">
                <X strokeWidth={2.5} className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </BaseDialog.Close>
        </BaseDialog.Popup>
    </DialogPortal>
)

const DialogHeader = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)


const DialogFooter = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)


type DialogTitleProps = React.ComponentProps<typeof BaseDialog.Title>

const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
    <BaseDialog.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight text-black",
            className
        )}
        {...props}
    />
)

type DialogDescriptionProps = React.ComponentProps<typeof BaseDialog.Description>

const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
    <BaseDialog.Description
        ref={ref}
        className={cn("text-sm text-black", className)}
        {...props}
    />
)

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
