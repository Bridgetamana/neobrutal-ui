"use client"

import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const avatarCode = `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex gap-4 items-center">
      {/* Avatar with Image */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Avatar with Fallback */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Avatar Group */}
      <AvatarGroup max={3}>
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
      </AvatarGroup>
    </div>
  )
}`

const avatarHtmlCode = `<!-- Avatar with Image -->
<div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
  <img src="https://github.com/shadcn.png" alt="@shadcn" class="aspect-square h-full w-full object-cover" />
</div>

<!-- Avatar with Fallback (Initials) -->
<div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
  <div class="flex h-full w-full items-center justify-center rounded-full bg-[#88aaee] text-sm font-bold text-black">
    JD
  </div>
</div>

<!-- Avatar Group (showing 3 + overflow) -->
<div class="flex items-center -space-x-4">
  <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
    <div class="flex h-full w-full items-center justify-center rounded-full bg-[#88aaee] text-sm font-bold text-black">A</div>
  </div>
  <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
    <div class="flex h-full w-full items-center justify-center rounded-full bg-[#88aaee] text-sm font-bold text-black">B</div>
  </div>
  <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
    <div class="flex h-full w-full items-center justify-center rounded-full bg-[#88aaee] text-sm font-bold text-black">C</div>
  </div>
  <!-- Overflow indicator -->
  <div class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black bg-neutral-200 text-sm font-bold">
    +2
  </div>
</div>`

export default function AvatarPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black">Avatar</h1>
                <p className="mt-2 text-lg text-neutral-600">
                    Display user profile images with automatic fallback to initials. Includes grouped avatars with overflow indicators.
                </p>
            </div>

            <ComponentPreview code={avatarCode} htmlCode={avatarHtmlCode}>
                <div className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <AvatarGroup max={3}>
                        <Avatar>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>E</AvatarFallback>
                        </Avatar>
                    </AvatarGroup>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Alt text for images</li>
                    <li>Semantic HTML structure</li>
                    <li>Sufficient color contrast for initials</li>
                    <li>Clear visual hierarchy for groups</li>
                </ul>
            </div>
        </div>
    )
}
