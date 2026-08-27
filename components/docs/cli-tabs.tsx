import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PACKAGE_MANAGERS, type PackageManager } from "./package-manager-options"
import { CodeBlock } from "./code-block"

interface CliTabsProps {
    command: string
}

function getRunCommand(manager: PackageManager, command: string) {
    switch (manager) {
        case "pnpm":
            return `pnpm dlx neobrutal ${command}`
        case "yarn":
            return `yarn dlx neobrutal ${command}`
        case "bun":
            return `bunx neobrutal ${command}`
        default:
            return `npx neobrutal ${command}`
    }
}

export function CliTabs({ command }: CliTabsProps) {
    return (
        <div className="space-y-2">
            <Tabs defaultValue="npm" className="space-y-2">
                <TabsList aria-label="CLI package manager" className="w-full flex-wrap">
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
                        <CodeBlock code={getRunCommand(value, command)} language="bash" />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
