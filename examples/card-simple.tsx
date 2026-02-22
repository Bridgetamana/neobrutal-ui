import { Card } from "@/components/ui/card"

export default function CardSimpleDemo() {
  return (
    <Card className="p-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Quick Note</h3>
        <p className="text-sm">Sometimes you just need a simple card with padding and content.</p>
      </div>
    </Card>
  )
}
