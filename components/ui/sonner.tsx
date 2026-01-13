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
                        "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-2 group-[.toaster]:border-black group-[.toaster]:shadow-brutal group-[.toaster]:rounded-base group-[.toaster]:font-sans",
                    description: "group-[.toast]:text-black",
                    actionButton:
                        "group-[.toast]:bg-main group-[.toast]:text-black",
                    cancelButton:
                        "group-[.toast]:bg-[var(--bg)] group-[.toast]:text-black",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
