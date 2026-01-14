"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, XCircleIcon, CheckCircleIcon, WarningIcon } from "@phosphor-icons/react"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "@phosphor-icons/react"

export function AlertDemo() {
  return (
    <Alert>
      <InfoIcon className="h-5 w-5" weight="fill" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}`

const htmlCode = `<div role="alert" class="relative w-full rounded-[5px] border-2 border-black bg-[#88aaee] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <svg class="absolute left-4 top-4 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
  </svg>
  <div class="pl-7">
    <h5 class="mb-1 font-bold">Heads up!</h5>
    <div class="text-sm">You can add components to your app using the CLI.</div>
  </div>
</div>`

const alertProps = [
    {
        name: "variant",
        type: '"default" | "neutral" | "destructive" | "success" | "warning"',
        defaultValue: '"default"',
        description: "The visual style of the alert.",
    },
]

export default function AlertPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Alert</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays a message to attract user attention.
                </p>
            </section>

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <Alert className="max-w-md">
                    <InfoIcon className="h-5 w-5" weight="fill" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components to your app using the CLI.
                    </AlertDescription>
                </Alert>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add alert" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`} />
                <CodeBlock code={`<Alert>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">Default</h3>
                    <ComponentPreview code={`<Alert>
  <InfoIcon className="h-5 w-5" weight="fill" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>`}>
                        <Alert className="max-w-md">
                            <InfoIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Info</AlertTitle>
                            <AlertDescription>This is an informational message.</AlertDescription>
                        </Alert>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Destructive</h3>
                    <ComponentPreview code={`<Alert variant="destructive">
  <XCircleIcon className="h-5 w-5" weight="fill" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>`}>
                        <Alert variant="destructive" className="max-w-md">
                            <XCircleIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                        </Alert>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Success</h3>
                    <ComponentPreview code={`<Alert variant="success">
  <CheckCircleIcon className="h-5 w-5" weight="fill" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>`}>
                        <Alert variant="success" className="max-w-md">
                            <CheckCircleIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Your changes have been saved.</AlertDescription>
                        </Alert>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Warning</h3>
                    <ComponentPreview code={`<Alert variant="warning">
  <WarningIcon className="h-5 w-5" weight="fill" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This action cannot be undone.</AlertDescription>
</Alert>`}>
                        <Alert variant="warning" className="max-w-md">
                            <WarningIcon className="h-5 w-5" weight="fill" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>This action cannot be undone.</AlertDescription>
                        </Alert>
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={alertProps} />
            </div>
        </div>
    )
}
