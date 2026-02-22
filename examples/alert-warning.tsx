import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function AlertWarningDemo() {
  return (
    <Alert variant="warning" className="max-w-md">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>This action cannot be undone.</AlertDescription>
    </Alert>
  )
}
