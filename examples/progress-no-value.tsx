import { Progress } from "@/components/ui/progress"

export default function ProgressNoValueDemo() {
  return <Progress value={50} showValue={false} className="w-[60%]" />
}
