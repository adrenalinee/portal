'use client'

import { Center, Chip, Flex, Loader, Stack, Title, Tooltip } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchTags } from "@/services/tag-service";
import { useContext } from "react";
import { ServerPhaseContext } from "@/components/server-phase-context-provider";
import { Tag } from "@/models/tag";


export default function ItemTagFilter({
  searchTagNames,
}: {
  searchTagNames: string[]
}) {
  const serverPhase = useContext(ServerPhaseContext)
  const itemTagsData = useQuery({
    queryKey: [serverPhase, "tags"],
    queryFn: () => searchTags(serverPhase)
  });

  if (itemTagsData.isPending) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (itemTagsData.isError) {
    return (
      <Center>
        <Stack>
          <p>데이터 로딩중 에러 발생</p>
          <p>{itemTagsData.error.message}</p>
        </Stack>
      </Center>
    )
  }

  const allTags = itemTagsData.data.content

  return (
    <ItemTagFilterInner
      searchTagNames={searchTagNames}
      allTags={allTags}
    />
  )
}

function ItemTagFilterInner({
  searchTagNames,
  allTags,
}: {
  searchTagNames: string[]
  allTags: Tag[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Stack>
      <Title order={5}>Tags Filter</Title>
      <Flex
        direction="row"
        wrap="wrap"
        columnGap="5"
        rowGap="3"
      >
        {allTags.map((tag, index) => (
          <Tooltip
            key={index}
            label={tag.description}
            withArrow={true}
            refProp="rootRef"
          >
            <Chip
              size="xs"
              value={tag.name}
              checked={searchTagNames.find(searchTagName => searchTagName === tag.name) != undefined}
              onClick={(e) => {
                const tagName = e.currentTarget.value
                const params = new URLSearchParams(searchParams)

                if (e.currentTarget.checked) {
                  params.append('t', tagName)

                } else {
                  params.delete('t', tagName)
                }

                router.replace(pathname + '?' + params.toString())
              }}
            >{tag.name}</Chip>
          </Tooltip>
        ))}
      </Flex>
    </Stack>
  )
}