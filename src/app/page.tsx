import PageLayout from "@/components/layout/page-layout";
import PageHeader from "@/components/layout/page-header";
import ItemSearch from "@/components/item-search";
import ItemKeywordFilter from "@/components/item-keyword-filter";
import SearchButton from "@/components/search-button";
import ThemeToggleButton from "@/components/layout/theme-toggle-button";
import { ActionIcon, Group } from "@mantine/core";
import { IconBrandGithub, IconSettings } from "@tabler/icons-react";
import Link from "next/link";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{
    /**
     * keyword
     */
    k?: string

    /**
     * tag
     */
    t?: string | string[],

    /**
     * layout
     * available: grid | list
     * default: grid
     */
    l?: string,

    /**
     * sort
     * available: name-asc | name-desc
     */
    s?: string,
  }>
}) {
  const searchKeyword = (await searchParams).k ?? ''
  const searchTagNames = (await searchParams).t ?? []
  const layout = (await searchParams).l ?? 'grid'
  const sort = (await searchParams).s

  let finalSearchTagNames: string[]
  if (typeof searchTagNames === 'string') {
    finalSearchTagNames = [searchTagNames]
  } else {
    finalSearchTagNames = searchTagNames
  }

  const commands = <Group>
    {/*<ItemKeywordFilter searchKeyword={searchKeyword} />*/}
    <SearchButton searchKeyword={searchKeyword} />
    <ThemeToggleButton />
    {/*<ActionIcon*/}
    {/*  color="gray"*/}
    {/*  size="input-xs"*/}
    {/*  variant="light"*/}
    {/*  component="a"*/}
    {/*  href="/"*/}
    {/*// target="_blank"*/}
    {/*><IconBrandGithub /></ActionIcon>*/}
    <ActionIcon
      color="gray"
      size="input-xs"
      variant="light"
      component={Link}
      href="/admin"
    ><IconSettings /></ActionIcon>
  </Group>

  return (
    <PageLayout>
      <PageHeader
        centerSection={<ItemKeywordFilter searchKeyword={searchKeyword} />}
        leftSection={commands}
      />
      <ItemSearch
        searchKeyword={searchKeyword}
        searchTagNames={finalSearchTagNames}
        layout={layout}
        sort={sort}
      />
    </PageLayout>
  )
}
