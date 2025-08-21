// src/contexts/CartContext.tsx

"use client"; // ВАЖЛИВО: Робимо цей контекст клієнтським.

import React, {createContext, ReactNode, useContext, useEffect, useState, useCallback, useMemo} from "react";
import {CartData} from "@/model";
import {useAuth} from "@/contexts/Auth"; // Онови шляхи
import {addToCart, clearCart, getCart, removeFromCart, updateCartItem} from "@/lib/api/cart";

interface CartContextType {
    cart: CartData | null;
    isLoading: boolean;
    refreshCart: () => Promise<void>;
    addItemToCart: (productId: number, quantity: number) => Promise<void>;
    updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
    removeItemFromCart: (productId: number) => Promise<void>;
    clearCartAll: () => Promise<void>;
    isCartOpen: boolean;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {user} = useAuth();

    // UI-функції для керування станом модалки/сайдбару кошика
    const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    // Функція-хелпер для отримання токена
    const getGuestToken = useCallback((): string | null => {
        // Працює тільки на клієнті
        return localStorage.getItem('guestToken');
    }, []);

    // Функція для оновлення даних кошика
    const refreshCart = useCallback(async () => {
        const guestToken = getGuestToken();
        // Якщо токена немає, ми не можемо завантажити кошик.
        if (!guestToken) {
            setCart(null);
            setIsLoading(false);
            return;
        }

        // Встановлюємо isLoading тільки якщо ще не завантажуємо
        setIsLoading(true);
        try {
            const response = await getCart(guestToken); // Припускаємо, що getCart не потребує токен юзера, якщо є гостьовий
            setCart(response.data);
        } catch (error) {
            console.error("Error refreshing cart:", error);
            setCart(null);
        } finally {
            setIsLoading(false);
        }
    }, [getGuestToken, user]); // ПОКРАЩЕННЯ: прибрали isCartOpenState із залежностей

    // Ефект для початкового завантаження кошика
    useEffect(() => {
        refreshCart();
    }, [refreshCart]); // refreshCart стабільний через useCallback

    // Функції-дії з кошиком
    const addItemToCart = useCallback(async (productId: number, quantity: number) => {
        const guestToken = getGuestToken();
        if (!guestToken) return;
        try {
            await addToCart({product_id: productId, quantity, guest_token: guestToken});
            await refreshCart(); // Оновлюємо стан після дії
            openCart(); // Відкриваємо кошик після додавання товару
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }, [getGuestToken, refreshCart, openCart]);

    const updateItemQuantity = useCallback(async (productId: number, quantity: number) => {
        const guestToken = getGuestToken();
        if (!guestToken) return;
        try {
            await updateCartItem({product_id: productId, quantity, guest_token: guestToken});
            await refreshCart();
        } catch (error) {
            console.error("Error updating item quantity:", error);
        }
    }, [getGuestToken, refreshCart]);

    const removeItemFromCart = useCallback(async (productId: number) => {
        const guestToken = getGuestToken();
        if (!guestToken) return;
        try {
            await removeFromCart({product_id: productId, guest_token: guestToken});
            await refreshCart();
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }, [getGuestToken, refreshCart]);

    const clearCartAll = useCallback(async () => {
        const guestToken = getGuestToken();
        if (!guestToken) return;
        try {
            await clearCart(guestToken);
            await refreshCart();
        } catch (e) {
            console.error("Error clearing cart:", e);
        }
    }, [getGuestToken, refreshCart]);


    const contextValue = useMemo(() => ({
        cart,
        isLoading,
        refreshCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCartAll,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
    }), [
        cart,
        isLoading,
        isCartOpen,
        refreshCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCartAll,
        toggleCart,
        openCart,
        closeCart
    ]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};