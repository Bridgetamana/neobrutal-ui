import { cn } from "@/lib/utils"

interface InfoGridItemProps {
    title: string
    children: React.ReactNode
    className?: string
}

export function InfoGridItem({ title, children, className }: InfoGridItemProps) {
    return (
        <div className={cn("p-4", className)}>
            <span className="text-xl font-medium">{title}</span>
            <p className="mt-1">{children}</p>
        </div>
    )
}

interface InfoGridProps {
    children: React.ReactNode
    cols?: 2 | 3 | 4
    className?: string
}

export function InfoGrid({ children, cols = 2, className }: InfoGridProps) {
    const colClass = {
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
    }[cols]

    return (
        <div className={cn("rounded-base border-2 border-black bg-white overflow-hidden not-prose", className)}>
            <div
                className={cn(
                    "grid grid-cols-1 divide-y-2 divide-black",
                    `${colClass} [&>*:not(:first-child)]:sm:border-l-2 [&>*:not(:first-child)]:sm:border-black sm:divide-y-0`
                )}
            >
                {children}
            </div>
        </div>
    )
}
