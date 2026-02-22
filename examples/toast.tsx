"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export default function ToastDemo() {
  return (
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
  )
}
