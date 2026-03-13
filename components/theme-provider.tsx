"use client"

import * as React from "react"

interface ColorTheme {
    name: string
    main: string
    bg: string
}

const colorThemes: ColorTheme[] = [
    { name: "Lavender", main: "#b6ace4", bg: "#f0eefc" },
    { name: "Mint", main: "#97ee88", bg: "#eefbec" },
    { name: "Peach", main: "#eeaa88", bg: "#fcf3ee" },
    { name: "Sky", main: "#88c5ee", bg: "#eef6fc" },
    { name: "Rose", main: "#ee88b8", bg: "#fceeef" },
    { name: "Lemon", main: "#fed170", bg: "#fffbf0" },
    { name: "Coral", main: "#ee8888", bg: "#fcefef" },
    { name: "Aqua", main: "#88eed8", bg: "#eefcf9" },
]

interface ThemeContextValue {
    currentTheme: ColorTheme
    setTheme: (theme: ColorTheme) => void
    themes: ColorTheme[]
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function useTheme() {
    const context = React.useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

interface ThemeProviderProps {
    children: React.ReactNode
}

function applyTheme(theme: ColorTheme) {
    document.documentElement.style.setProperty("--main", theme.main)
    document.documentElement.style.setProperty("--bg", theme.bg)
}

function getStoredTheme(): ColorTheme {
    if (typeof window === "undefined") return colorThemes[0]
    try {
        const stored = localStorage.getItem("neobrutal-theme")
        if (stored) {
            const parsed = JSON.parse(stored) as ColorTheme
            const match = colorThemes.find(t => t.name === parsed.name)
            if (match) return match
        }
    } catch { /* ignore */ }
    return colorThemes[0]
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = React.useState<ColorTheme>(getStoredTheme)

    function setTheme(theme: ColorTheme) {
        setCurrentTheme(theme)
        applyTheme(theme)
        try {
            localStorage.setItem("neobrutal-theme", JSON.stringify(theme))
        } catch { /* ignore */ }
    }

    React.useEffect(() => {
        applyTheme(currentTheme)
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themes: colorThemes }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, useTheme, colorThemes }
export type { ColorTheme }
