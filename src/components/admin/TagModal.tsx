'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Modal, TextInput, Textarea, Button, Group, LoadingOverlay } from '@mantine/core';
import { useCreateTag, useUpdateTag } from '@/hooks/use-tags';
import { TagDto, TagCreateSpec } from '@/types/api';
import { notifications } from '@mantine/notifications';

interface TagModalProps {
    opened: boolean;
    onClose: () => void;
    tag?: TagDto | null;
}

export default function TagModal({ opened, onClose, tag }: TagModalProps) {
    const createMutation = useCreateTag();
    const updateMutation = useUpdateTag();

    const isEditing = !!tag;
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
        },
    });

    useEffect(() => {
        if (tag) {
            form.setValues({
                name: tag.name,
                description: tag.description || '',
            });
        } else {
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag, opened]);

    const handleSubmit = (values: typeof form.values) => {
        const payload = {
            name: values.name,
            description: values.description || null,
        };

        if (isEditing && tag) {
            updateMutation.mutate({ tagId: tag.tagId, data: payload }, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Tag updated', color: 'green' });
                    onClose();
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to update tag', color: 'red' });
                }
            });
        } else {
            createMutation.mutate(payload as TagCreateSpec, {
                onSuccess: () => {
                    notifications.show({ title: 'Success', message: 'Tag created', color: 'green' });
                    onClose();
                    form.reset();
                },
                onError: () => {
                    notifications.show({ title: 'Error', message: 'Failed to create tag', color: 'red' });
                }
            });
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={isEditing ? 'Edit Tag' : 'Create Tag'}>
            <LoadingOverlay visible={isLoading} />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Tag Name"
                    {...form.getInputProps('name')}
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
