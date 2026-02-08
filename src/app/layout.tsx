import "./globals.css"
import '@mantine/notifications/styles.css';
import Head from "next/head"
import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from "@mantine/core"

import { themeOverride } from "@/app/theme"
import { ReactNode } from "react"
import { Metadata } from "next";
import { DefaultQueryClientProvider } from "@/components/default-query-client-provider";
import { Notifications } from '@mantine/notifications';
import TargetContextProvider from "@/components/target-context-provider";

const theme = createTheme(themeOverride)

export const metadata: Metadata = {
  title: "Portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html {...mantineHtmlProps} suppressHydrationWarning style={{
      overflowY: 'scroll'
    }}>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications />
          <DefaultQueryClientProvider>
            <TargetContextProvider>
              {children}
            </TargetContextProvider>
          </DefaultQueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
