'use client'

import {
  ActionIcon, Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Collapse,
  Grid,
  Group,
  Highlight,
  HoverCard,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { Item } from "@/models/item";
import { IconArrowRight, IconCircleDashedCheck, IconSelector } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { TargetContext } from "@/components/target-context-provider";

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
            {/*<Text lineClamp={2}>{item.name}</Text>*/}
            {/*<Highlight highlight={searchKeyword}>{item.name}</Highlight>*/}
            <Highlight highlight={searchKeyword}>{item.name}</Highlight>
          </Group>
          {item.extraLinks.length > 0 ?
            <Tooltip label="링크 더보기" withArrow={true}>
              <ActionIcon
                c="gray"
                variant={opened ? 'light': 'subtle'}
                onClick={toggle}
              ><IconSelector /></ActionIcon>
            </Tooltip>:
            undefined
          }
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
              href={item.repLinkUrl}
              target={targetContext ? '_blank': ''}
              className="grow"
            >go</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {item.repLinkUrl}
          </HoverCard.Dropdown>
        </HoverCard>
        <Collapse
          in={opened}
          transitionDuration={0}
        >
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
          </Stack>
        </Collapse>
        <Group>
          {item.tags.map((tag, index) => (
            <Badge key={index} color="gray" size="xs">{tag.name}</Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  )
}