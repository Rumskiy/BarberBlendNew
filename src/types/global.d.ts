// src/types/global.d.ts
declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
        ttq?: {
            page: (...args: any[]) => void;
            track: (eventName: string, params?: object, options?: object) => void;
            identify: (identity: object, options?: object) => void;
            // Додайте інші методи, якщо будете їх використовувати
            [key: string]: any; // Для інших методів та властивостей ttq
        };
    }

}

// Це потрібно, щоб TypeScript не видавав помилку,
// але не видаляйте експорт, якщо файл є модулем
export {};