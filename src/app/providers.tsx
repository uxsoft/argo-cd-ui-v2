'use client'

import { Provider as JotaiProvider } from 'jotai'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <JotaiProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </JotaiProvider>
    )
}