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

const htmlCode = `<input type="checkbox" id="dialogToggle" class="hidden" />

<label for="dialogToggle" class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-white text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
  Open Dialog
</label>

<label for="dialogToggle" class="hidden peer-checked:block fixed inset-0 z-50 bg-black opacity-80" style="display: none;"></label>

<style>
  #dialogToggle:checked ~ label:last-of-type {
    display: block !important;
  }
  
  #dialogToggle:checked ~ .dialog-popup {
    display: grid !important;
  }
</style>

<div class="dialog-popup hidden fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <label for="dialogToggle" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white cursor-pointer">
    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </label>
  <h2 class="text-lg font-semibold leading-none tracking-tight">Are you absolutely sure?</h2>
  <p class="text-sm text-black">
    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
  </p>
</div>`

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

const triggerProps = [
    {
        name: "id",
        type: "string",
        description: "Unique identifier for the trigger when using multiple triggers.",
    },
    {
        name: "render",
        type: "ReactElement | function",
        description: "Custom element to render as the trigger.",
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

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
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
                
                <h3 className="font-bold mt-6">DialogTrigger</h3>
                <PropsTable data={triggerProps} />
            </div>
        </div>
    )
}
