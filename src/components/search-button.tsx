'use client'

import { ActionIcon, Modal, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SearchInput from "@/components/search-input";


export default function SearchButton({
  searchKeyword,
}: {
  searchKeyword?: string
}) {
  const breakPoint =  useMediaQuery('(max-width: 36em', true)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        color="gray"
        size="input-xs"
        variant="light"
        hidden={!breakPoint}
        onClick={open}
      ><IconSearch /></ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        title="Search"
      >
        <Stack gap="lg">
          <Text>검색어를 입력하세요.</Text>
          <SearchInput
            searchKeyword={searchKeyword}
            onFinish={close}
          />
        </Stack>
      </Modal>
    </>
  )
}
