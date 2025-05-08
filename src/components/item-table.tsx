import { Item } from "@/models/item";
import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  Center,
  Group, Highlight,
  HoverCard,
  Loader,
  Paper,
  Stack,
  Table,
  Text,
  Tooltip
} from "@mantine/core";
import { IconArrowRight, IconSelector } from "@tabler/icons-react";
import { useContext } from "react";
import { TargetContext } from "@/components/target-context-provider";
import { useDisclosure } from "@mantine/hooks";
import { ServerPhaseContext } from "@/components/server-phase-context-provider";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/services/item-service2";


export default function ItemTable({
  items,
  searchKeyword
}: {
  items: Item[]
  searchKeyword: string
}) {
  const targetContext = useContext(TargetContext)

  return (
    <Paper
      withBorder={true}
      className="hover:shadow-lg"
    >
      <Table>
        <Table.Tbody>
          {items.map((item) => (
            <ItemTableRow
              key={item.itemId}
              item={item}
              searchKeyword={searchKeyword}
              openExternal={targetContext}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  )
}

function ItemTableRow({
  item,
  searchKeyword,
  openExternal
}: {
  item: Item
  searchKeyword: string
  openExternal: boolean
}) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <>
      <Table.Tr>
        <Table.Td>
          <Avatar
            src={item.faviconLink}
            name={item.name}
            color="initials"
          />
        </Table.Td>
        <Table.Td>
          <Group>
            <Highlight highlight={searchKeyword}>{item.name}</Highlight>
            {/*<Tooltip label="링크 더보기" withArrow={true}>*/}
            {/*  <ActionIcon*/}
            {/*    c="gray"*/}
            {/*    variant={opened ? 'light': 'subtle'}*/}
            {/*    onClick={toggle}*/}
            {/*  ><IconSelector /></ActionIcon>*/}
            {/*</Tooltip>*/}
          </Group>
        </Table.Td>
        <Table.Td>
          <Tooltip label="링크 더보기" withArrow={true}>
            <ActionIcon
              c="gray"
              variant={opened ? 'light': 'subtle'}
              onClick={toggle}
            ><IconSelector /></ActionIcon>
          </Tooltip>
        </Table.Td>
        <Table.Td>
          <Text c="gray" size="sm" lineClamp={2}>{item.description}</Text>
        </Table.Td>
        <Table.Td>
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
                target={openExternal ? '_blank': ''}
                className="grow"
              >go</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              {item.representLink}
            </HoverCard.Dropdown>
          </HoverCard>
        </Table.Td>
      </Table.Tr>
      {opened ?
        <ItemDetailRow itemId={item.itemId} openExternal={openExternal} />:
        undefined
      }
    </>
  )
}

function ItemDetailRow({
  itemId,
  openExternal
}: {
  itemId: string
  openExternal: boolean
}) {
  const serverPhase = useContext(ServerPhaseContext)
  const itemsData = useQuery({
    queryKey: [serverPhase, "items", itemId],
    queryFn: () => getItem(serverPhase, itemId)
  });

  if (itemsData.isPending) {
    return (
      <Table.Tr>
        <Table.Td colSpan={5}>
          <Center>
            <Loader type="dots" />
          </Center>
        </Table.Td>
      </Table.Tr>
    )
  }

  if (itemsData.isError) {
    return (
      <Table.Tr>
        <Table.Td colSpan={5}>
          <Center>
            <Stack>
              <p>데이터 로딩중 에러 발생</p>
              <p>{itemsData.error.message}</p>
            </Stack>
          </Center>
        </Table.Td>
      </Table.Tr>
    )
  }

  const item = itemsData.data

  return (
    <Table.Tr
      className="shadow-inner"
    >
      <Table.Td colSpan={5}>
        <Stack>
          {item.extraLinks.length <= 0 ?
            <Group justify="center">
              <Text c="gray" size="sm">nothing more ...</Text>
            </Group>:
            undefined
          }

          <Group>
            {item.extraLinks.map((link, index) => (
              <HoverCard
                key={index}
                shadow="md" withArrow={true}
                // position="right"
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
                    target={openExternal ? '_blank': ''}
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
          </Group>

          <Group>
            {item.itemTags
              .map(itemTag => itemTag.tag)
              .map((tag, index) => (
                <Badge key={index} color="gray" size="xs">{tag.name}</Badge>
              ))}
          </Group>
        </Stack>
      </Table.Td>
    </Table.Tr>
  )
}