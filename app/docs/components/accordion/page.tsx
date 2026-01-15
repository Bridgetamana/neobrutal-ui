"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with Neobrutalist styling out of the box.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Animations are enabled by default.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const htmlCode = `<style>
  .shadow-brutal {
    box-shadow: 4px 4px 0px 0px #000000;
  }
</style>

<div class="w-full max-w-md space-y-4">
  <details class="group border-2 border-black bg-white shadow-brutal hover:bg-[#b6ace4]/20 open:bg-[#b6ace4]/20 open:shadow-brutal transition-colors duration-200">
    <summary class="flex cursor-pointer items-center justify-between p-3 font-bold text-black hover:bg-[#b6ace4]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset transition-colors duration-200 list-none [&::-webkit-details-marker]:hidden">
      Is it styled?
      <svg class="h-4 w-4 shrink-0 transition-transform duration-200 text-black group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>
    <div class="p-3 pt-0 text-sm">
      Yes. It comes with Neobrutalist styling out of the box.
    </div>
  </details>
  
  <details class="group border-2 border-black bg-white shadow-brutal hover:bg-[#b6ace4]/20 open:bg-[#b6ace4]/20 open:shadow-brutal transition-colors duration-200">
    <summary class="flex cursor-pointer items-center justify-between p-3 font-bold text-black hover:bg-[#b6ace4]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset transition-colors duration-200 list-none [&::-webkit-details-marker]:hidden">
      Is it animated?
      <svg class="h-4 w-4 shrink-0 transition-transform duration-200 text-black group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </summary>
    <div class="p-3 pt-0 text-sm">
      Yes. Animations are enabled by default.
    </div>
  </details>
</div>`

const accordionProps = [
  {
    name: "defaultValue",
    type: "any[]",
    description: "The uncontrolled value of the item(s) that should be initially expanded.",
  },
  {
    name: "value",
    type: "any[]",
    description: "The controlled value of the item(s) that should be expanded.",
  },
  {
    name: "onValueChange",
    type: "(value: any[], eventDetails) => void",
    description: "Event handler called when an accordion item is expanded or collapsed.",
  },
  {
    name: "hiddenUntilFound",
    type: "boolean",
    defaultValue: "false",
    description: "Allows the browser's built-in page search to find and expand the panel contents.",
  },
  {
    name: "loopFocus",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to loop keyboard focus back to the first item when the end is reached.",
  },
  {
    name: "multiple",
    type: "boolean",
    defaultValue: "false",
    description: "Whether multiple items can be open at the same time.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the component should ignore user interaction.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    defaultValue: '"vertical"',
    description: "The visual orientation of the accordion.",
  },
]

const accordionItemProps = [
  {
    name: "value",
    type: "any",
    description: "A unique value that identifies this accordion item.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean, eventDetails) => void",
    description: "Event handler called when the panel is opened or closed.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the component should ignore user interaction.",
  },
]

const accordionTriggerProps = [
  {
    name: "nativeButton",
    type: "boolean",
    defaultValue: "true",
    description: "Whether the component renders a native button element.",
  },
]

const accordionContentProps = [
  {
    name: "hiddenUntilFound",
    type: "boolean",
    defaultValue: "false",
    description: "Allows the browser's built-in page search to find and expand the panel contents.",
  },
  {
    name: "keepMounted",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to keep the element in the DOM while the panel is closed.",
  },
]

export default function AccordionPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold md:text-4xl text-black">Accordion</h1>
      </header>

      <section className="space-y-4">
        <p className="text-base text-black">
          A vertically stacked set of collapsible sections.
        </p>
      </section>      <ComponentPreview code={usageCode} htmlCode={htmlCode}>
        <Accordion className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with Neobrutalist styling out of the box.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. Animations are enabled by default.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Installation</h2>
        <CodeBlock code="npx neobrutal add accordion" language="bash" />
        <p className="text-base text-black">Or install the dependency and copy the code:</p>
        <CodeBlock code="npm install @base-ui/react" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Usage</h2>
        <CodeBlock code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`} />
        <CodeBlock code={`<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section Title</AccordionTrigger>
    <AccordionContent>
      Section content goes here.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Examples</h2>

        <div className="space-y-4">
          <h3 className="font-bold">Multiple</h3>
          <p className="text-base text-black">Allow multiple sections to be open at once.</p>
          <ComponentPreview code={`<Accordion multiple className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Section</AccordionTrigger>
    <AccordionContent>First content</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Section</AccordionTrigger>
    <AccordionContent>Second content</AccordionContent>
  </AccordionItem>
</Accordion>`}>
            <Accordion multiple className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>First Section</AccordionTrigger>
                <AccordionContent>First content</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Second Section</AccordionTrigger>
                <AccordionContent>Second content</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Default Open</h3>
          <p className="text-base text-black">Set a section to be open by default.</p>
          <ComponentPreview code={`<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Open by default</AccordionTrigger>
    <AccordionContent>This section starts open.</AccordionContent>
  </AccordionItem>
</Accordion>`}>
            <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>Open by default</AccordionTrigger>
                <AccordionContent>This section starts open.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Props</h2>
        <h3 className="text-lg font-bold">Accordion</h3>
        <PropsTable data={accordionProps} />
        <h3 className="text-lg font-bold">AccordionItem</h3>
        <PropsTable data={accordionItemProps} />
        <h3 className="text-lg font-bold">AccordionTrigger</h3>
        <PropsTable data={accordionTriggerProps} />
        <h3 className="text-lg font-bold">AccordionContent</h3>
        <PropsTable data={accordionContentProps} />
      </div>
    </div>
  )
}
