"use client"

import { Slider } from "@/components/ui/slider"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const sliderCode = `"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
    React.ComponentRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track
            className="relative h-4 w-full grow overflow-hidden rounded-full border-2 border-border bg-white"
        >
            <SliderPrimitive.Range className="absolute h-full bg-main" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
            className="block h-6 w-6 rounded-full border-2 border-border bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }`

export default function SliderPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Slider</h1>
                <p className="text-xl text-neutral-600">
                    A range input component for selecting values along a continuous range.
                </p>
            </div>

            <ComponentPreview code={sliderCode}>
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="text-sm font-bold">Volume</label>
                        <Slider defaultValue={[50]} min={0} max={100} step={1} />
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Thick track:</strong> 4px height with 2px border</li>
                    <li><strong>Square thumb:</strong> Actually rounded square for brutalist look</li>
                    <li><strong>Touch support:</strong> Works on mobile with touch</li>
                    <li><strong>Range fill:</strong> Accent color shows selected range</li>
                    <li><strong>Radix UI:</strong> Built on accessible slider primitive</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Examples</h2>
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-bold block mb-2">Default (0-100)</label>
                        <Slider defaultValue={[30]} min={0} max={100} />
                    </div>
                    <div>
                        <label className="text-sm font-bold block mb-2">Price Range (0-1000)</label>
                        <Slider defaultValue={[250]} min={0} max={1000} step={50} />
                    </div>
                    <div>
                        <label className="text-sm font-bold block mb-2">With Step (0-10, step 1)</label>
                        <Slider defaultValue={[5]} min={0} max={10} step={1} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Props</h2>
                <CodeBlock code={`// Common props
<Slider
  defaultValue={[50]}        // Initial value
  min={0}                    // Minimum value
  max={100}                  // Maximum value
  step={1}                   // Increment step
  disabled={false}           // Disable slider
/>`} language="tsx" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Keyboard support:</strong> Arrow keys to adjust value</li>
                    <li><strong>Focus ring:</strong> Clear 2px black ring when focused</li>
                    <li><strong>Label:</strong> Use with label element for context</li>
                    <li><strong>ARIA attributes:</strong> aria-label, aria-valuemin, aria-valuemax automatically set</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Install Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-slider" language="bash" />
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/slider.tsx</code>:</p>
                <CodeBlock code={sliderCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  const [value, setValue] = React.useState([50])
  
  return (
    <div className="space-y-4">
      <label className="text-sm font-bold">Value: {value[0]}</label>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}`} />
            </div>
        </div>
    )
}
