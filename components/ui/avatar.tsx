"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const AvatarContext = React.createContext<{
    status: "loading" | "loaded" | "error"
    setStatus: (status: "loading" | "loaded" | "error") => void
} | null>(null)

const Avatar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading")

    return (
        <AvatarContext.Provider value={{ status, setStatus }}>
            <div
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-bw",
                    className
                )}
                {...props}
            />
        </AvatarContext.Provider>
    )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, ...props }, ref) => {
    const context = React.useContext(AvatarContext)
    const { setStatus, status } = context || {}

    React.useEffect(() => {
        if (!src) {
            setStatus?.("error")
            return
        }

        const img = new Image()
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
            ref={ref}
            src={src}
            alt={props.alt || "Avatar"}
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(AvatarContext)
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
})
AvatarFallback.displayName = "AvatarFallback"

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    max?: number
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ className, max = 3, children, ...props }, ref) => {
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
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-base border-2 border-border bg-bw text-sm font-bold text-black hover:z-10">
                        +{overflow}
                    </div>
                )}
            </div>
        )
    }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
