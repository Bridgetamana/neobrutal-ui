"use client"

import * as React from "react"
import { Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `const [activeTab, setActiveTab] = React.useState("account")

<div className="w-[400px]">
  <Tabs>
    <TabsTrigger isActive={activeTab === "account"} onClick={() => setActiveTab("account")}>
      Account
    </TabsTrigger>
    <TabsTrigger isActive={activeTab === "password"} onClick={() => setActiveTab("password")}>
      Password
    </TabsTrigger>
  </Tabs>
  <TabsContent isActive={activeTab === "account"} className="mt-4 p-4 border-2 border-black bg-white shadow-brutal">
    Make changes to your account here.
  </TabsContent>
  <TabsContent isActive={activeTab === "password"} className="mt-4 p-4 border-2 border-black bg-white shadow-brutal">
    Change your password here.
  </TabsContent>
</div>`

export default function TabsPage() {
    const [activeTab, setActiveTab] = React.useState("account")

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Tabs</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A set of layered sections of content—known as tab panels—that are displayed one at a time.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <div className="w-[400px]">
                    <Tabs>
                        <TabsTrigger isActive={activeTab === "account"} onClick={() => setActiveTab("account")}>
                            Account
                        </TabsTrigger>
                        <TabsTrigger isActive={activeTab === "password"} onClick={() => setActiveTab("password")}>
                            Password
                        </TabsTrigger>
                    </Tabs>
                    <TabsContent isActive={activeTab === "account"} className="mt-4 p-4 border-2 border-black bg-white shadow-brutal">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent isActive={activeTab === "password"} className="mt-4 p-4 border-2 border-black bg-white shadow-brutal">
                        Change your password here.
                    </TabsContent>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add tabs" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"`} />
                <CodeBlock code={usageCode} />
            </div>
        </div>
    )
}
