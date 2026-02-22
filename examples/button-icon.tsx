import { Button } from "@/components/ui/button"
import { MagnifyingGlass } from "@phosphor-icons/react"

export default function ButtonIconDemo() {
  return (
    <Button size="icon" aria-label="Search">
      <MagnifyingGlass weight="bold" />
    </Button>
  )
}
