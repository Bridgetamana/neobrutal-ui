export const PACKAGE_MANAGERS = [
    { value: "npm", label: "npm" },
    { value: "pnpm", label: "pnpm" },
    { value: "yarn", label: "Yarn" },
    { value: "bun", label: "Bun" },
] as const

export type PackageManager = (typeof PACKAGE_MANAGERS)[number]["value"]
