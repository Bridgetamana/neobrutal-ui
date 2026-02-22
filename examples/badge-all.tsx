import { Badge } from "@/components/ui/badge"

export default function BadgeAllDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>New</Badge>
      <Badge variant="neutral">Popular</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}
