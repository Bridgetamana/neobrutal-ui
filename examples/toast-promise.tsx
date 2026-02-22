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

export default function ToastPromiseDemo() {
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
              err instanceof Error ? err.message : "Something went wrong",
          }),
        })
      }
    >
      Save document
    </Button>
  )
}
