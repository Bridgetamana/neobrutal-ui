import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function AlertSuccessDemo() {
  return (
    <Alert variant="success" className="max-w-md">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  )
}
