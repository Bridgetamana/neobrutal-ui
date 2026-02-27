import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ButtonIconDemo() {
  return (
    <Button size="icon" aria-label="Search">
      <Search />
    </Button>
  )
}
