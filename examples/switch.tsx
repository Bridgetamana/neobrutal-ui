import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
