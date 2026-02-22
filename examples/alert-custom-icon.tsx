"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Bell } from "@phosphor-icons/react"

export default function AlertCustomIconDemo() {
  return (
    <Alert className="max-w-md" icon={<Bell className="h-5 w-5" />}>
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>You have new updates available.</AlertDescription>
    </Alert>
  )
}
