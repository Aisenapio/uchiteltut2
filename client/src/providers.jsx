import { useEffect, useState } from "react"
import { ApolloProvider } from '@apollo/client/react';
import client from '@/graphql/apolloClient';
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
        <ApolloProvider client={client}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SearchProvider value={{ open, setOpen }}>{children}</SearchProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}
