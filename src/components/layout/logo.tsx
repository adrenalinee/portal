'use client'

import { ActionIcon, Group, Title } from "@mantine/core"
import Link from "next/link"
import { ReactNode } from "react"
import { IconInnerShadowBottom } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";


export default function Logo({
  rightSection
}: {
  rightSection?: ReactNode
}) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <Group gap="3" align="center">
      <Link href="/">
        <ActionIcon
          color="initials"
          size="input-xs"
          variant={opened ? 'light': 'gradient'}
          className="transition duration-1000"
          onClick={toggle}
        ><IconInnerShadowBottom /></ActionIcon>
      </Link>

      <Link href="/">
        <Group align="center">
          <Title order={3}>Portal</Title>
          <Title order={4} c="gray"></Title>
        </Group>
      </Link>
      {rightSection !== undefined ? rightSection : undefined}
    </Group>
  )
}
