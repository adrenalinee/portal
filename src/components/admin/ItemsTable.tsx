'use client';

import { DataTable } from 'mantine-datatable';
import { ItemDtoSimple } from '@/types/api';
import {ActionIcon, Group, Anchor, Menu, rem, Text} from '@mantine/core';
import { IconEdit, IconTrash, IconDotsVertical } from '@tabler/icons-react';

interface ItemsTableProps {
    data: ItemDtoSimple[];
    fetching: boolean;
    totalRecords: number;
    page: number;
    pageSize: number;
    onPageChange: (p: number) => void;
    onRecordsPerPageChange: (s: number) => void;
    onEdit: (item: ItemDtoSimple) => void;
    onDelete: (item: ItemDtoSimple) => void;
}

export default function ItemsTable({
    data, fetching, totalRecords, page, pageSize,
    onPageChange, onRecordsPerPageChange, onEdit, onDelete
}: ItemsTableProps) {
    return (
        <DataTable
            withTableBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            idAccessor="itemId"
            records={data}
            columns={[
                { accessor: 'name', title: 'Name', sortable: true },
                {
                    accessor: 'representLink',
                    title: 'Link',
                    // width: 300,
                    render: (item) => (
                        <Anchor href={item.representLink} target="_blank" rel="noopener noreferrer" size="sm">
                            {item.representLink}
                        </Anchor>
                    )
                },
                // { accessor: 'version', title: 'Version', width: 100 },
                // {
                //     accessor: 'createdAt',
                //     title: 'Created At',
                //     // width: 200,
                //     render: (item) => new Date(item.createdAt).toLocaleString()
                // },
                {
                    accessor: 'description',
                    render: (item) => (
                        <Text
                            lineClamp={2} c="dimmed" size="sm"
                        >{item.description}</Text>
                    )
                },
                {
                    accessor: 'actions',
                    title: 'Actions',
                    width: 80,
                    textAlign: 'center',
                    render: (item) => (
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onDelete(item)}
                                >
                                    Delete
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ),
                },
            ]}
            totalRecords={totalRecords}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={onPageChange}
            onRecordsPerPageChange={onRecordsPerPageChange}
            recordsPerPageOptions={[10, 20, 50]}
            fetching={fetching}
        />
    );
}
