import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="noShadow" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold leading-none">Dimensions</h4>
            <p className="text-sm text-black">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
