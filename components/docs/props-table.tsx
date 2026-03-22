import { cn } from "@/lib/utils"

export function PropsTable({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("my-6 overflow-x-auto border-2 rounded bg-white", className)}>
            <table className="w-full text-left text-sm">
                <thead className="border-b-2">
                    <tr>
                        <th className="p-2 font-semibold">Prop</th>
                        <th className="p-2 font-semibold">Type</th>
                        <th className="p-2 font-semibold">Default</th>
                        <th className="p-2 font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                    {children}
                </tbody>
            </table>
        </div>
    )
}

interface PropsRowProps {
    name: string
    type: string
    defaultValue?: string
    required?: boolean
    children?: React.ReactNode
}

export function PropsRow({ name, type, defaultValue, required, children }: PropsRowProps) {
    return (
        <tr>
            <td className="p-2">
                {name}
                {required && <span className="ml-1 text-hot-pink">*</span>}
            </td>
            <td className="p-2">
                {type}
            </td>
            <td className="p-2">
                {defaultValue || "-"}
            </td>
            <td className="p-2">
                {children}
            </td>
        </tr>
    )
}
