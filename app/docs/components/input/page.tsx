"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { MagnifyingGlassIcon, UploadSimpleIcon } from "@phosphor-icons/react"

const usageCode = `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`

const htmlCode = `<div class="grid w-full max-w-sm items-center gap-1.5">
  <label for="email" class="text-sm font-bold">Email</label>
  <input type="email" id="email" placeholder="Email" class="flex h-10 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white" />
</div>`

export default function InputPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Input</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A text input field with bold borders and accessible focus states.
                </p>
            </section>

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add input" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">With Icon</h3>
                    <ComponentPreview code={`<div className="relative w-full max-w-sm">
  <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-black opacity-50" />
  <Input type="text" placeholder="Search..." className="pl-10" />
</div>`}>
                        <div className="relative w-full max-w-sm">
                            <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-black opacity-50" />
                            <Input type="text" placeholder="Search..." className="pl-10" />
                        </div>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">File Upload</h3>
                    <ComponentPreview code={`<div className="grid w-full max-w-sm">
  <Label htmlFor="file">Upload Document</Label>
  <div className="relative border-2 border-dashed border-black rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
    <UploadSimpleIcon className="h-8 w-8 text-black mx-auto mb-2" />
    <Label htmlFor="file" className="block text-sm font-bold cursor-pointer">
      Click to upload
    </Label>
    <p className="text-xs text-gray-600 mt-1">PDF, DOC or DOCX</p>
    <Input id="file" type="file" accept=".pdf,.doc,.docx" className="hidden" />
  </div>
</div>`}>
                        <div className="grid w-full max-w-sm">
                            <Label htmlFor="file">Upload Document</Label>
                            <label htmlFor="file" className="relative border-2 border-dashed border-black rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer block">
                                <UploadSimpleIcon className="h-8 w-8 text-black mx-auto mb-2" />
                                <div className="text-sm font-bold">Click to upload</div>
                                <p className="text-xs text-gray-600 mt-1">PDF, DOC or DOCX</p>
                            </label>
                            <Input id="file" type="file" accept=".pdf,.doc,.docx" className="hidden" />
                        </div>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
