import axios from 'axios';
import { appConfig } from '@/config/app-config';
import {
    ItemDto,
    ItemDtoSimple,
    ItemCreateSpec,
    ItemUpdateSpec,
    TagDto,
    TagCreateSpec,
    TagUpdateSpec,
    PageResponse,
    ItemSearchSpec,
    TagSearchSpec,
    Pageable
} from '@/types/api';

const BASE_URL = appConfig.apiBaseUrl['local']; // Defaulting to local for now, can be dynamic later

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Items API
export const itemsApi = {
    findAll: async (params: ItemSearchSpec) => {
        const { pageable, ...rest } = params;
        const response = await apiClient.get<PageResponse<ItemDtoSimple>>('/items', {
            params: {
                ...rest,
                'pageable.mode': pageable.mode,
                'pageable.number': pageable.number,
                'pageable.size': pageable.size,
                'pageable.sort': pageable.sort,
            },
        });
        return response.data;
    },

    getOne: async (itemId: string) => {
        const response = await apiClient.get<ItemDto>(`/items/${itemId}`);
        return response.data;
    },

    create: async (data: ItemCreateSpec) => {
        const response = await apiClient.post<ItemDto>('/items', data);
        return response.data;
    },

    update: async (itemId: string, data: ItemUpdateSpec) => {
        const response = await apiClient.patch<ItemDto>(`/items/${itemId}`, data);
        return response.data;
    },

    delete: async (itemId: string) => {
        await apiClient.delete(`/items/${itemId}`);
    },

    // Item Tags
    addTag: async (itemId: string, tagId: string) => {
        // The swagger says POST /items/{itemId}/tags with body ItemTagCreateSpec { tagId }
        const response = await apiClient.post(`/items/${itemId}/tags`, { tagId });
        return response.data;
    },

    getTags: async (itemId: string, pageable: Pageable) => {
        const response = await apiClient.get(`/items/${itemId}/tags`, { params: { pageable } });
        return response.data;
    }
};

// Tags API
export const tagsApi = {
    findAll: async (params: TagSearchSpec) => {
        const { pageable, ...rest } = params;
        const response = await apiClient.get<PageResponse<TagDto>>('/tags', {
            params: {
                ...rest,
                'pageable.mode': pageable.mode,
                'pageable.number': pageable.number,
                'pageable.size': pageable.size,
                'pageable.sort': pageable.sort,
            },
        });
        return response.data;
    },

    getOne: async (tagId: string) => {
        const response = await apiClient.get<TagDto>(`/tags/${tagId}`);
        return response.data;
    },

    create: async (data: TagCreateSpec) => {
        const response = await apiClient.post<TagDto>('/tags', data);
        return response.data;
    },

    update: async (tagId: string, data: TagUpdateSpec) => {
        const response = await apiClient.patch<TagDto>(`/tags/${tagId}`, data);
        return response.data;
    },

    delete: async (tagId: string) => {
        await apiClient.delete(`/tags/${tagId}`);
    }
};
