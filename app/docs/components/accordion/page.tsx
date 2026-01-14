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

const htmlCode = `<div class="w-full max-w-md">
  <details class="group border-2 border-black bg-white open:bg-[#88aaee]/30 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <summary class="flex cursor-pointer items-center justify-between p-4 font-bold hover:underline list-none [&::-webkit-details-marker]:hidden">
      Is it styled?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 transition-transform duration-200 group-open:rotate-180">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </summary>
    <div class="p-4 pt-0 border-t-2 border-black text-sm">
      Yes. It comes with Neobrutalist styling out of the box.
    </div>
  </details>
  
  <details class="group border-2 border-black bg-white open:bg-[#88aaee]/30 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <summary class="flex cursor-pointer items-center justify-between p-4 font-bold hover:underline list-none [&::-webkit-details-marker]:hidden">
      Is it animated?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 transition-transform duration-200 group-open:rotate-180">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </summary>
    <div class="p-4 pt-0 border-t-2 border-black text-sm">
      Yes. Animations are enabled by default.
    </div>
  </details>
</div>`

const accordionProps = [
  {
    name: "type",
    type: '"single" | "multiple"',
    defaultValue: '"single"',
    description: "Determines whether one or multiple items can be opened at the same time.",
  },
  {
    name: "collapsible",
    type: "boolean",
    defaultValue: "false",
    description: "When type is 'single', allows closing the content when clicking the trigger for an open item.",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "The value of the item(s) to expand by default.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "The controlled value of the item(s) to expand.",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Event handler called when the expanded state changes.",
  },
]

const accordionItemProps = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "A unique value for the item.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the item.",
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
      </div>
    </div>
  )
}
