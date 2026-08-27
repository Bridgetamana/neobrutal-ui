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
        <nav aria-label="Pagination" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
                <Link
                    href={prev.href}
                    className="flex min-w-0 flex-col gap-1 rounded-base border-2 border-black bg-white p-4 shadow-brutal transition-brutal active:scale-[0.97] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-brutal sm:col-start-1"
                >
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-black/60">
                        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        Previous
                    </span>
                    <span className="font-bold text-black">{prev.title}</span>
                </Link>
            ) : (
                <div className="hidden sm:block" />
            )}

            {next && (
                <Link
                    href={next.href}
                    className="flex min-w-0 flex-col gap-1 rounded-base border-2 border-black bg-white p-4 text-right shadow-brutal transition-brutal active:scale-[0.97] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-brutal sm:col-start-2"
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
