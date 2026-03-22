import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface DocPagerItem {
    href: string
    title: string
}

interface DocPagerProps {
    prev?: DocPagerItem
    next?: DocPagerItem
}

export function DocPager({ prev, next }: DocPagerProps) {
    if (!prev && !next) return null

    return (
        <nav aria-label="Pagination" className="grid grid-cols-2 gap-3 mt-10">
            {prev ? (
                <Link
                    href={prev.href}
                    className="col-start-1 flex flex-col gap-1 rounded-base border-2 border-black bg-white p-4 shadow-brutal transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.97] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-brutal"
                >
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-black/60">
                        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        Previous
                    </span>
                    <span className="font-bold text-black">{prev.title}</span>
                </Link>
            ) : (
                <div />
            )}

            {next && (
                <Link
                    href={next.href}
                    className="col-start-2 flex flex-col gap-1 rounded-base border-2 border-black bg-white p-4 shadow-brutal text-right transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.97] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-brutal"
                >
                    <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wide text-black/60">
                        Next
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="font-bold text-black">{next.title}</span>
                </Link>
            )}
        </nav>
    )
}
