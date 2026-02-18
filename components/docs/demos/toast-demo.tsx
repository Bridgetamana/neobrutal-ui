"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

function simulateSave(): Promise<{ name: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve({ name: "My Document" })
            } else {
                reject(new Error("Network error"))
            }
        }, 2000)
    })
}

export function ToastDemo() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button
                variant="neutral"
                onClick={() =>
                    toast.info("Event has been created", {
                        title: "Success",
                    })
                }
            >
                Basic toast
            </Button>
            <Button
                variant="neutral"
                onClick={() =>
                    toast.success("Your changes have been saved", {
                        title: "Saved",
                        actionProps: {
                            children: "Undo",
                            onClick: () => toast.info("Action undone"),
                        },
                    })
                }
            >
                With action
            </Button>
            <Button
                variant="neutral"
                onClick={() =>
                    toast.promise(simulateSave(), {
                        loading: "Saving document...",
                        success: (data) => ({
                            title: "Saved",
                            description: `${data.name} saved successfully`,
                        }),
                        error: (err) => ({
                            title: "Error",
                            description:
                                err instanceof Error
                                    ? err.message
                                    : "Something went wrong",
                        }),
                    })
                }
            >
                Promise toast
            </Button>
        </div>
    )
}

export function ToastTypesDemo() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button
                variant="neutral"
                onClick={() => toast.success("Operation completed")}
            >
                Success
            </Button>
            <Button
                variant="neutral"
                onClick={() => toast.error("Something went wrong")}
            >
                Error
            </Button>
            <Button
                variant="neutral"
                onClick={() => toast.warning("Disk space is running low")}
            >
                Warning
            </Button>
            <Button
                variant="neutral"
                onClick={() => toast.info("A new version is available")}
            >
                Info
            </Button>
        </div>
    )
}

export function ToastActionDemo() {
    return (
        <Button
            variant="neutral"
            onClick={() =>
                toast.success("File deleted", {
                    title: "Deleted",
                    actionProps: {
                        children: "Undo",
                        onClick: () => toast.info("File restored"),
                    },
                })
            }
        >
            Toast with action
        </Button>
    )
}

export function ToastPromiseDemo() {
    return (
        <Button
            variant="neutral"
            onClick={() =>
                toast.promise(simulateSave(), {
                    loading: "Saving document...",
                    success: (data) => ({
                        title: "Saved",
                        description: `${data.name} saved successfully`,
                    }),
                    error: (err) => ({
                        title: "Error",
                        description:
                            err instanceof Error
                                ? err.message
                                : "Something went wrong",
                    }),
                })
            }
        >
            Save document
        </Button>
    )
}
