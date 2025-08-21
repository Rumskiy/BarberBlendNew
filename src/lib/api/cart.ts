// src/lib/api/cart.ts

import {AddToCartPayload, CartActionPayload, CartApiResponse} from '@/model';
import {apiClient} from '../axios';


/**
 * Допоміжна функція для відстеження подій Facebook Pixel.
 * Працює безпечно: виконується тільки в браузері.
 */
const trackPixelEvent = (eventName: string, params?: object) => {
    // Перевіряємо, чи ми в браузері і чи fbq ініціалізовано
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    }
};

/**
 * Отримати вміст кошика за гостьовим токеном.
 */
export const getCart = async (guest_token: string) => {
    const response = await apiClient.post('cart/get_cart', {guest_token});
    return response.data;
};

/**
 * Додати товар до кошика.
 */
export const addToCart = async (data: AddToCartPayload): Promise<CartApiResponse> => {
    const response = await apiClient.post<CartApiResponse>('cart/add_to_cart', data);

    if (!response.data?.status) {
        throw new Error(response.data?.message || 'Failed to add to cart');
    }

    // Відстежуємо подію після успішного додавання
    trackPixelEvent('AddToCart', {
        content_ids: [data.product_id],
        content_type: 'product',
        num_items: data.quantity,
    });

    return response.data;
};

/**
 * Оновити кількість товару в кошику.
 */
export const updateCartItem = async (data: CartActionPayload): Promise<CartApiResponse> => {
    const response = await apiClient.post<CartApiResponse>('cart/update_cart_item', data);

    if (!response.data?.status) {
        throw new Error(response.data?.message || 'Failed to update cart item');
    }

    return response.data;
};

/**
 * Видалити товар з кошика.
 */
export const removeFromCart = async (data: Omit<CartActionPayload, 'quantity'>): Promise<CartApiResponse> => {
    // У Axios дані для DELETE-запиту передаються в `config.data`
    const response = await apiClient.delete<CartApiResponse>('cart/delete_cart_item', {data});

    if (!response.data?.status) {
        throw new Error(response.data?.message || 'Failed to remove item from cart');
    }

    return response.data;
};

export const clearCart = async () => {
    const guest_token = localStorage.getItem('guestToken');

    const response = await apiClient.delete('cart/clear_cart', {data: {guest_token}});
    return response.data;
};


export const applyPromocode = async (promo_code: string, guest_token: string) => {
    const response = await apiClient.post('cart/apply_promocode', {promo_code, guest_token});
    return response.data;
};