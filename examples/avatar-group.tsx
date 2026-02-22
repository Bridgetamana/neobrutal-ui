import { Avatar, AvatarGroup, AvatarFallback } from "@/components/ui/avatar"

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup max={3}>
      <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
    </AvatarGroup>
  )
}
