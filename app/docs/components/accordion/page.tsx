"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const accordionCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const accordionHtmlCode = `<!-- 
  Interactive Accordion using native <details>/<summary> elements.
  No JavaScript required - works out of the box!
-->
<div class="w-full max-w-md">
  <!-- Accordion Item 1 -->
  <details class="group mb-4 border-2 border-black bg-white open:bg-[#88aaee]/30 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <summary class="flex cursor-pointer items-center justify-between p-4 font-bold hover:underline list-none [&::-webkit-details-marker]:hidden">
      Is it accessible?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 transition-transform duration-200 group-open:rotate-180">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </summary>
    <div class="p-4 pt-0 border-t-2 border-black text-sm">
      Yes. It adheres to the WAI-ARIA design pattern.
    </div>
  </details>

  <!-- Accordion Item 2 -->
  <details class="group mb-4 border-2 border-black bg-white open:bg-[#88aaee]/30 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <summary class="flex cursor-pointer items-center justify-between p-4 font-bold hover:underline list-none [&::-webkit-details-marker]:hidden">
      Is it styled?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 transition-transform duration-200 group-open:rotate-180">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </summary>
    <div class="p-4 pt-0 border-t-2 border-black text-sm">
      Yes. It comes with default styles that matches the other components' aesthetic.
    </div>
  </details>

  <!-- Accordion Item 3 -->
  <details class="group mb-4 border-2 border-black bg-white open:bg-[#88aaee]/30 open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <summary class="flex cursor-pointer items-center justify-between p-4 font-bold hover:underline list-none [&::-webkit-details-marker]:hidden">
      Is it animated?
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="shrink-0 transition-transform duration-200 group-open:rotate-180">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </summary>
    <div class="p-4 pt-0 border-t-2 border-black text-sm">
      Yes. It's animated by default, but you can disable it if you prefer.
    </div>
  </details>
</div>`

export default function AccordionPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-medium">Accordion</h1>
                <p className="text-black/90">
                    A vertically stacked set of interactive headings that each reveal a section of content.
                </p>
            </div>

            <ComponentPreview code={accordionCode} htmlCode={accordionHtmlCode}>
                <Accordion type="single" collapsible className="w-full max-w-[400px]">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Installation</h2>
                <div className="space-y-4">
                    <p>1. Install the Radix UI primitive:</p>
                    <CodeBlock code="npm install @radix-ui/react-accordion" language="bash" />

                    <p>2. Copy the source code into <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/accordion.tsx</code>:</p>
                    <CodeBlock code={accordionCode} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Usage</h2>
                <CodeBlock code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Examples</h2>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Multiple Items Open</h3>
                    <p className="text-black/90">Allow multiple items to be open at the same time.</p>
                    <ComponentPreview code={`<Accordion type="multiple" className="w-full max-w-[400px]">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>`}>
                        <Accordion type="multiple" className="w-full max-w-[400px]">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Item 1</AccordionTrigger>
                                <AccordionContent>
                                    Content 1
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Item 2</AccordionTrigger>
                                <AccordionContent>
                                    Content 2
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
