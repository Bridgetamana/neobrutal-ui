"use client"

import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"
import { ThemeProvider } from "@/components/globals/theme-provider"
import CommandSearch from "@/components/shared/command-search"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{
                SearchDialog: CommandSearch,
            }}
            theme={{
                enabled: false,
            }}
        >
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </RootProvider>
    )
}
