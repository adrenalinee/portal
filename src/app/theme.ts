"use client"

/** Custom theme */
import {
  ActionIcon,
  Alert,
  Badge,
  Button, Container,
  DEFAULT_THEME,
  Group,
  Input,
  type MantineBreakpointsValues,
  type MantineThemeColors,
  MantineThemeOverride,
  Modal,
  Paper, rem,
  Stack,
  Table
} from "@mantine/core"
import localFont from 'next/font/local'

export const colors: MantineThemeColors = DEFAULT_THEME.colors;
export const breakpoints: MantineBreakpointsValues = DEFAULT_THEME.breakpoints;

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/notoSansKorea.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/notoSansKorea.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--my-font'
})

const myFontMonospace = localFont({
  src: [
    {
      path: '../../public/fonts/Orbit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

const CONTAINER_SIZES: Record<string, number> = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 800,
  xl: 1000,
  xxl: 1200,
}

export const themeOverride = {
  breakpoints,
  colors,
  scale: 1.1,
  defaultRadius: "lg",
  // primaryColor: 'blue',
  primaryColor: 'dark',
  autoContrast: true,
  fontFamily: myFont.style.fontFamily,
  fontFamilyMonospace: myFontMonospace.style.fontFamily,
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled'
      }
    }),
    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        size: "md",
      },
    }),
    Stack: Stack.extend({
      defaultProps: {
        gap: 'xs'
      }
    }),
    Group: Group.extend({
      defaultProps: {
        gap: 'xs'
      }
    }),
    Alert: Alert.extend({
      defaultProps: {
        color: 'yellow',
        variant: 'light',
        p: 'xs'
      }
    }),
    Button: Button.extend({
      defaultProps: {
        // color: 'violet',
        // c: 'yellow',
        // variant: 'default',
        variant: 'light',
        // variant: 'subtle',
        size: 'sm',
        gradient: { from: 'grape', to: 'violet', deg: 135 }
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        size: 'input-sm',
        variant: 'subtle',
        gradient: { from: 'grape', to: 'violet', deg: 135 }
      }
    }),
    Badge: Badge.extend({
      defaultProps: {
        // color: 'dark',
        variant: 'light',
      }
    }),
    Paper: Paper.extend({
      defaultProps: {
        className: 'overflow-hidden'
      }
    }),
    Modal: Modal.extend({
      defaultProps: {
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        }
      }
    }),
    Table: Table.extend({
      defaultProps: {

      }

    }),
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
} as MantineThemeOverride