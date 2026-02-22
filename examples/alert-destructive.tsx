import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function AlertDestructiveDemo() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  )
}
