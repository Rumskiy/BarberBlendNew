// src/lib/api/user.ts

import {OrderListApiResponse, PersonalDataFormInputs, UpdateUserApiResponse, UserInfoApi} from '@/model';
import { apiClient } from '../axios';
import { FastCheckoutProductInfo } from '@/contexts/ModalFastCheckoutContext';


/**
 * Отримати дані профілю користувача.
 * Потребує токен авторизації, який передається явно.
 * Може викликатись як з сервера, так і з клієнта.
 */
export const getAccountData = async (token: string): Promise<UserInfoApi> => {
    const response = await apiClient.get<UserInfoApi>('auth/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.data.status) {
        throw new Error(response.data.status || 'Authentication error');
    }

    return response.data;
};

/**
 * Отримати історію замовлень користувача.
 * Також потребує токен авторизації.
 */
export const getOrderHistory = async (token: string): Promise<OrderListApiResponse> => {
    const response = await apiClient.get<OrderListApiResponse>('order/get_my_order', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
};

/**
 * Оновити дані профілю користувача.
 */
export const updateAccountData = async (data: Partial<PersonalDataFormInputs>, token: string): Promise<UpdateUserApiResponse> => {
    const response = await apiClient.post<UpdateUserApiResponse>('auth/change_profile', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.data?.status) {
        throw new Error(response.data?.message || 'Failed to update account data');
    }

    return response.data;
};

/**
 * Створити швидке замовлення та отримати код підтвердження.
 */
export const requestFastCheckoutCode = async (data: FastCheckoutProductInfo) => {
    const response = await apiClient.post('order/create_fast_order', data);

    if (!response.data) { // Перевір, яку відповідь очікувати при помилці
        throw new Error('Failed to create fast order');
    }

    return response.data;
};

/**
 * Підтвердити швидке замовлення за допомогою коду.
 */
export const verifyFastCheckoutCode = async (data: { guest_token: string, code: string }) => {
    const response = await apiClient.post('order/confirm_create_fast_order', data);

    if (!response.data) { // Перевір, яку відповідь очікувати при помилці
        throw new Error('Failed to verify fast order code');
    }

    return response.data;
};