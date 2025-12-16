"use client"

import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`

const htmlCode = `<div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
  <img src="https://github.com/shadcn.png" alt="@shadcn" class="aspect-square h-full w-full object-cover" />
</div>

<!-- Fallback (when image fails or is missing) -->
<div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-black bg-white">
  <div class="flex h-full w-full items-center justify-center rounded-full bg-[#88aaee] text-sm font-bold text-black">
    CN
  </div>
</div>`

export default function AvatarPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Avatar</h1>
                <p className="text-lg text-black/90">
                    An image element with a fallback for representing the user.
                </p>
            </div>

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal-ui add avatar" language="bash" />
                <p className="text-sm text-black/90">Or install the dependency and copy the code:</p>
                <CodeBlock code="npm install @radix-ui/react-avatar" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`} />
                <CodeBlock code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">With Image</h3>
                    <ComponentPreview code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Fallback</h3>
                    <p className="text-sm text-black/90">Displays initials when no image is available.</p>
                    <ComponentPreview code={`<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}>
                        <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Group</h3>
                    <p className="text-sm text-black/90">Display multiple avatars with an overflow indicator.</p>
                    <ComponentPreview code={`<AvatarGroup max={3}>
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
</AvatarGroup>`}>
                        <AvatarGroup max={3}>
                            <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
                            <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
                            <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
                            <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
                            <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
                        </AvatarGroup>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
