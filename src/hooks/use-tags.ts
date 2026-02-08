import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsApi } from '@/lib/api';
import { TagSearchSpec, TagCreateSpec, TagUpdateSpec } from '@/types/api';

export const useTags = (params: TagSearchSpec) => {
    return useQuery({
        queryKey: ['tags', params],
        queryFn: () => tagsApi.findAll(params),
    });
};

export const useTag = (tagId: string) => {
    return useQuery({
        queryKey: ['tag', tagId],
        queryFn: () => tagsApi.getOne(tagId),
        enabled: !!tagId,
    });
};

export const useCreateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TagCreateSpec) => tagsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });
};

export const useUpdateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ tagId, data }: { tagId: string; data: TagUpdateSpec }) => tagsApi.update(tagId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            queryClient.invalidateQueries({ queryKey: ['tag', variables.tagId] });
        },
    });
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tagId: string) => tagsApi.delete(tagId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });
};
