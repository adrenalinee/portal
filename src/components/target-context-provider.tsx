'use client'

import { createContext, ReactNode } from "react";

export const TargetContext = createContext<boolean>(false)

export default function TargetContextProvider({
  children
}: {
  children: ReactNode
}) {
  return (
    <TargetContext.Provider value={false}>
      {children}
    </TargetContext.Provider>
  )
}