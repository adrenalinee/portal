export interface Pageable {
  mode?: 'CURSOR_NEXT' | 'CURSOR_PREVIOUS' | 'OFFSET';
  number?: number;
  size?: number;
  sort?: string[];
}

export interface Sort {
  orderBy: SortOrder[];
}

export interface SortOrder {
  ascending: boolean;
  direction: 'ASC' | 'DESC';
  ignoreCase?: boolean;
  property: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: Pageable;
  pageNumber: number;
  offset: number;
  size: number;
  empty: boolean;
  numberOfElements: number;
  totalSize: number;
  totalPages: number;
}

export interface ItemDto {
  itemId: string;
  organizationId: string;
  name: string;
  representLink: string;
  faviconLink?: string | null;
  description?: string | null;
  extraLinks: ItemExtraLinkDto[];
  itemTags: ItemTagDto[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ItemDtoSimple {
  itemId: string;
  organizationId: string;
  name: string;
  representLink: string;
  faviconLink?: string | null;
  description?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ItemExtraLinkDto {
  name: string;
  url: string;
  description?: string | null;
}

export interface ItemTagDto {
  tag: TagDto;
  createdAt: string;
}

export interface TagDto {
  tagId: string;
  organizationId: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItemCreateSpec {
  name: string;
  representLink: string;
  faviconLink?: string | null;
  description?: string | null;
  extraLinks?: ItemExtraLinkCreateSpec[] | null;
}

export interface ItemUpdateSpec {
  name?: string | null;
  representLink?: string | null;
  faviconLink?: string | null;
  description?: string | null;
  links?: ItemExtraLinkCreateSpec[] | null;
}

export interface ItemExtraLinkCreateSpec {
  name: string;
  url: string;
  description?: string | null;
}

export interface TagCreateSpec {
  name: string;
  description?: string | null;
}

export interface TagUpdateSpec {
  name?: string | null;
  description?: string | null;
}

export interface ItemSearchSpec {
  keyword?: string | null;
  itemId?: string | null;
  name?: string | null;
  url?: string | null;
  tagNames?: string[] | null;
  tagIds?: string[] | null;
  pageable: Pageable;
}

export interface TagSearchSpec {
  tagId?: string | null;
  name?: string | null;
  pageable: Pageable;
}
