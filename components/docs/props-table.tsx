import { cn } from "@/lib/utils"

interface PropItem {
    name: string
    type: string
    defaultValue?: string
    description: string
    required?: boolean
}

interface PropsTableProps {
    data: PropItem[]
    className?: string
}

export function PropsTable({ data, className }: PropsTableProps) {
    return (
        <div className={cn("my-6 overflow-x-auto border-4 shadow-brutal", className)}>
            <table className="w-full text-left text-sm">
                <thead className="border-b-4 border-black bg-white">
                    <tr>
                        <th className="px-4 py-3 font-bold">Prop</th>
                        <th className="px-4 py-3 font-bold">Type</th>
                        <th className="px-4 py-3 font-bold">Default</th>
                        <th className="px-4 py-3 font-bold">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y-4 divide-black bg-white">
                    {data.map((prop) => (
                        <tr key={prop.name}>
                            <td className="whitespace-nowrap p-2 font-mono font-bold">
                                {prop.name}
                                {prop.required && <span className="ml-1 text-hot-pink">*</span>}
                            </td>
                            <td className="p-2 font-mono">
                                {prop.type}
                            </td>
                            <td className="p-2 font-mono">
                                {prop.defaultValue || "-"}
                            </td>
                            <td className="p-2">
                                {prop.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
