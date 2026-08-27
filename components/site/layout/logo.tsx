import Image from "next/image"

export function Logo() {
    return (
        <div className="flex items-center gap-1">
            <Image
                src="/neobrutalui-logo.svg"
                alt=""
                width={25}
                height={24}
                className="h-6 w-auto"
                priority
            />
            <span className="text-lg lg:text-xl font-semibold">Neobrutal UI</span>
        </div>
    )
}
