"use client"

import { Badge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const badgeCode = `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`

const badgeHtmlCode = `<!-- Default Badge -->
<span class="inline-flex items-center rounded-[5px] border-2 border-black bg-[#88aaee] px-2.5 py-0.5 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
  Default
</span>

<!-- Neutral Badge -->
<span class="inline-flex items-center rounded-[5px] border-2 border-black bg-white px-2.5 py-0.5 text-xs font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
  Neutral
</span>

<!-- Outline Badge -->
<span class="inline-flex items-center rounded-[5px] border-2 border-black bg-transparent px-2.5 py-0.5 text-xs font-bold text-black">
  Outline
</span>`

export default function BadgePage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Badge</h1>
                <p className="text-xl text-neutral-600">
                    A compact label component for displaying status, tags, or labels with minimal visual footprint.
                </p>
            </div>

            <ComponentPreview code={badgeCode} htmlCode={badgeHtmlCode}>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Variants</h2>
                <p className="text-neutral-600 mb-4">
                    Choose from 3 variants to match your design needs.
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Default</h3>
                        <p className="text-sm text-neutral-600 mb-2">Accent color background for primary status.</p>
                        <Badge variant="default">Active</Badge>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Neutral</h3>
                        <p className="text-sm text-neutral-600 mb-2">White background for neutral/secondary status.</p>
                        <Badge variant="neutral">Pending</Badge>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Outline</h3>
                        <p className="text-sm text-neutral-600 mb-2">Border only, minimal style for subtle status.</p>
                        <Badge variant="outline">Inactive</Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Use Cases</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Status indicators:</strong> Active, Pending, Inactive, Error states</li>
                    <li><strong>Tags:</strong> Categorization and filtering labels</li>
                    <li><strong>Pills:</strong> Language tags, technology stacks</li>
                    <li><strong>Counts:</strong> Notifications or item counts (with numbers)</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Styling</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Border:</strong> 2px solid black for definition</li>
                    <li><strong>Size:</strong> Compact px-2.5 py-0.5 for inline use</li>
                    <li><strong>Typography:</strong> Bold text (font-bold) at xs size</li>
                    <li><strong>Radius:</strong> Rounded corners for badge aesthetic</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/badge.tsx</code>:</p>
                <CodeBlock code={badgeCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Badge>New</Badge>
        <Badge variant="neutral">Popular</Badge>
        <Badge variant="outline">Beta</Badge>
      </div>
    </div>
  )
}`} />
            </div>
        </div>
    )
}
