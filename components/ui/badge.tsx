import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-base border-2 border-black px-2.5 py-0.5 text-xs font-bold",
    {
        variants: {
            variant: {
                default:
                    "bg-main text-black",
                neutral:
                    "bg-white text-black",
                destructive: "bg-hot-pink text-black",
                success: "bg-mint text-black",
                warning: "bg-lemon text-black",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
