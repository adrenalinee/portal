'use client'

import {
  ActionIcon,
  Alert,
  Center,
  ComboboxItem,
  Container,
  Divider,
  Grid,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { ItemCardGrid } from "@/components/item-card-grid";
import ItemTagFilter from "@/components/item-tag-filter";
import { Item, SearchItemSpec } from "@/models/item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ItemDataTable from "@/components/item-data-table";
import { useQuery } from "@tanstack/react-query";
import classes from "@/app/globals.module.css";
import { useContext, useState } from "react";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { ServerPhaseContext } from "@/components/server-phase-context-provider";
import { searchItems } from "@/services/item-service2";


export default function ItemSearch({
  searchKeyword,
  searchTagNames,
  layout,
  sort
}: {
  searchKeyword: string
  searchTagNames: string[]
  layout: string
  sort?: string
}) {
  return (
    <>
      <Container p="xs">
        <Grid>
          <Grid.Col span={12} py="0">
            <Alert>
              <Text c="gray" size="sm" lineClamp={1}>키워드와 태그 검색으로 원하는 곳으로 빠르게 이동하세요!</Text>
            </Alert>
          </Grid.Col>
          <Grid.Col span={{
            base: 12,
            xs: 3
          }}>
            <ItemTagFilter searchTagNames={searchTagNames} />
          </Grid.Col>
          <Grid.Col span={{
            base: 12,
            xs: 9
          }}>
            <ItemsView
              searchKeyword={searchKeyword}
              searchTagNames={searchTagNames}
              layout={layout}
              sort={sort}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

function ItemsView({
  searchKeyword,
  searchTagNames,
  layout,
  sort
}: {
  searchKeyword: string
  searchTagNames: string[]
  layout: string
  sort?: string
}) {
  const searchDto = {
    keyword: searchKeyword,
    // tags: searchTagNames,
    tagNames: searchTagNames,
    sort: sort
  } as SearchItemSpec

  const serverPhase = useContext(ServerPhaseContext)
  const itemsData = useQuery({
    queryKey: [serverPhase, "items", searchDto],
    queryFn: () => searchItems(serverPhase, searchDto)
  });

  if (itemsData.isPending) {
    return (
      <Container p="xs">
        <Center>
          <Loader />
        </Center>
      </Container>
    )
  }

  if (itemsData.isError) {
    return (
      <Container p="xs">
        <Center>
          <Stack>
            <p>데이터 로딩중 에러 발생</p>
            <p>{itemsData.error.message}</p>
          </Stack>
        </Center>
      </Container>
    )
  }

  const filteredItems = itemsData.data.content

  return (
    <Stack>
      <ItemCardHeader items={filteredItems} layout={layout} sort={sort} />
      {layout === 'list' ?
        <ItemDataTable items={filteredItems} searchKeyword={searchKeyword} />:
        <ItemCardGrid items={filteredItems} searchKeyword={searchKeyword} />
      }
    </Stack>
  )
}

function ItemCardHeader({
  items,
  layout,
  sort
}: {
  items: Item[]
  layout: string
  sort?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [value, setValue] = useState<ComboboxItem | null>(null)

  return (
    <Group justify="space-between">
      <Text c="gray" size="sm">검색된 항목 갯수: {items.length}</Text>
      <Group>
        <Text c="gray" size="sm">Sort by</Text>
        <Tooltip label="정렬방식" withArrow={true}>
          <Select
            classNames={classes}
            size="xs"
            radius="md"
            w={150}
            data={[
              {value: '', label: '등록순'},
              {value: 'name-asc', label: '이름 오름차순'},
              {value: 'name-desc', label: '이름 내림차순'}
            ]}
            value={value ? value.value : sort ? sort : ''}
            onChange={(_value, option) => {
              setValue(option)

              const params = new URLSearchParams(searchParams)
              if (_value === '' || _value === null) {
                params.delete('s')
                router.replace(pathname + '?' + params.toString())
              } else {
                params.set('s', _value)
                router.replace(pathname + '?' + params.toString())
              }
            }}
          />
        </Tooltip>

        <Divider orientation="vertical" />

        <Group gap="5" >
          <Tooltip label="그리드 보기" withArrow={true}>
            <ActionIcon
              className="hover:shadow-lg"
              size="md"
              radius="md"
              // c="gray"
              color="gray"
              variant={layout !== 'list' ? 'filled' : 'subtle'}
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.delete('l')
                router.replace(pathname + '?' + params.toString())
              }}
            ><IconLayoutGrid /></ActionIcon>
          </Tooltip>
          <Tooltip label="리스트 보기" withArrow={true}>
            <ActionIcon
              className="hover:shadow-lg"
              size="md"
              radius="md"
              // c="gray"
              color="gray"
              variant={layout === 'list' ? 'filled' : 'subtle'}
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.set('l', 'list')
                router.replace(pathname + '?' + params.toString())
              }}
            ><IconLayoutList /></ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Group>
  )
}