"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const AvatarContext = React.createContext<{
    status: "loading" | "loaded" | "error"
    setStatus: (status: "loading" | "loaded" | "error") => void
} | null>(null)

const Avatar = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading")

    return (
        <AvatarContext.Provider value={{ status, setStatus }}>
            <div
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white",
                    className
                )}
                {...props}
            />
        </AvatarContext.Provider>
    )
}

const AvatarImage = ({ className, src, alt = "Avatar", ref, ...props }: React.ComponentProps<"img">) => {
    const context = React.use(AvatarContext)
    const { setStatus, status } = context || {}

    React.useEffect(() => {
        if (!src) {
            setStatus?.("error")
            return
        }

        const img = new globalThis.Image()
        img.src = src as string
        img.onload = () => setStatus?.("loaded")
        img.onerror = () => setStatus?.("error")

        return () => {
            img.onload = null
            img.onerror = null
        }
    }, [src, setStatus])

    if (status === "error" && context) return null

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes="40px"
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...(props as any)}
        />
    )
}

const AvatarFallback = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
    const context = React.use(AvatarContext)
    const status = context?.status

    if (status === "loaded") return null

    return (
        <div
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-main text-sm font-bold text-black",
                className
            )}
            {...props}
        />
    )
}

export type AvatarGroupProps = React.ComponentProps<"div"> & {
    max?: number
}

const AvatarGroup = ({ className, max = 3, children, ref, ...props }: AvatarGroupProps) => {
    const childArray = React.Children.toArray(children)
    const visible = childArray.slice(0, max)
    const overflow = childArray.length - max

    return (
        <div
            ref={ref}
            className={cn("flex items-center -space-x-4", className)}
            {...props}
        >
            {visible}
            {overflow > 0 && (
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-white text-sm font-bold text-black hover:z-10">
                    +{overflow}
                </div>
            )}
        </div>
    )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
