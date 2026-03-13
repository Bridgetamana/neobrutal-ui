import { cn } from "@/lib/utils"

interface PropItem {
    name: string
    type: string
    defaultValue?: string
    description: string
    required?: boolean
}

interface PropsTableProps {
    data?: PropItem[]
    className?: string
}

export function PropsTable({ data, className }: PropsTableProps) {
    const rows = Array.isArray(data) ? data : []

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
                    {rows.map((prop) => (
                        <tr key={prop.name}>
                            <td className="p-2">
                                {prop.name}
                                {prop.required && <span className="ml-1 text-hot-pink">*</span>}
                            </td>
                            <td className="p-2">
                                {prop.type}
                            </td>
                            <td className="p-2">
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
