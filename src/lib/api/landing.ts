// src/lib/api/landing.ts

import {apiClient} from '../axios';
import {LandingDataApiResponse, ProductApiResponse, ProductData} from "@/model";

export const getLandingData = async (): Promise<LandingDataApiResponse> => {
    // apiClient вже обробить мережеві помилки
    const response = await apiClient.get<LandingDataApiResponse>('page/main/get_data');

    if (!response.data || !response.data.banners) { // `banners` як приклад ключового поля
        throw new Error('Failed to fetch landing page data or data is malformed');
    }
    return response.data;
};

export const getProductWithBonus = async (): Promise<ProductData[]> => {
    const response = await apiClient.post<ProductApiResponse>('product/get_product', {
        has_gift: true,
    });

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to fetch products with bonus');
    }

    return response.data.data;
};