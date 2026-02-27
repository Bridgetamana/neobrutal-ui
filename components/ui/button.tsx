import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SlotProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    ref?: React.Ref<HTMLElement>
}

const Slot = ({ children, ref, ...props }: SlotProps) => {
    if (React.isValidElement<Record<string, unknown>>(children)) {
        const childProps = children.props as Record<string, unknown>
        return React.cloneElement(children, {
            ...props,
            ...childProps,
            ref,
            className: cn(props.className as string, childProps.className as string),
        })
    }
    return null
}

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold ring-offset-white transition-transform focus-brutal disabled:pointer-events-none disabled:opacity-50 border-2 border-black cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-main text-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                noShadow: "bg-main text-black border-2 border-black",
                neutral: "bg-white text-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

const Button = ({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
}

export { Button, buttonVariants }
