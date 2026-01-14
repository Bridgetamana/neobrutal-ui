"use client"

import { Pagination, PaginationItem } from "@/components/ui/pagination"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Pagination>
  <PaginationItem>Prev</PaginationItem>
  <PaginationItem>1</PaginationItem>
  <PaginationItem isActive>2</PaginationItem>
  <PaginationItem>3</PaginationItem>
  <PaginationItem>Next</PaginationItem>
</Pagination>`

const paginationProps = [
    {
        name: "isActive",
        type: "boolean",
        description: "Whether the pagination item is the current page.",
    },
]

export default function PaginationPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Pagination</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Pagination with bold borders and clear active states.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Pagination>
                    <PaginationItem>Prev</PaginationItem>
                    <PaginationItem>1</PaginationItem>
                    <PaginationItem isActive>2</PaginationItem>
                    <PaginationItem>3</PaginationItem>
                    <PaginationItem>Next</PaginationItem>
                </Pagination>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add pagination" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Pagination, PaginationItem } from "@/components/ui/pagination"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">PaginationItem</h3>
                <PropsTable data={paginationProps} />
            </div>
        </div>
    )
}
