"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Dialog>
  <DialogTrigger render={<Button variant="neutral" />}>
    Open Dialog
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`

const dialogProps = [
    {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the dialog.",
    },
    {
        name: "defaultOpen",
        type: "boolean",
        description: "The default open state when uncontrolled.",
    },
    {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Event handler called when the open state changes.",
    },
    {
        name: "modal",
        type: "boolean",
        description: "The modality of the dialog. When set to true, interaction with outside elements will be disabled.",
    },
]

export default function DialogPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Dialog</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Dialog>
                    <DialogTrigger render={<Button variant="neutral" />}>
                        Open Dialog
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add dialog" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">Dialog</h3>
                <PropsTable data={dialogProps} />
            </div>
        </div>
    )
}
