// src/lib/api/products.ts
import {apiClient} from '../axios';
import {ProductApiResponse} from "@/model";

interface GetProductsParams {
    page?: number;
}

export const getProducts = async (params?: GetProductsParams): Promise<ProductApiResponse> => {
    const endpoint = params?.page ? `product/get_product?page=${params.page}` : 'product/get_product';

    const response = await apiClient.post<ProductApiResponse>(endpoint, params);

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to fetch products');
    }

    return response.data;
};