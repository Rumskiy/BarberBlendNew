// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Встановити таймер для оновлення debouncedValue після затримки
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Скасувати таймер, якщо value або delay змінилися до його спрацювання
        // Або якщо компонент демонтується
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Перезапускати ефект тільки якщо value або delay змінилися

    return debouncedValue;
}

export default useDebounce;