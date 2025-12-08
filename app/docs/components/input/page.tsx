"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const inputCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-base border-2 border-border bg-bw px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }`

export default function InputPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Input</h1>
                <p className="text-xl text-neutral-600">
                    A text input field with bold borders and accessible focus states. Perfect for forms.
                </p>
            </div>

            <ComponentPreview code={inputCode}>
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <Label htmlFor="input-demo">Email</Label>
                        <Input id="input-demo" type="email" placeholder="Enter your email" />
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Input Types</h2>
                <p className="text-neutral-600 mb-4">
                    The Input component supports all standard HTML input types.
                </p>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="text-input">Text</Label>
                        <Input id="text-input" type="text" placeholder="Enter text" />
                    </div>
                    <div>
                        <Label htmlFor="email-input">Email</Label>
                        <Input id="email-input" type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <Label htmlFor="password-input">Password</Label>
                        <Input id="password-input" type="password" placeholder="Enter password" />
                    </div>
                    <div>
                        <Label htmlFor="number-input">Number</Label>
                        <Input id="number-input" type="number" placeholder="Enter number" />
                    </div>
                    <div>
                        <Label htmlFor="date-input">Date</Label>
                        <Input id="date-input" type="date" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">States</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="normal-input">Normal</Label>
                        <Input id="normal-input" placeholder="Type something..." />
                    </div>
                    <div>
                        <Label htmlFor="disabled-input">Disabled</Label>
                        <Input id="disabled-input" placeholder="Disabled input" disabled />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Focus states:</strong> Thick 2px ring with high contrast</li>
                    <li><strong>Labels:</strong> Always pair with &lt;Label&gt; component or aria-label</li>
                    <li><strong>Placeholder:</strong> Placeholder alone is not accessible - use labels</li>
                    <li><strong>File input:</strong> Special styling for file upload inputs</li>
                    <li><strong>Disabled:</strong> Clear disabled state with reduced opacity</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/input.tsx</code>:</p>
                <CodeBlock code={inputCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="text" placeholder="Enter your name" />
    </div>
  )
}`} />
            </div>
        </div>
    )
}
