import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PACKAGE_MANAGERS, type PackageManager } from "./package-manager-options"
import { CodeBlock } from "./code-block"

interface InstallTabsProps {
    name: string
}

function getCliCommand(manager: PackageManager, name: string) {
    switch (manager) {
        case "pnpm":
            return `pnpm dlx neobrutal add ${name}`
        case "yarn":
            return `yarn dlx neobrutal add ${name}`
        case "bun":
            return `bunx neobrutal add ${name}`
        default:
            return `npx neobrutal add ${name}`
    }
}

export function InstallTabs({ name }: InstallTabsProps) {
    return (
        <div className="space-y-2">
            <Tabs defaultValue="npm" className="space-y-2">
                <TabsList aria-label="Installation package manager" className="w-full flex-wrap">
                    {PACKAGE_MANAGERS.map(({ value, label }) => (
                        <TabsTrigger key={value} value={value} className="px-2.5 py-1">
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {PACKAGE_MANAGERS.map(({ value }) => (
                    <TabsContent
                        key={value}
                        value={value}
                        className="mt-0 border-0 bg-transparent p-0 shadow-none"
                    >
                        <CodeBlock code={getCliCommand(value, name)} language="bash" />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
