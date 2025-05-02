'use client'

import { Item } from "@/models/item";
import { DataTable } from "mantine-datatable";
import { Avatar, Badge, Button, Group, Highlight, HoverCard, Text } from "@mantine/core";
import { IconArrowRight, IconCircleDashedCheck } from "@tabler/icons-react";
import { useContext } from "react";
import { TargetContext } from "@/components/target-context-provider";


export default function ItemDataTable({
  items,
  searchKeyword
}: {
  items: Item[]
  searchKeyword: string
}) {
  const targetContext = useContext(TargetContext)

  if ((items?? []).length == 0) {
    return (
      <Group justify="center">
        <IconCircleDashedCheck color="gray" />
        <Text c="gray">No Data</Text>
      </Group>
    )
  }

  return (
    <DataTable
      idAccessor="name"
      noHeader={true}
      withTableBorder={true}
      className="hover:shadow-lg"
      borderRadius="lg"
      records={items}
      columns={[
        {
          accessor: 'favicon',
          render: (item) => (
            <Avatar
              src={item.faviconLink}
              name={item.name}
              color="initials"
            />
          )
        },
        {
          accessor: 'name',
          render: (item) => (
            // <Text lineClamp={2}>{item.name}</Text>
            <Highlight highlight={searchKeyword}>{item.name}</Highlight>
          )
        },
        {
          accessor: 'description',
          render: (item) => (
            <Text c="gray" size="sm" lineClamp={2}>{item.description}</Text>
          )
        },
        {
          accessor: 'link',
          render: (item) => (
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
          )
        },
        {
          accessor: 'tags',
          render: (item) => (
            <Group gap="2">
              {item.tags.map((tag, index) => (
                <Badge key={index} color="gray" size="xs">{tag.name}</Badge>
              ))}
            </Group>
          )
        }
      ]}
    />
  )
}