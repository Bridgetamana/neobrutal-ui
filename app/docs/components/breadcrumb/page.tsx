"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage as BreadcrumbPageComponent } from "@/components/ui/breadcrumb"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
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
      <BreadcrumbItem>
        <BreadcrumbPage>Components</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}`

const htmlCode = `<nav aria-label="Breadcrumb" class="flex items-center gap-1 text-sm">
  <li class="flex items-center">
    <a href="#" class="inline-flex items-center px-3 py-1 font-bold text-black bg-white border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 rounded-base">
      Home
    </a>
  </li>
  <span class="inline-flex items-center justify-center w-6 h-6 font-bold text-black bg-[#b6ace4] border-2 border-black shadow-brutal rounded-base mx-1">
    &gt;
  </span>
  <li class="flex items-center">
    <a href="#" class="inline-flex items-center px-3 py-1 font-bold text-black bg-white border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 rounded-base">
      Docs
    </a>
  </li>
  <span class="inline-flex items-center justify-center w-6 h-6 font-bold text-black bg-[#b6ace4] border-2 border-black shadow-brutal rounded-base mx-1">
    &gt;
  </span>
  <li class="flex items-center">
    <span class="inline-flex items-center px-3 py-1 font-bold text-black bg-[#b6ace4] border-2 border-black shadow-brutal rounded-base">
      Components
    </span>
  </li>
</nav>`

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

      <ComponentPreview code={usageCode} htmlCode={htmlCode}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPageComponent>Components</BreadcrumbPageComponent>
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
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"`} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Props</h2>
        <h3 className="text-lg font-bold">BreadcrumbItem</h3>
        <PropsTable data={breadcrumbItemProps} />
        <h3 className="text-lg font-bold">BreadcrumbSeparator</h3>
        <PropsTable data={breadcrumbSeparatorProps} />
        <h3 className="text-lg font-bold">BreadcrumbPage</h3>
        <p className="text-sm text-gray-600 mb-2">No additional props - renders the current page item.</p>
      </div>
    </div>
  )
}
