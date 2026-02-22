import { Input } from "@/components/ui/input"
import { MagnifyingGlass } from "@phosphor-icons/react"

export default function InputWithIconDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <MagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 opacity-50" />
      <Input type="text" placeholder="Search..." className="pl-10" />
    </div>
  )
}
