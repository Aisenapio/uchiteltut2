import { ApolloProvider } from '@apollo/client/react';
import client from '@/graphql/apolloClient';
import { ThemeProvider } from "@/components/theme-provider"


export function Providers({ children }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ApolloProvider>
    )
}
