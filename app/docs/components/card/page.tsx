"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const cardCode = `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-base border-2 border-border bg-bw text-text shadow-brutal",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-neutral-500", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`

export default function CardPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Card</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A container component with bold borders and shadow. Perfect for grouping related content.
                </p>
            </section>

            <ComponentPreview code={cardCode}>
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Component Card</CardTitle>
                        <CardDescription>A clean, accessible card component.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Add your content here. Cards are perfect for layouts.</p>
                    </CardContent>
                </Card>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Composition</h2>
                <p className="text-black">
                    The Card component is designed to work with sub-components for semantic structure.
                </p>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Card:</strong> Root container with border and shadow</li>
                    <li><strong>CardHeader:</strong> Top section, typically for title and description</li>
                    <li><strong>CardTitle:</strong> Main heading (h3 semantically)</li>
                    <li><strong>CardDescription:</strong> Subtitle or supporting text</li>
                    <li><strong>CardContent:</strong> Main body content</li>
                    <li><strong>CardFooter:</strong> Bottom section for actions or metadata</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Examples</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-2">Full Card with Footer</h3>
                        <Card className="max-w-md">
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>Manage your preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">Card content goes here with your settings form or content.</p>
                            </CardContent>
                            <CardFooter className="justify-between">
                                <button className="text-sm text-black hover:underline">Cancel</button>
                                <button className="text-sm font-bold">Save</button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Styling</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Border:</strong> 2px solid black border for Neobrutalist look</li>
                    <li><strong>Shadow:</strong> Hard 4px offset shadow (no blur)</li>
                    <li><strong>Radius:</strong> Subtle border radius for modern feel</li>
                    <li><strong>Padding:</strong> Generous internal spacing (p-6) for readability</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/card.tsx</code>:</p>
                <CodeBlock code={cardCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Your Title</CardTitle>
        <CardDescription>Your description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area</p>
      </CardContent>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  )
}`} />
            </div>
        </div>
    )
}
