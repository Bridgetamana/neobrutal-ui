"use client"

import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const avatarCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
    fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, children, ...props }, ref) => {
        const [imageError, setImageError] = React.useState(false)

        return (
            <div
                ref={ref}
                className={cn(
                    "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-base border-2 border-border bg-main text-sm font-bold text-black",
                    className
                )}
                {...props}
            >
                {src && !imageError ? (
                    <img
                        src={src}
                        alt={alt || "Avatar"}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span>{fallback || children}</span>
                )}
            </div>
        )
    }
)
Avatar.displayName = "Avatar"

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
                className={cn("flex items-center -space-x-2", className)}
                {...props}
            >
                {visible.map((child, index) => (
                    <div key={index} className="relative">
                        {child}
                    </div>
                ))}
                {overflow > 0 && (
                    <div className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-base border-2 border-border bg-neutral-300 text-sm font-bold">
                        +{overflow}
                    </div>
                )}
            </div>
        )
    }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }`

export default function AvatarPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black">Avatar</h1>
                <p className="mt-2 text-lg text-neutral-600">
                    Display user profile images with automatic fallback to initials. Includes grouped avatars with overflow indicators.
                </p>
            </div>

            <ComponentPreview code={avatarCode}>
                <div className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <AvatarGroup max={3}>
                        <Avatar>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>E</AvatarFallback>
                        </Avatar>
                    </AvatarGroup>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Alt text for images</li>
                    <li>Semantic HTML structure</li>
                    <li>Sufficient color contrast for initials</li>
                    <li>Clear visual hierarchy for groups</li>
                </ul>
            </div>
        </div>
    )
}
