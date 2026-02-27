import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function InputWithIconDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-2.5 h-5 w-5 opacity-50" />
      <Input type="text" placeholder="Search..." className="pl-10" />
    </div>
  )
}
