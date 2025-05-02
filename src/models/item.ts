
export interface Item {
  // id: number
  name: string
  faviconLink?: string
  description?: string
  repLinkUrl: string,
  extraLinks: Link[]
  tags: Tag[]
}

export interface Link {
  url: string
  name: string,
  description?: string
}

export interface Tag {
  name: string
  description?: string
}

export interface SearchItemDto {
  keyword?: string
  tags?: string[]
  sort?: string
}