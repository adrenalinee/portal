'use client'

import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import SearchInput from "@/components/search-input";


export default function ItemKeywordFilter({
  searchKeyword
}: {
  searchKeyword?: string
}) {
  const breakPoint =  useMediaQuery('(max-width: 36em', true)

  return (
    <Box hidden={breakPoint} className="items-center">
      <SearchInput searchKeyword={searchKeyword} />
    </Box>
  )
}