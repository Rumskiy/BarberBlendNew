// src/lib/api/wishlist.ts
import {apiClient} from '../axios';
import {GetLikeApiResponse} from "@/model";

export const getWishlist = async (): Promise<GetLikeApiResponse> => {
    // guest_token буде додано автоматично
    const response = await apiClient.post<GetLikeApiResponse>('product/favorite/get', {});

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to fetch wishlist');
    }

    return response.data;
};

export const addToWishlist = async (productId: number): Promise<any> => {
    const response = await apiClient.post<any>('product/favorite/append', {product_id: productId});

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to add item to wishlist');
    }

    return response.data;
};

export const removeFromWishlist = async (productId: number): Promise<any> => {
    const response = await apiClient.post<any>('product/favorite/delete', {product_id: productId});

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to remove item from wishlist');
    }

    return response.data;
};