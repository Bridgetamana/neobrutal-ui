import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-base border-2 border-black px-2.5 py-0.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-main text-black",
                neutral:
                    "bg-bw text-black",
                outline: "text-black bg-transparent shadow-none",
                destructive: "bg-pastel-red text-black",
                success: "bg-pastel-green text-black",
                warning: "bg-pastel-yellow text-black",
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
