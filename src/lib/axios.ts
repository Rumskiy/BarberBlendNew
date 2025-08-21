import axios from 'axios';

const API_BASE_URL = 'https://panel.barberblend.com/api/';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Тут можна додати глобальну логіку обробки помилок
        console.error('API call error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);