import { appConfig } from "@/config/app-config";
import axios from "axios";
import { PagedContent } from "@/models/paged-content";
import { Tag } from "@/models/tag";

export async function searchTags(
  serverPhase: string
): Promise<PagedContent<Tag>> {
  const baseUrl = appConfig.apiBaseUrl[serverPhase]
  const res = await axios.get<PagedContent<Tag>>(
    baseUrl + '/tags'
  )

  return res.data
}