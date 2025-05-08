import { unstable_noStore as noStore } from "next/cache"

export const appConfig = {
  title: "portal",
  description: "portal 입니다.",
  headHeight: "56px",
  sidebarWidth: 260,
  serverPhases: [
    'local'
  ],
  apiBaseUrl: {
    local: 'http://localhost:8080'
  } as AnyStringType,
}

export interface AnyStringType {
  [key: string]: string;
}

export function getInitServerPhase(): string {
  noStore();
  return process.env.SERVER_PHASE ?? "local"
}