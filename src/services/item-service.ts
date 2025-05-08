import { Item, SearchItemSpec } from "@/models/item";
import { getItemsData } from "@/datas/item-data";
import { Tag } from "@/models/tag";


export function getItems(searchDto: SearchItemSpec): Item[] {
  const searchKeyword = searchDto.keyword
  const searchTagNames = searchDto.tags ?? []
  const sort = searchDto.sort

  const items = getItemsData()
  return items
    .filter(item => {
      if (searchKeyword == undefined) {
        return true
      }

      return item.name.toLowerCase().match(searchKeyword.toLowerCase())
    })
    .filter(item => {
      if (searchTagNames.length <= 0) {
        return true
      }

      return searchTagNames
        .filter(searchTagName => {
          if (searchTagName.trim() === '') {
            return true
          }
          return item.itemTags.find(tag => tag.name === searchTagName)
        })
        .length == searchTagNames.length
    })
    .sort((a, b) => {
      if (sort === 'name-desc') {
        return b.name.localeCompare(a.name)
      } else if (sort === 'name-asc') {
        return a.name.localeCompare(b.name)
      }

      return 0
    })
}

export function getItemTags(): Tag[] {
  return extractTags(getItems({}))
}


export function extractTags(items: Item[]): Tag[] {
  const rawTags = items.flatMap((item: Item) => item.itemTags)

  const tagsMap = new Map<string, {
    tag: Tag,
    count: number
  }>()

  rawTags.forEach((tag) => {
    if (! tagsMap.has(tag.name)) {
      tagsMap.set(tag.name, {
        tag: tag,
        count: 0
      })
    }

    tagsMap.set(tag.name, {
      tag: tag,
      count: (tagsMap.get(tag.name)?.count?? 0) + 1
    })
  })

  return Array.from(tagsMap.values())
    .sort((a, b) => b.count - a.count)
    .map((tagInfo) => tagInfo.tag)
}