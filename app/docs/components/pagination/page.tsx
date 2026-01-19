"use client"

import { useState } from "react"
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

const htmlCode = `<nav aria-label="Pagination" class="flex items-center justify-center border-2 border-black rounded-md">
  <button class="inline-flex h-10 w-10 items-center justify-center text-sm font-bold bg-white text-black border-r-2 border-black hover:bg-neutral-50">
    Prev
  </button>
  <button class="inline-flex h-10 w-10 items-center justify-center text-sm font-bold bg-white text-black border-r-2 border-black hover:bg-neutral-50">
    1
  </button>
  <button class="inline-flex h-10 w-10 items-center justify-center text-sm font-bold bg-[#b6ace4] text-black border-r-2 border-black">
    2
  </button>
  <button class="inline-flex h-10 w-10 items-center justify-center text-sm font-bold bg-white text-black border-r-2 border-black hover:bg-neutral-50">
    3
  </button>
  <button class="inline-flex h-10 w-10 items-center justify-center text-sm font-bold bg-white text-black">
    Next
  </button>
</nav>`

const paginationProps = [
    {
        name: "isActive",
        type: "boolean",
        description: "Whether the pagination item is the current page.",
    },
]

export default function PaginationPage() {
    const [activePage, setActivePage] = useState(2)

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

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
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

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">Interactive Pagination</h3>
                    <ComponentPreview code={`const [activePage, setActivePage] = useState(1)

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationItem onClick={() => setActivePage(activePage - 1)}>Prev</PaginationItem>
      {[1, 2, 3, 4, 5].map((page) => (
        <PaginationItem key={page} isActive={activePage === page} onClick={() => setActivePage(page)}>
          {page}
        </PaginationItem>
      ))}
      <PaginationItem onClick={() => setActivePage(activePage + 1)}>Next</PaginationItem>
    </Pagination>
  )
}`}>
                        <Pagination>
                            <PaginationItem onClick={() => setActivePage(Math.max(1, activePage - 1))}>Prev</PaginationItem>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <PaginationItem key={page} isActive={activePage === page} onClick={() => setActivePage(page)}>
                                    {page}
                                </PaginationItem>
                            ))}
                            <PaginationItem onClick={() => setActivePage(Math.min(5, activePage + 1))}>Next</PaginationItem>
                        </Pagination>
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">PaginationItem</h3>
                <PropsTable data={paginationProps} />
            </div>
        </div>
    )
}
