import { PagedContent } from "@/models/paged-content";
import { Item, SearchItemSpec } from "@/models/item";
import { appConfig } from "@/config/app-config";
import axios from "axios";

export async function searchItems(
  serverPhase: string,
  searchSpec: SearchItemSpec
): Promise<PagedContent<Item>> {
  const baseUrl = appConfig.apiBaseUrl[serverPhase]
  const res = await axios.get<PagedContent<Item>>(
    baseUrl + '/items', {
      params: searchSpec,
      paramsSerializer: { indexes: null }
    }
  )

  return res.data
}

export async function getItem(
  serverPhase: string,
  itemId: string
): Promise<Item> {
  const baseUrl = appConfig.apiBaseUrl[serverPhase]
  const res = await axios.get<Item>(
    baseUrl + '/items/' + itemId,
  )

  return res.data
}