"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const skeletonCode = `import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-base bg-neutral-200 border-2 border-black", className)}
      {...props}
    />
  )
}

export { Skeleton }`

export default function SkeletonPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Skeleton</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Use to show a placeholder while content is loading.
                </p>
            </section>

            <ComponentPreview code={skeletonCode}>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Use <code className="bg-neutral-200 px-2 py-1 rounded">aria-busy=&quot;true&quot;</code> on the container when loading</li>
                    <li>Ensure sufficient contrast for the placeholder</li>
                </ul>
            </div>
        </div>
    )
}
