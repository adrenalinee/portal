'use client';

import { useState } from 'react';
import { useItems, useDeleteItem } from '@/hooks/use-items';
import ItemsTable from '@/components/admin/ItemsTable';
import ItemModal from '@/components/admin/ItemModal';
import { Button, Container, Group, TextInput, Title } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ItemDtoSimple } from '@/types/api';

export default function ItemsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword] = useDebouncedValue(keyword, 500);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState<ItemDtoSimple | null>(null);

    const { data, isLoading } = useItems({
        keyword: debouncedKeyword || undefined,
        pageable: {
            mode: 'OFFSET',
            number: page - 1,
            size: pageSize,
            sort: ['createdAt,desc']
        }
    });

    const deleteMutation = useDeleteItem();

    const handleDelete = (item: ItemDtoSimple) => {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            deleteMutation.mutate(item.itemId, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Item deleted', color: 'green' });
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to delete item', color: 'red' });
                }
            });
        }
    };

    const handleEdit = (item: ItemDtoSimple) => {
        setSelectedItem(item);
        open();
    };

    const handleCreate = () => {
        setSelectedItem(null);
        open();
    };

    return (
        <Container fluid>
            <Group justify="space-between" mb="md">
                <Title order={3}>Items Management</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>Create Item</Button>
            </Group>

            <Group mb="md">
                <TextInput
                    placeholder="Search by keyword..."
                    leftSection={<IconSearch size={16} />}
                    value={keyword}
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                />
            </Group>

            <ItemsTable
                data={data?.content || []}
                fetching={isLoading}
                totalRecords={data?.totalSize || 0}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onRecordsPerPageChange={setPageSize}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <ItemModal opened={opened} onClose={close} item={selectedItem} />
        </Container>
    );
}
