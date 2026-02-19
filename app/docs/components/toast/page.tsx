import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"
import {
    ToastDemo,
    ToastTypesDemo,
    ToastActionDemo,
    ToastPromiseDemo,
} from "@/components/docs/demos/toast-demo"

const usageCode = `<Button
  variant="neutral"
  onClick={() =>
    toast.info("Event has been created", {
      title: "Success",
    })
  }
>
  Basic toast
</Button>`

const actionCode = `toast.success("File deleted", {
  title: "Deleted",
  actionProps: {
    children: "Undo",
    onClick: () => toast.info("File restored"),
  },
})`

const promiseCode = `toast.promise(saveDocument(), {
  loading: "Saving document...",
  success: (data) => ({
    title: "Saved",
    description: \`\${data.name} saved successfully\`,
  }),
  error: (err) =>
    err instanceof Error
      ? err.message
      : "Something went wrong",
})`

const positionCode = `import { Toaster } from "@/components/ui/toast"

// In your root layout
<Toaster position="top-right" />`

const toasterProps = [
    {
        name: "position",
        type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"',
        defaultValue: '"bottom-right"',
        description: "Screen position for the toast stack.",
    },
]

const toastMethodProps = [
    {
        name: "toast.success",
        type: "(message: string, options?: ToastOptions) => string",
        description: "Show a success toast. Returns the toast id.",
    },
    {
        name: "toast.error",
        type: "(message: string, options?: ToastOptions) => string",
        description: "Show an error toast. Returns the toast id.",
    },
    {
        name: "toast.info",
        type: "(message: string, options?: ToastOptions) => string",
        description: "Show an info toast. Returns the toast id.",
    },
    {
        name: "toast.warning",
        type: "(message: string, options?: ToastOptions) => string",
        description: "Show a warning toast. Returns the toast id.",
    },
    {
        name: "toast.promise",
        type: "(promise, options) => Promise<Value>",
        description: "Show a loading toast that transitions to success/error based on promise resolution.",
    },
    {
        name: "toast.dismiss",
        type: "(toastId: string) => void",
        description: "Dismiss a specific toast by id.",
    },
]

const toastOptionsProps = [
    {
        name: "title",
        type: "ReactNode",
        description: "Bold heading displayed at the top of the toast.",
    },
    {
        name: "description",
        type: "ReactNode",
        description: "Secondary text below the title (auto-set by the first argument of toast methods).",
    },
    {
        name: "timeout",
        type: "number",
        defaultValue: "5000",
        description: "Auto-dismiss delay in ms. Use 0 to disable.",
    },
    {
        name: "priority",
        type: '"low" | "high"',
        defaultValue: '"low"',
        description: "Aria announcement urgency (polite vs assertive).",
    },
    {
        name: "actionProps",
        type: "React.ComponentPropsWithoutRef<'button'>",
        description: "Props spread onto the action button (children, onClick, etc.).",
    },
    {
        name: "onClose",
        type: "() => void",
        description: "Callback fired when the toast begins closing.",
    },
    {
        name: "onRemove",
        type: "() => void",
        description: "Callback fired after the toast finishes its exit animation.",
    },
]

export default function ToastPage() {
    return (
        <div className="space-y-8 text-black">
            <header>
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Toast
                </h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A succinct message that is displayed temporarily. Supports
                    multiple types, action buttons, promise-based flows, and
                    configurable positioning.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <ToastDemo />
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <CodeBlock code="npx neobrutal add toast" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"`}
                />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-semibold">Types</h3>
                    <p className="text-sm text-black">
                        Four built-in types, each with its own color.
                    </p>
                    <ComponentPreview
                        code={`toast.success("Operation completed")
toast.error("Something went wrong")
toast.warning("Disk space is running low")
toast.info("A new version is available")`}
                    >
                        <ToastTypesDemo />
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Action button</h3>
                    <p className="text-sm text-black">
                        Pass <code className="font-mono text-xs bg-white px-1 py-0.5 border border-black rounded-base">actionProps</code> to
                        render a neobrutalist action button inside the toast.
                    </p>
                    <ComponentPreview code={actionCode}>
                        <ToastActionDemo />
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Promise</h3>
                    <p className="text-sm text-black">
                        Show a loading state that automatically transitions to
                        success or error when the promise settles.
                    </p>
                    <ComponentPreview code={promiseCode}>
                        <ToastPromiseDemo />
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Position</h3>
                    <p className="text-sm text-black">
                        Set the toast position by passing a{" "}
                        <code className="font-mono text-xs bg-white px-1 py-0.5 border border-black rounded-base">position</code>{" "}
                        prop to the Toaster component in your root layout.
                    </p>
                    <CodeBlock code={positionCode} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">API Reference</h2>

                <h3 className="font-semibold">Toaster</h3>
                <PropsTable data={toasterProps} />

                <h3 className="font-semibold mt-6">Toast methods</h3>
                <PropsTable data={toastMethodProps} />

                <h3 className="font-semibold mt-6">ToastOptions</h3>
                <PropsTable data={toastOptionsProps} />
            </div>
        </div>
    )
}
