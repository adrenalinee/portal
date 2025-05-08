

export interface PagedContent<T> {
  content: T[]
  page: Page
}

export interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export function emptyPagedContent<T>(): PagedContent<T> {
  return {
    content: [],
    page: {
      size: 0,
      number: 0,
      totalElements: 0,
      totalPages: 0
    }
  }
}