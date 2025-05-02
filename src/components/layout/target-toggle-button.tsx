'use client'

import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

export default function TargetToggleButton({

}) {
  return (
    <ActionIcon
      color="gray"
      variant="light"
      size="input-xs"
      aria-label="Toggle link target"
    >
      <IconExternalLink />
    </ActionIcon>
  )
}