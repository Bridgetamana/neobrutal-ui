import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SlotProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
    ({ children, ...props }, ref) => {
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
)
Slot.displayName = "Slot"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-border cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-main text-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                noShadow: "bg-main text-black border-2 border-border",
                neutral: "bg-white text-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                primary: "bg-main text-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                reverse: "bg-black text-white shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-neutral-800",
                outline: "bg-white text-black border-2 border-border hover:bg-neutral-100",
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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
