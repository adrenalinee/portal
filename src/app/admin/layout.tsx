'use client';

import {AppShell, Group, NavLink} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {IconDatabase, IconTags} from '@tabler/icons-react';
import Logo from "@/components/layout/logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const pathname = usePathname();

    return (
        <AppShell
            header={{ height: 52 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Logo />
                    {/*<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
                    {/*<Anchor component={Link} href="/" underline="never" c="inherit">*/}
                    {/*    <Text fw={700}>Portal Admin</Text>*/}
                    {/*</Anchor>*/}
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="xs">
                <NavLink
                    component={Link}
                    href="/admin/items"
                    label="Items"
                    leftSection={<IconDatabase size={16} />}
                    active={pathname.startsWith('/admin/items')}
                />
                <NavLink
                    component={Link}
                    href="/admin/tags"
                    label="Tags"
                    leftSection={<IconTags size={16} />}
                    active={pathname.startsWith('/admin/tags')}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
