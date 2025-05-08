import { Group, Title } from "@mantine/core";
import Logo from "@/components/layout/logo";
import { appConfig } from "@/config/app-config";
import { ReactNode } from "react";

export default function PageHeader({
  organization,
  centerSection,
  leftSection,
}: {
  organization?: string
  centerSection?: ReactNode
  leftSection?: ReactNode
}) {
  return (
    <>
      <Group
        // className="bg-[var(--mantine-color-gray-light)] grow shadow-inner"
        justify="space-between" align="center" gap="xs" px="md" style={ {
          height: appConfig.headHeight
      } }>
        <Group>
          <Logo />
          <Title order={4} c="gray">{organization}</Title>
        </Group>
        {/*<ItemKeywordFilter searchKeyword={searchKeyword} />*/}
        {centerSection ?? <div />}
        {leftSection ?? <div />}
      </Group>
      {/*<Divider />*/}
    </>
  )
}