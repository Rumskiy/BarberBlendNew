// src/lib/fpixel.ts

// Типізуємо `window` для доступу до fbq
declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

export const trackFbPixelEvent = (eventName: string, params?: object) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    } else {
        console.warn(`Facebook Pixel (fbq) not initialized for event: ${eventName}`);
    }
};