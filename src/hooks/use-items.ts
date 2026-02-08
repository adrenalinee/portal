import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsApi } from '@/lib/api';
import { ItemSearchSpec, ItemCreateSpec, ItemUpdateSpec, Pageable } from '@/types/api';

export const useItems = (params: ItemSearchSpec) => {
    return useQuery({
        queryKey: ['items', params],
        queryFn: () => itemsApi.findAll(params),
    });
};

export const useItem = (itemId: string) => {
    return useQuery({
        queryKey: ['item', itemId],
        queryFn: () => itemsApi.getOne(itemId),
        enabled: !!itemId,
    });
};

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ItemCreateSpec) => itemsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ itemId, data }: { itemId: string; data: ItemUpdateSpec }) => itemsApi.update(itemId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            queryClient.invalidateQueries({ queryKey: ['item', variables.itemId] });
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemId: string) => itemsApi.delete(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useAddItemTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ itemId, tagId }: { itemId: string, tagId: string }) => itemsApi.addTag(itemId, tagId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['item', variables.itemId] });
        }
    })
}

export const useItemTags = (itemId: string, pageable: Pageable) => {
    return useQuery({
        queryKey: ['item-tags', itemId, pageable],
        queryFn: () => itemsApi.getTags(itemId, pageable),
        enabled: !!itemId
    });
}
