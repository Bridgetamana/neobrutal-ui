"use client"

import { Toaster, toast } from "sonner"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { Button } from "@/components/ui/button"

const toasterCode = `"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-bw group-[.toaster]:text-text group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-brutal group-[.toaster]:rounded-base group-[.toaster]:font-sans",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
`

const usageCode = `import { Toaster, toast } from "sonner"

export default function App() {
    return (
        <>
            <Toaster />
            <button onClick={() => toast("Hello, World!")}>
                Show Toast
            </button>
        </>
    )
}
`

export default function ToastPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Toast</h1>
                <p className="text-xl text-neutral-600">
                    Sonner is a headless toast component library. We&quot;ve styled it with the NeoBrutal aesthetic.
                </p>
            </div>

            <ComponentPreview code={usageCode}>
                <div className="flex gap-4 flex-wrap">
                    <Button onClick={() => toast("Action successful!")}>
                        Default
                    </Button>
                    <Button onClick={() => toast.success("Success!")}>
                        Success
                    </Button>
                    <Button onClick={() => toast.error("Something went wrong!")}>
                        Error
                    </Button>
                    <Button onClick={() => toast.loading("Loading...")}>
                        Loading
                    </Button>
                </div>
                <Toaster />
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Installation</h2>
                <p>First, install Sonner:</p>
                <CodeBlock code="npm install sonner" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Setup</h2>
                <p>Add the Toaster component to your root layout:</p>
                <CodeBlock code={toasterCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Usage</h2>
                <p>Import and use the toast function:</p>
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Toast Types</h2>
                <div className="grid gap-4">
                    <div>
                        <h3 className="font-bold mb-2">Default</h3>
                        <p className="text-sm text-neutral-600 mb-2">
                            Basic toast notification
                        </p>
                        <Button
                            size="sm"
                            onClick={() => toast("This is a default toast")}
                        >
                            Show
                        </Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Success</h3>
                        <p className="text-sm text-neutral-600 mb-2">
                            For successful operations
                        </p>
                        <Button
                            size="sm"
                            onClick={() => toast.success("Operation completed successfully!")}
                        >
                            Show
                        </Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Error</h3>
                        <p className="text-sm text-neutral-600 mb-2">
                            For error states
                        </p>
                        <Button
                            size="sm"
                            onClick={() => toast.error("Something went wrong")}
                        >
                            Show
                        </Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Loading</h3>
                        <p className="text-sm text-neutral-600 mb-2">
                            For loading states
                        </p>
                        <Button
                            size="sm"
                            onClick={() => toast.loading("Processing your request...")}
                        >
                            Show
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Customization</h2>
                <p>
                    Sonner toasts can be customized with options like duration, position, and custom components.
                    See the <a href="https://sonner.emilkowal.ski/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:no-underline">Sonner documentation</a> for advanced usage.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                    <li>Toasts are announced to screen readers</li>
                    <li>Keyboard accessible close button</li>
                    <li>Respects <code className="bg-neutral-200 px-2 py-1 rounded text-sm">prefers-reduced-motion</code></li>
                </ul>
            </div>
        </div>
    )
}
