"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem isActive>
        Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>
  )
}`

const breadcrumbItemProps = [
    {
        name: "isActive",
        type: "boolean",
        defaultValue: "false",
        description: "Whether the item represents the current page.",
    },
]

const breadcrumbSeparatorProps = [
    {
        name: "children",
        type: "React.ReactNode",
        defaultValue: '"/"',
        description: "The separator character or component.",
    },
]

export default function BreadcrumbPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Breadcrumb</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Display navigation breadcrumbs to show users where they are in the page hierarchy.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem isActive>
                        Components
                    </BreadcrumbItem>
                </Breadcrumb>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add breadcrumb" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="text-lg font-bold">BreadcrumbItem</h3>
                <PropsTable data={breadcrumbItemProps} />
                <h3 className="text-lg font-bold">BreadcrumbSeparator</h3>
                <PropsTable data={breadcrumbSeparatorProps} />
            </div>
        </div>
    )
}
