"use client"

import { Badge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`

const htmlCode = `<span class="inline-flex items-center rounded-[5px] border-2 border-black bg-[#b6ace4] px-2.5 py-0.5 text-xs font-bold text-black">
  Badge
</span>`

const badgeProps = [
    {
        name: "variant",
        type: '"default" | "neutral" | "destructive" | "success" | "warning"',
        defaultValue: '"default"',
        description: "The visual style of the badge.",
    },
]

export default function BadgePage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Badge</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays a small label for status or categorization.
                </p>
            </section>

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <Badge>Badge</Badge>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add badge" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Badge } from "@/components/ui/badge"`} />
                <CodeBlock code={`<Badge variant="neutral">Badge</Badge>`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">Default</h3>
                    <ComponentPreview code={`<Badge>Default</Badge>`}>
                        <Badge>Default</Badge>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Neutral</h3>
                    <ComponentPreview code={`<Badge variant="neutral">Neutral</Badge>`}>
                        <Badge variant="neutral">Neutral</Badge>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Destructive</h3>
                    <ComponentPreview code={`<Badge variant="destructive">Destructive</Badge>`}>
                        <Badge variant="destructive">Destructive</Badge>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Success</h3>
                    <ComponentPreview code={`<Badge variant="success">Success</Badge>`}>
                        <Badge variant="success">Success</Badge>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Warning</h3>
                    <ComponentPreview code={`<Badge variant="warning">Warning</Badge>`}>
                        <Badge variant="warning">Warning</Badge>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Multiple Badges</h3>
                    <ComponentPreview code={`<div className="flex flex-wrap gap-2">
  <Badge>New</Badge>
  <Badge variant="neutral">Popular</Badge>
  <Badge variant="destructive">Error</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
</div>`}>
                        <div className="flex flex-wrap gap-2">
                            <Badge>New</Badge>
                            <Badge variant="neutral">Popular</Badge>
                            <Badge variant="destructive">Error</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                        </div>
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={badgeProps} />
            </div>
        </div>
    )
}
