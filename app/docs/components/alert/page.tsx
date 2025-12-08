"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { WarningIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "@phosphor-icons/react"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const alertCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-base border-2 border-border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-text",
    {
        variants: {
            variant: {
                default: "bg-bg text-text",
                destructive: "bg-red-400 text-black",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-bold leading-none tracking-tight", className)}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }`

export default function AlertPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Alert</h1>
                <p className="text-xl text-neutral-600">
                    A message container for important information. Perfect for notifications, warnings, and status messages.
                </p>
            </div>

            <ComponentPreview code={alertCode}>
                <div className="w-full max-w-md space-y-4">
                    <Alert>
                        <InfoIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Info</AlertTitle>
                        <AlertDescription>This is an informational alert message.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircleIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                    </Alert>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Variants</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Default</h3>
                        <Alert>
                            <CheckCircleIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Your action completed successfully.</AlertDescription>
                        </Alert>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Destructive</h3>
                        <Alert variant="destructive">
                            <WarningIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>This action cannot be undone.</AlertDescription>
                        </Alert>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Icon Usage</h2>
                <p className="text-neutral-600 mb-4">
                    Use Phosphor Icons for visual clarity. The component automatically positions the icon.
                </p>
                <div className="space-y-4">
                    <Alert>
                        <InfoIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Info Message</AlertTitle>
                        <AlertDescription>General information or tips</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircleIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Error Message</AlertTitle>
                        <AlertDescription>Something failed or went wrong</AlertDescription>
                    </Alert>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>ARIA role:</strong> Automatic role=&quot;alert&quot; for screen readers</li>
                    <li><strong>Title + Description:</strong> Semantic structure for clarity</li>
                    <li><strong>High contrast:</strong> Bold text and clear colors</li>
                    <li><strong>Icon support:</strong> Works with icon libraries</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/alert.tsx</code>:</p>
                <CodeBlock code={alertCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "@phosphor-icons/react"

export function AlertDemo() {
  return (
    <Alert>
      <InfoIcon className="h-5 w-5" weight="fill" />
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>Alert description goes here</AlertDescription>
    </Alert>
  )
}`} />
            </div>
        </div>
    )
}
