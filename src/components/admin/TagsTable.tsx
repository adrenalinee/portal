'use client';

import { DataTable } from 'mantine-datatable';
import { TagDto } from '@/types/api';
import { ActionIcon, Group, Menu, rem } from '@mantine/core';
import { IconEdit, IconTrash, IconDotsVertical } from '@tabler/icons-react';

interface TagsTableProps {
    data: TagDto[];
    fetching: boolean;
    totalRecords: number;
    page: number;
    pageSize: number;
    onPageChange: (p: number) => void;
    onRecordsPerPageChange: (s: number) => void;
    onEdit: (tag: TagDto) => void;
    onDelete: (tag: TagDto) => void;
}

export default function TagsTable({
    data, fetching, totalRecords, page, pageSize,
    onPageChange, onRecordsPerPageChange, onEdit, onDelete
}: TagsTableProps) {
    return (
        <DataTable
            withTableBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            idAccessor="tagId"
            records={data}
            columns={[
                { accessor: 'name', title: 'Name', sortable: true },
                { accessor: 'description', title: 'Description' },
                {
                    accessor: 'createdAt',
                    title: 'Created At',
                    width: 200,
                    render: (tag) => new Date(tag.createdAt).toLocaleString()
                },
                {
                    accessor: 'actions',
                    title: 'Actions',
                    width: 80,
                    textAlign: 'center',
                    render: (tag) => (
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onEdit(tag)}
                                >
                                    Edit
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onDelete(tag)}
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
