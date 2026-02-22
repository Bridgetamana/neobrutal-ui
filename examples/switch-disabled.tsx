import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchDisabledDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  )
}
