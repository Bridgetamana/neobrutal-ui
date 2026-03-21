import Link from "next/link"
import { cn } from "@/lib/utils"

interface DocNavItem {
    href: string
    label: string
    description?: string
    align?: "left" | "right"
}

interface DocNavLinksProps {
    prev?: Omit<DocNavItem, "align">
    next?: Omit<DocNavItem, "align">
}

function DocNavLink({ href, label, description, align = "left" }: DocNavItem) {
    return (
        <Link
            href={href}
            className={cn(
                "block p-3 hover:bg-main transition-brutal focus-brutal",
                align === "right" && "text-right"
            )}
        >
            <span className="text-lg font-semibold">{label}</span>
            {description && (
                <p className="truncate text-sm">{description}</p>
            )}
        </Link>
    )
}

export function DocNavLinks({ prev, next }: DocNavLinksProps) {
    if (!prev && !next) return null

    const hasBoth = prev && next

    return (
        <div className="rounded-base border-2 border-black shadow-brutal bg-white overflow-hidden not-prose">
            <div
                className={cn(
                    "grid grid-cols-1",
                    hasBoth && "sm:grid-cols-2 sm:divide-x-2 divide-y-2 sm:divide-y-0 divide-black"
                )}
            >
                {prev && <DocNavLink href={prev.href} label={prev.label} description={prev.description} align="left" />}
                {next && <DocNavLink href={next.href} label={next.label} description={next.description} align="right" />}
            </div>
        </div>
    )
}
