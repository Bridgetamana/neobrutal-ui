"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const dialogCode = `"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-border bg-bw p-6 shadow-brutal duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-base",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose }`

export default function DialogPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Dialog</h1>
                <p className="text-xl text-neutral-600">
                    A centered modal dialog component for important interactions. Built on Radix UI with accessibility.
                </p>
            </div>

            <ComponentPreview code={dialogCode}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                            <DialogDescription>This is a dialog component with title and description.</DialogDescription>
                        </DialogHeader>
                        <p className="text-sm">Your content goes here. Dialogs support any React content.</p>
                    </DialogContent>
                </Dialog>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Centered positioning:</strong> Dialog appears centered on screen</li>
                    <li><strong>Backdrop overlay:</strong> Dark overlay behind dialog with opacity</li>
                    <li><strong>Close button:</strong> X button in top-right corner</li>
                    <li><strong>Focus trap:</strong> Keyboard focus stays within dialog</li>
                    <li><strong>ESC to close:</strong> Users can press Escape to dismiss</li>
                    <li><strong>Full accessibility:</strong> Built on Radix UI Dialog primitive</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Components</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Dialog:</strong> Root component that manages state</li>
                    <li><strong>DialogTrigger:</strong> Button or element that opens the dialog</li>
                    <li><strong>DialogContent:</strong> Container for dialog content (includes overlay)</li>
                    <li><strong>DialogHeader:</strong> Top section for title and description</li>
                    <li><strong>DialogTitle:</strong> Main heading</li>
                    <li><strong>DialogDescription:</strong> Supporting text</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Focus trap:</strong> Focus cannot escape the dialog</li>
                    <li><strong>Keyboard support:</strong> ESC key closes, Tab cycles through elements</li>
                    <li><strong>ARIA attributes:</strong> Proper role and aria-labelledby setup</li>
                    <li><strong>Close button:</strong> Visual and accessible way to dismiss</li>
                    <li><strong>Screen readers:</strong> Announces dialog role and title</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Install Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-dialog @phosphor-icons/react" language="bash" />
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/dialog.tsx</code>:</p>
                <CodeBlock code={dialogCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to proceed?</p>
      </DialogContent>
    </Dialog>
  )
}`} />
            </div>
        </div>
    )
}
