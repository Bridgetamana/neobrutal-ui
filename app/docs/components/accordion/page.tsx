"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
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

export default function AccordionPage() {
  return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Accordion</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A vertically stacked set of collapsible sections.
                </p>
            </section>      <ComponentPreview code={usageCode} htmlCode={htmlCode}>
        <Accordion type="single" collapsible className="w-full max-w-md">
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
        <CodeBlock code="npx neobrutal-ui add accordion" language="bash" />
        <p className="text-base text-black">Or install the dependency and copy the code:</p>
        <CodeBlock code="npm install @radix-ui/react-accordion" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Usage</h2>
        <CodeBlock code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`} />
        <CodeBlock code={`<Accordion type="single" collapsible>
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
          <ComponentPreview code={`<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Section</AccordionTrigger>
    <AccordionContent>First content</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Section</AccordionTrigger>
    <AccordionContent>Second content</AccordionContent>
  </AccordionItem>
</Accordion>`}>
            <Accordion type="multiple" className="w-full max-w-md">
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
          <ComponentPreview code={`<Accordion type="single" defaultValue="item-1" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Open by default</AccordionTrigger>
    <AccordionContent>This section starts open.</AccordionContent>
  </AccordionItem>
</Accordion>`}>
            <Accordion type="single" defaultValue="item-1" collapsible className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>Open by default</AccordionTrigger>
                <AccordionContent>This section starts open.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>
      </div>
    </div>
  )
}
