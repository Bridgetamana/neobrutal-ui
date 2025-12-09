"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-bw group-[.toaster]:text-text group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-brutal group-[.toaster]:rounded-base group-[.toaster]:font-sans",
                    description: "group-[.toast]:text-text",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-bg group-[.toast]:text-text",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
