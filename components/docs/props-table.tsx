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
        <div className={cn("my-6 overflow-x-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", className)}>
            <table className="w-full text-left text-sm">
                <thead className="border-b-4 border-black bg-white">
                    <tr>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider">Prop</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider">Default</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y-4 divide-black bg-white">
                    {data.map((prop) => (
                        <tr key={prop.name} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-4 py-3 font-mono font-bold">
                                {prop.name}
                                {prop.required && <span className="ml-1 text-red-500">*</span>}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-blue-600">
                                {prop.type}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-gray-500">
                                {prop.defaultValue || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                                {prop.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
