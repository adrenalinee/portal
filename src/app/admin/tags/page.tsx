'use client';

import { useState } from 'react';
import { useTags, useDeleteTag } from '@/hooks/use-tags';
import TagsTable from '@/components/admin/TagsTable';
import TagModal from '@/components/admin/TagModal';
import { Button, Container, Group, TextInput, Title } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { TagDto } from '@/types/api';

export default function TagsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword] = useDebouncedValue(keyword, 500);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedTag, setSelectedTag] = useState<TagDto | null>(null);

    const { data, isLoading } = useTags({
        name: debouncedKeyword || undefined,
        pageable: {
            mode: 'OFFSET',
            number: page - 1,
            size: pageSize,
            sort: ['createdAt,desc']
        }
    });

    const deleteMutation = useDeleteTag();

    const handleDelete = (tag: TagDto) => {
        if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
            deleteMutation.mutate(tag.tagId, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Tag deleted', color: 'green' });
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to delete tag', color: 'red' });
                }
            });
        }
    };

    const handleEdit = (tag: TagDto) => {
        setSelectedTag(tag);
        open();
    };

    const handleCreate = () => {
        setSelectedTag(null);
        open();
    };

    return (
        <Container fluid>
            <Group justify="space-between" mb="md">
                <Title order={3}>Tags Management</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>Create Tag</Button>
            </Group>

            <Group mb="md">
                <TextInput
                    placeholder="Search tags..."
                    leftSection={<IconSearch size={16} />}
                    value={keyword}
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                />
            </Group>

            <TagsTable
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
            <TagModal opened={opened} onClose={close} tag={selectedTag} />
        </Container>
    );
}
