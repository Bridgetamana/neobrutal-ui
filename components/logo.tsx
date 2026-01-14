import Image from "next/image"

export function Logo() {
    return (
        <div className="flex items-center gap-1">
            <Image src="/neobrutalui-logo.svg" alt="Neobrutalism UI Logo" width={24} height={24} />
            <span className="text-lg md:text-xl font-bold">Neobrutal UI</span>
        </div>
    )
}