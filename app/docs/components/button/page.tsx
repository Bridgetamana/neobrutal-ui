"use client"

import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-border",
    {
        variants: {
            variant: {
                default: "bg-main text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                noShadow: "bg-main text-black border-2 border-border",
                neutral: "bg-bw text-text shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                primary: "bg-main text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                reverse: "bg-text text-bw shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-neutral-800",
                outline: "bg-bw text-text border-2 border-border hover:bg-neutral-100",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }`

export default function ButtonPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Button</h1>
                <p className="text-xl text-neutral-600">
                    A versatile button component with multiple variants and sizes. Core component for triggering actions.
                </p>
            </div>

            <ComponentPreview code={buttonCode}>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="neutral">Neutral</Button>
                    <Button variant="reverse">Reverse</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Variants</h2>
                <p className="text-neutral-600">
                    The button component supports 6 variants to suit different use cases and visual hierarchy.
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Default</h3>
                        <p className="text-sm text-neutral-600 mb-2">Primary action button with shadow effect and press animation.</p>
                        <Button variant="default">Default Button</Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Neutral</h3>
                        <p className="text-sm text-neutral-600 mb-2">Secondary action button with white background and shadow.</p>
                        <Button variant="neutral">Neutral Button</Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Reverse</h3>
                        <p className="text-sm text-neutral-600 mb-2">Dark button for emphasis on light backgrounds.</p>
                        <Button variant="reverse">Reverse Button</Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Outline</h3>
                        <p className="text-sm text-neutral-600 mb-2">Minimal button with border only, no shadow.</p>
                        <Button variant="outline">Outline Button</Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Primary</h3>
                        <p className="text-sm text-neutral-600 mb-2">Alias for default variant, explicit naming.</p>
                        <Button variant="primary">Primary Button</Button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">No Shadow</h3>
                        <p className="text-sm text-neutral-600 mb-2">Button without shadow effect (for nested contexts).</p>
                        <Button variant="noShadow">No Shadow Button</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Sizes</h2>
                <p className="text-neutral-600">
                    Choose from 4 sizes depending on context and hierarchy.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">🔍</Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Focus states:</strong> Thick 2px ring with high contrast for keyboard navigation</li>
                    <li><strong>Disabled:</strong> Proper disabled styling with pointer-events-none</li>
                    <li><strong>Labels:</strong> Use descriptive button text or aria-label prop</li>
                    <li><strong>ARIA:</strong> Respects aria-pressed, aria-expanded, and other button attributes</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/button.tsx</code>:</p>
                <CodeBlock code={buttonCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="space-y-4">
      <Button>Click me</Button>
      <Button variant="neutral">Secondary</Button>
      <Button size="lg">Large button</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}`} />
            </div>
        </div>
    )
}
