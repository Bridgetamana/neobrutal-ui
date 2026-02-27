import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
    "rounded-base border-2 border-black bg-white text-black shadow-brutal",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>

const Card = ({ className, variant, ref, ...props }: CardProps) => (
    <div
        ref={ref}
        className={cn(cardVariants({ variant }), "p-4", className)}
        {...props}
    />
)

const CardHeader = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-2", className)}
        {...props}
    />
)

const CardTitle = ({ className, ref, ...props }: React.ComponentProps<"h3">) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-bold",
            className
        )}
        {...props}
    />
)

const CardContent = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
    <div ref={ref} className={cn(className)} {...props} />
)

const CardFooter = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-6", className)}
        {...props}
    />
)

export { Card, CardHeader, CardFooter, CardTitle, CardContent, cardVariants }
