import { useEffect, useState } from "react"
import SearchProvider from "@/components/search-provider"
import { ThemeProvider } from "@/components/theme-provider"


export function Providers({ children }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SearchProvider value={{ open, setOpen }}>{children}</SearchProvider>
        </ThemeProvider>
    )
}
