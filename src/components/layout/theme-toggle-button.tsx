'use client'

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";


export default function ThemeToggleButton() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <ActionIcon
      color="gray"
      variant="light"
      size="input-xs"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ?
        <IconMoon /> :
        <IconSun />
      }
    </ActionIcon>
  )
}