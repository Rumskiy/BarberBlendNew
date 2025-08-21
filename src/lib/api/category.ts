// src/lib/api/category.ts

import {CategoriesApiResponse, Category, ProductApiResponse, ProductData} from '@/model';
import { apiClient } from '../axios';

export const getAllCategory = async (): Promise<Category[]> => {
    // Axios автоматично обробить помилки мережі (4xx, 5xx) і викине виняток.
    // Наш інтерсептор в axios.ts залогує цю помилку.
    const response = await apiClient.get<CategoriesApiResponse>('product/get_category');

    // Перевіряємо бізнес-логіку: чи успішний статус від нашого API.
    if (!response.data.status) {
        // Якщо ні, створюємо і викидаємо помилку з повідомленням від сервера.
        // Це дозволить компоненту, що викликає, обробити її.
        throw new Error(response.data.status || 'Failed to fetch categories');
    }

    // Повертаємо тільки корисні дані.
    return response.data.data;
};

/**
 * Отримати товари за ID категорії.
 * @param {string} categoryId - ID категорії, товари якої потрібно завантажити.
 * @returns {Promise<ProductData[]>} Масив товарів.
 * @throws {Error} Якщо запит до API невдалий або API повернув status: false.
 */
export const getProductByCategoryId = async (categoryId: string): Promise<ProductData[]> => {
    // Передаємо дані у другому аргументі для POST-запиту
    const response = await apiClient.post<ProductApiResponse>('product/get_product', {
        category_ids: [categoryId], // API очікує масив ID
    });

    if (!response.data.status) {
        throw new Error(response.data.message || `Failed to fetch products for category ${categoryId}`);
    }

    return response.data.data;
};

/**
 * Отримати товари за кількома ID категорій.
 * Це може бути корисно для сторінок, де треба показувати товари з кількох категорій одразу.
 * @param {string[]} categoryIds - Масив ID категорій.
 * @returns {Promise<ProductData[]>} Масив товарів.
 * @throws {Error} Якщо запит до API невдалий.
 */
export const getProductsByCategoryIds = async (categoryIds: string[]): Promise<ProductData[]> => {
    const response = await apiClient.post<ProductApiResponse>('product/get_product', {
        category_ids: categoryIds,
    });

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to fetch products for given categories');
    }

    return response.data.data;
};