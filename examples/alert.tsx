import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}
