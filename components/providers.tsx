"use client"

import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"
import { ThemeProvider } from "@/components/theme-provider"
import CommandSearch from "@/components/command-search"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{
                SearchDialog: CommandSearch,
            }}
        >
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </RootProvider>
    )
}
