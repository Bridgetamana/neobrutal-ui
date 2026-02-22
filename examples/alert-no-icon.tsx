import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function AlertNoIconDemo() {
  return (
    <Alert className="max-w-md" icon={null}>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>A simple alert without an icon.</AlertDescription>
    </Alert>
  )
}
