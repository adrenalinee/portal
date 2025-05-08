'use client'

import {
  ActionIcon, Alert,
  Avatar,
  Badge,
  Button,
  Card, Center,
  Collapse, Container,
  Grid,
  Group,
  Highlight,
  HoverCard, Loader,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { Item } from "@/models/item";
import { IconArrowRight, IconCircleDashedCheck, IconSelector } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { TargetContext } from "@/components/target-context-provider";
import { ServerPhaseContext } from "@/components/server-phase-context-provider";
import { useQuery } from "@tanstack/react-query";
import { getItem, searchItems } from "@/services/item-service2";

export function ItemCardGrid({
  items,
  searchKeyword
}: {
  items: Item[]
  searchKeyword: string
}) {
  return (
    <Grid>
      {items.length > 0 ?
        items.map((item, index) => (
          <Grid.Col
            key={index}
            span={{ base: 12, sm: 6, md: 4 }}
          >
            <ItemCard item={item} searchKeyword={searchKeyword} />
          </Grid.Col>
        )):
        <Grid.Col span={12} >
          <Group justify="center">
            <IconCircleDashedCheck color="gray" />
            <Text c="gray">No Data</Text>
          </Group>
        </Grid.Col>
      }
    </Grid>
  )
}


function ItemCard({
  item,
  searchKeyword
}: {
  item: Item
  searchKeyword: string
}) {
  const [opened, { toggle }] = useDisclosure(false)
  const targetContext = useContext(TargetContext)

  return (
    <Card
      p="xs"
      withBorder={true}
      className="hover:shadow-lg"
    >
      <Stack>
        <Group wrap="nowrap" justify="space-between">
          <Group wrap="nowrap">
            <Avatar
              src={item.faviconLink}
              name={item.name}
              color="initials"
            />
            <Highlight highlight={searchKeyword}>{item.name}</Highlight>
          </Group>
          <Tooltip label="링크 더보기" withArrow={true}>
            <ActionIcon
              c="gray"
              variant={opened ? 'light': 'subtle'}
              onClick={toggle}
            ><IconSelector /></ActionIcon>
          </Tooltip>
        </Group>
        <Text lineClamp={2} c="gray" size="sm">{item.description}</Text>
        <HoverCard
          shadow="md" withArrow={true} position="right"
          offset={2}
          closeDelay={0}
        >
          <HoverCard.Target>
            <Button
              size="xs"
              justify="space-between"
              leftSection={<></>}
              rightSection={<IconArrowRight color="gray" />}
              component="a"
              href={item.representLink}
              target={targetContext ? '_blank': ''}
              className="grow"
            >go</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {item.representLink}
          </HoverCard.Dropdown>
        </HoverCard>
        {opened ? <ItemDetail itemId={item.itemId} /> : undefined}
      </Stack>
    </Card>
  )
}

function ItemDetail({
  itemId
}: {
  itemId: string
}) {
  const targetContext = useContext(TargetContext)

  const serverPhase = useContext(ServerPhaseContext)
  const itemsData = useQuery({
    queryKey: [serverPhase, "items", itemId],
    queryFn: () => getItem(serverPhase, itemId)
  });

  if (itemsData.isPending) {
    return (
        <Center>
          <Loader type="dots" />
        </Center>
    )
  }

  if (itemsData.isError) {
    return (
        <Center>
          <Stack>
            <p>데이터 로딩중 에러 발생</p>
            <p>{itemsData.error.message}</p>
          </Stack>
        </Center>
    )
  }

  const item = itemsData.data

  return (
    <Stack justify="center">
      {item.extraLinks.length <= 0 ?
        <Group justify="center">
          <Text c="gray" size="sm">nothing more ...</Text>
        </Group>:
        undefined
      }
      {item.extraLinks.map((link, index) => (
        <HoverCard
          key={index}
          shadow="md" withArrow={true}
          position="right"
          offset={2}
          closeDelay={0}
        >
          <HoverCard.Target>
            <Button
              size="xs"
              variant="default"
              justify="space-between"
              leftSection={<></>}
              rightSection={<IconArrowRight color="gray" />}
              component="a"
              href={link.url ?? ''}
              target={targetContext ? '_blank': ''}
            >go {link.name}</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown className="max-w-1/2">
            <Stack>
              {link.url}
              {link.description != undefined ?
                <Alert>
                  <Text c="gray" size="sm">{link.description}</Text>
                </Alert>:
                undefined
              }
            </Stack>
          </HoverCard.Dropdown>
        </HoverCard>
      ))}
      <Group>
        {item.itemTags
          .map(itemTag => itemTag.tag)
          .map((tag, index) => (
            <Badge key={index} color="gray" size="xs">{tag.name}</Badge>
        ))}
      </Group>
    </Stack>
  )
}