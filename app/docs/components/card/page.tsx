"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="text-sm font-bold underline text-black">Cancel</button>
        <button className="rounded-base border-2 border-black bg-main px-3 py-1 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">Deploy</button>
      </CardFooter>
    </Card>
  )
}`

export default function CardPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Card</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A container component with bold borders and shadow. Perfect for grouping related content.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">This is the main content area of the card. You can put anything here.</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <button className="text-sm font-bold underline text-black">Cancel</button>
                        <button className="rounded-base border-2 border-black bg-main px-3 py-1 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">Deploy</button>
                    </CardFooter>
                </Card>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal-ui add card" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">Simple Card</h3>
                    <ComponentPreview code={`<Card className="p-6">
  <p>A simple card with just content and padding.</p>
</Card>`}>
                        <Card className="p-6 max-w-md">
                            <p className="text-sm">A simple card with just content and padding.</p>
                        </Card>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
