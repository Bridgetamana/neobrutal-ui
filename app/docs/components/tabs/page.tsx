"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`

const tabsProps = [
    {
        name: "defaultValue",
        type: "string | number",
        description: "The default active tab value when uncontrolled.",
    },
    {
        name: "value",
        type: "string | number",
        description: "The controlled active tab value.",
    },
    {
        name: "onValueChange",
        type: "(value: string | number) => void",
        description: "Event handler called when the active tab changes.",
    },
]

const tabsTriggerProps = [
    {
        name: "value",
        type: "string | number",
        description: "The unique value that associates the trigger with a panel.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the tab.",
    },
]

const tabsContentProps = [
    {
        name: "value",
        type: "string | number",
        description: "The unique value that associates the panel with a trigger.",
    },
    {
        name: "keepMounted",
        type: "boolean",
        description: "When true, keeps the panel mounted in the DOM when inactive.",
    },
]

export default function TabsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Tabs</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Organizes content into multiple sections with tabbed navigation.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add tabs" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">Tabs</h3>
                <PropsTable data={tabsProps} />
                <h3 className="font-bold mt-4">TabsTrigger</h3>
                <PropsTable data={tabsTriggerProps} />
                <h3 className="font-bold mt-4">TabsContent</h3>
                <PropsTable data={tabsContentProps} />
            </div>
        </div>
    )
}
