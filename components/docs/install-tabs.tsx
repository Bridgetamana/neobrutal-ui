import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./code-block"

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface InstallTabsProps {
    name: string
}

const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

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
        <div className="space-y-4">
            <Tabs defaultValue="npm" className="space-y-3">
                <TabsList className="w-full flex-wrap">
                    {PACKAGE_MANAGERS.map((manager) => (
                        <TabsTrigger key={manager} value={manager} className="capitalize">
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
                        <CodeBlock code={getCliCommand(manager, name)} language="bash" />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
