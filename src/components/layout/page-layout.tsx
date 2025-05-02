'use client'

import { ReactNode } from "react";
import { AppShell } from "@mantine/core";

export default function PageLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <AppShell
      layout="alt"
      // header={{ height: { base: appConfig.headHeight} }}
      padding=""
      className="flex flex-row"
    >
      <AppShell.Main className="grow">
        {children}
      </AppShell.Main>
    </AppShell>
  )
}