"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export default function ToastActionDemo() {
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
