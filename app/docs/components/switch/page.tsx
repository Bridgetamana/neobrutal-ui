"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const switchCode = `"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
    React.ComponentRef<typeof SwitchPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=unchecked]:bg-bw",
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitive.Thumb
            className={cn(
                "pointer-events-none block h-4 w-4 rounded-full border-2 border-border bg-white shadow-none ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
            )}
        />
    </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }`

export default function SwitchPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Switch</h1>
                <p className="text-xl text-neutral-600">
                    A toggle switch component for boolean on/off states. Perfect for preferences and settings.
                </p>
            </div>

            <ComponentPreview code={switchCode}>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="switch-1" />
                        <Label htmlFor="switch-1">Off</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="switch-2" defaultChecked />
                        <Label htmlFor="switch-2">On</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="switch-3" disabled />
                        <Label htmlFor="switch-3">Disabled</Label>
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>Smooth animation:</strong> Sliding thumb with transition</li>
                    <li><strong>Clear states:</strong> Color change indicates on/off</li>
                    <li><strong>Border design:</strong> 2px borders on both track and thumb</li>
                    <li><strong>Radix UI:</strong> Built on accessible switch primitive</li>
                    <li><strong>Circular thumb:</strong> Smooth, easy-to-identify toggle</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">States</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="off" />
                        <Label htmlFor="off">Off (White track)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="on" defaultChecked />
                        <Label htmlFor="on">On (Accent track)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="disabled" disabled />
                        <Label htmlFor="disabled">Disabled (Reduced opacity)</Label>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>WAI-ARIA:</strong> Full Radix UI accessibility compliance</li>
                    <li><strong>Keyboard support:</strong> Space/Enter to toggle, Tab to navigate</li>
                    <li><strong>Labels:</strong> Always pair with &lt;Label&gt; using htmlFor</li>
                    <li><strong>Focus ring:</strong> Clear 2px black ring for keyboard users</li>
                    <li><strong>Screen readers:</strong> Announces &quot;switch&quot; role and state</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Use Cases</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li>Dark mode toggle</li>
                    <li>Feature flags and settings</li>
                    <li>Notifications preferences</li>
                    <li>On/off controls for system features</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-neutral-600 mb-2">Install Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-switch" language="bash" />
                <p className="text-neutral-600 mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/switch.tsx</code>:</p>
                <CodeBlock code={switchCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(false)
  
  return (
    <div className="flex items-center space-x-2">
      <Switch id="feature" checked={enabled} onCheckedChange={setEnabled} />
      <Label htmlFor="feature">Enable feature</Label>
    </div>
  )
}`} />
            </div>
        </div>
    )
}
