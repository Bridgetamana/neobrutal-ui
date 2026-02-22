import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardDemo() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is the main content area of the card. You can put text, images, forms, or any other content here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="neutral">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
