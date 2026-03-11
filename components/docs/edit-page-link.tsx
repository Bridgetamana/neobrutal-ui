import Link from "next/link"

interface EditPageLinkProps {
    editPath: string
}

export function EditPageLink({ editPath }: EditPageLinkProps) {
    const githubUrl = `https://github.com/Bridgetamana/neobrutal-ui/blob/main/${editPath}`

    return (
        <Link
            href={githubUrl}
            target="_blank"
            className="mt-2 text-sm font-semibold underline"
        >
            Edit this page on GitHub
        </Link>
    )
}