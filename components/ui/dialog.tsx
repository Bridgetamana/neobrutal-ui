"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Dialog = BaseDialog.Root

const DialogTrigger = BaseDialog.Trigger

const DialogPortal = BaseDialog.Portal

const DialogClose = BaseDialog.Close

type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>

const DialogOverlay = React.forwardRef<
    React.ComponentRef<typeof BaseDialog.Backdrop>,
    DialogOverlayProps
>(({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black opacity-80 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = "DialogOverlay"

type DialogContentProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>

const DialogContent = React.forwardRef<
    React.ComponentRef<typeof BaseDialog.Popup>,
    DialogContentProps
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <BaseDialog.Popup
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-black bg-white p-6 shadow-brutal duration-200 transition-opacity motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                className
            )}
            {...props}
        >
            {children}
            <BaseDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </BaseDialog.Close>
        </BaseDialog.Popup>
    </DialogPortal>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

type DialogTitleProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Title>

const DialogTitle = React.forwardRef<
    React.ComponentRef<typeof BaseDialog.Title>,
    DialogTitleProps
>(({ className, ...props }, ref) => (
    <BaseDialog.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Description>

const DialogDescription = React.forwardRef<
    React.ComponentRef<typeof BaseDialog.Description>,
    DialogDescriptionProps
>(({ className, ...props }, ref) => (
    <BaseDialog.Description
        ref={ref}
        className={cn("text-sm text-text", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

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
