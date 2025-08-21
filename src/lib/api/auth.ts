// src/lib/api/auth.ts

import {
    LoginApiResponse,
    LoginFormInputs,
    LoginFormInputsApi,
    RegisterFormCode,
    RegisterFormInputs,
    UserToken
} from '@/model';
import {apiClient} from '../axios';
import {trackFbPixelEvent} from "@/lib/api/fpixel";


export const requestLoginCode = async (data: LoginFormInputs): Promise<LoginApiResponse> => {
    const response = await apiClient.post<LoginApiResponse>('auth/login', data);

    if (!response.data.status) {
        throw new Error(response.data.message || 'Login request failed');
    }

    return response.data;
};

export const verifyLoginCode = async (data: LoginFormInputsApi): Promise<UserToken> => {
    const response = await apiClient.post<UserToken>('auth/login/verify', data);

    if (!response.data.message) {
        throw new Error(response.data.message || 'Login verification failed');
    }

    return response.data;
};


export const requestRegistration = async (data: RegisterFormInputs): Promise<any> => {
    const response = await apiClient.post<any>('auth/register', data);

    if (!response.data.status) {
        throw new Error(response.data.message || 'Registration request failed');
    }

    return response.data;
};

export const verifyRegistration = async (data: RegisterFormCode): Promise<UserToken> => {
    const response = await apiClient.post<UserToken>('auth/verify-phone', data);

    if (!response.data.message) {
        throw new Error(response.data.message || 'Registration verification failed');
    }

    // Відстежуємо успішну реєстрацію
    trackFbPixelEvent('CompleteRegistration');

    return response.data;
};

export const createGuestToken = async (): Promise<any> => {
    const response = await apiClient.post<any>('auth/create_guest');

    if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to create guest token');
    }

    return response.data;
};