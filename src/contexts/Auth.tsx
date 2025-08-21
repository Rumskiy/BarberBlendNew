// src/contexts/AuthContext.tsx

"use client"; // ВАЖЛИВО: Ця директива робить весь файл клієнтським.

import React, {createContext, useState, useEffect, ReactNode, useCallback, useContext} from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import {AuthContextType, UserToken} from "@/model"; // Переконайся, що шлях до моделі правильний

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserToken | null>(null);
    // Стан isLoading залишається, він критично важливий для уникнення помилок гідрації.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Цей ефект виконується ТІЛЬКИ на клієнті після монтування.
        try {
            const stored = localStorage.getItem('userInfo');
            if (stored) {
                const parsed = JSON.parse(stored);
                const token = parsed.token;

                if (token && typeof token === 'string') {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setUser({token});
                } else {
                    localStorage.removeItem('userInfo');
                }
            }
        } catch (err) {
            console.error('Error loading token from storage:', err);
            localStorage.removeItem('userInfo');
        } finally {
            // Коли перевірка завершена, ми дозволяємо рендеринг залежних компонентів.
            setIsLoading(false);
        }
        // Залежностей немає [], тому ефект виконується один раз при завантаженні.
    }, []);

    const login = useCallback((userData: UserToken) => {
        try {
            localStorage.setItem('userInfo', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
            setUser(userData);
        } catch (err) {
            console.error('Error saving token to localStorage:', err);
            toast.error('Не вдалося зберегти дані сесії.');
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        toast.info('Ви успішно вийшли з акаунта.');
    }, []);

    const contextValue = React.useMemo(
        () => ({user, isLoading, login, logout}),
        [user, isLoading, login, logout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};