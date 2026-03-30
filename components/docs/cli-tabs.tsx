import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./code-block"

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface CliTabsProps {
    command: string
}

const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

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
                <TabsList className="w-full flex-wrap">
                    {PACKAGE_MANAGERS.map((manager) => (
                        <TabsTrigger key={manager} value={manager} className="capitalize px-2.5 py-1">
                            {manager}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {PACKAGE_MANAGERS.map((manager) => (
                    <TabsContent
                        key={manager}
                        value={manager}
                        className="mt-0 border-0 bg-transparent p-0 shadow-none"
                    >
                        <CodeBlock code={getRunCommand(manager, command)} language="bash" />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
