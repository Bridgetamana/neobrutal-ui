import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardWithActionsDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Task Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Check out your live application at the link below.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="neutral">View Details</Button>
        <Button>Go to App</Button>
      </CardFooter>
    </Card>
  )
}
