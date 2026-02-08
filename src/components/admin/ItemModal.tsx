'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Modal, TextInput, Textarea, Button, Group, LoadingOverlay } from '@mantine/core';
import { useCreateItem, useUpdateItem } from '@/hooks/use-items';
import { ItemDtoSimple, ItemCreateSpec } from '@/types/api';
import { notifications } from '@mantine/notifications';

interface ItemModalProps {
    opened: boolean;
    onClose: () => void;
    item?: ItemDtoSimple | null;
}

export default function ItemModal({ opened, onClose, item }: ItemModalProps) {
    const createMutation = useCreateItem();
    const updateMutation = useUpdateItem();

    const isEditing = !!item;
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const form = useForm({
        initialValues: {
            name: '',
            representLink: '',
            faviconLink: '',
            description: '',
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
            representLink: (value) => (value.length < 2 ? 'Link is required' : null),
        },
    });

    useEffect(() => {
        if (item) {
            form.setValues({
                name: item.name,
                representLink: item.representLink,
                faviconLink: item.faviconLink || '',
                description: item.description || '',
            });
        } else {
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, opened]);

    const handleSubmit = (values: typeof form.values) => {
        const payload = {
            name: values.name,
            representLink: values.representLink,
            faviconLink: values.faviconLink || null,
            description: values.description || null,
        };

        if (isEditing && item) {
            updateMutation.mutate({ itemId: item.itemId, data: payload }, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Item updated', color: 'green' });
                    onClose();
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to update item', color: 'red' });
                }
            });
        } else {
            createMutation.mutate(payload as ItemCreateSpec, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Item created', color: 'green' });
                    onClose();
                    form.reset();
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to create item', color: 'red' });
                }
            });
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={isEditing ? 'Edit Item' : 'Create Item'}>
            <LoadingOverlay visible={isLoading} />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Item Name"
                    {...form.getInputProps('name')}
                    mb="sm"
                />
                <TextInput
                    withAsterisk
                    label="Represent Link"
                    placeholder="https://example.com"
                    {...form.getInputProps('representLink')}
                    mb="sm"
                />
                <TextInput
                    label="Favicon Link"
                    placeholder="https://example.com/favicon.ico"
                    {...form.getInputProps('faviconLink')}
                    mb="sm"
                />
                <Textarea
                    label="Description"
                    placeholder="Description"
                    {...form.getInputProps('description')}
                    mb="md"
                />

                <Group justify="flex-end">
                    <Button variant="default" onClick={onClose}>Cancel</Button>
                    <Button type="submit" loading={isLoading}>{isEditing ? 'Update' : 'Create'}</Button>
                </Group>
            </form>
        </Modal>
    );
}
