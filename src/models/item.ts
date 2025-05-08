import { Tag } from "@/models/tag";

export interface Item {
  itemId: string
  name: string
  faviconLink?: string
  description?: string

  representLink: string
  extraLinks: ExtraLink[]
  itemTags: ItemTag[]
  createAt: string
}

export interface ExtraLink {
  url: string
  name: string,
  description?: string
}

export interface ItemTag {
  tag: Tag
  createAt: string
}

export interface SearchItemSpec {
  keyword?: string
  sort?: string
  tagNames?: string[]

  tags?: string[]
}