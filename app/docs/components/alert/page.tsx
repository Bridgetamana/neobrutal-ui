"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { WarningIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "@phosphor-icons/react"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const alertCode = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, XCircleIcon } from "@phosphor-icons/react"

export function AlertDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <InfoIcon className="h-5 w-5" weight="fill" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircleIcon className="h-5 w-5" weight="fill" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  )
}`

const alertHtmlCode = `<!-- Info Alert -->
<div role="alert" class="relative w-full rounded-[5px] border-2 border-black bg-[#88aaee] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <!-- Phosphor Info icon (or use your own SVG) -->
  <svg class="absolute left-4 top-4 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
  </svg>
  <div class="pl-7">
    <h5 class="mb-1 font-bold">Info</h5>
    <div class="text-sm">This is an informational alert message.</div>
  </div>
</div>

<!-- Error Alert -->
<div role="alert" class="relative w-full rounded-[5px] border-2 border-black bg-[#ee8888] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <!-- Phosphor XCircle icon -->
  <svg class="absolute left-4 top-4 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L128,99.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,88,90.34,61.66a8,8,0,0,1,11.32-11.32L128,76.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,88Z"></path>
  </svg>
  <div class="pl-7">
    <h5 class="mb-1 font-bold">Error</h5>
    <div class="text-sm">Something went wrong. Please try again.</div>
  </div>
</div>`

export default function AlertPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Alert</h1>
                <p className="text-xl text-neutral-600">
                    A message container for important information. Perfect for notifications, warnings, and status messages.
                </p>
            </div>

            <ComponentPreview code={alertCode} htmlCode={alertHtmlCode}>
                <div className="w-full max-w-md space-y-4">
                    <Alert>
                        <InfoIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Info</AlertTitle>
                        <AlertDescription>This is an informational alert message.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircleIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                    </Alert>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Variants</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Default</h3>
                        <Alert>
                            <CheckCircleIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Your action completed successfully.</AlertDescription>
                        </Alert>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Destructive</h3>
                        <Alert variant="destructive">
                            <WarningIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>This action cannot be undone.</AlertDescription>
                        </Alert>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Icon Usage</h2>
                <p className="text-neutral-600 mb-4">
                    Use Phosphor Icons for visual clarity. The component automatically positions the icon.
                </p>
                <div className="space-y-4">
                    <Alert>
                        <InfoIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Info Message</AlertTitle>
                        <AlertDescription>General information or tips</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircleIcon className="h-5 w-5" weight="fill" />
                        <AlertTitle>Error Message</AlertTitle>
                        <AlertDescription>Something failed or went wrong</AlertDescription>
                    </Alert>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>ARIA role:</strong> Automatic role=&quot;alert&quot; for screen readers</li>
                    <li><strong>Title + Description:</strong> Semantic structure for clarity</li>
                    <li><strong>High contrast:</strong> Bold text and clear colors</li>
                    <li><strong>Icon support:</strong> Works with icon libraries</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/alert.tsx</code>:</p>
                <CodeBlock code={alertCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "@phosphor-icons/react"

export function AlertDemo() {
  return (
    <Alert>
      <InfoIcon className="h-5 w-5" weight="fill" />
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>Alert description goes here</AlertDescription>
    </Alert>
  )
}`} />
            </div>
        </div>
    )
}
