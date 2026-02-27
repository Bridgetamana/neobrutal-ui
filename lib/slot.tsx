import * as React from "react"
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

export { Slot }
export type { SlotProps }
