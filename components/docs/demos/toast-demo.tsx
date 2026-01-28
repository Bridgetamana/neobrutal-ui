"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
    return (
        <Button
            variant="neutral"
            onClick={() =>
                toast.info("Event has been created", {
                    title: "Success",
                    actionProps: {
                        children: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        >
            Add to calendar
        </Button>
    )
}
