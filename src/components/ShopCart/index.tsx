// src/components/ShopCart/ShopCart.tsx

"use client";

import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // ПОКРАЩЕННЯ: Використовуємо useRouter
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { debounce, DebouncedFunc } from 'lodash';
import { RemoveScroll } from 'react-remove-scroll';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { RxCross1 } from "react-icons/rx";

// Імпорти з нової структури
import { ProductCardCart } from "@/components/ProductCardCart";
import { ProductCardGift } from "@/components/ProductCardGift";
import { ProductButton } from "@/components/Buttons/ProductButton";
import { useCart } from "@/contexts/CartContext";
import { applyPromocode } from "@/lib/api/cart"; // ПОКРАЩЕННЯ: Новий шлях до API
import styles from "./shopCart.module.scss";
import {PromoCode} from "@/model";

const schema = Yup.object().shape({
    promo_code: Yup.string()
        .trim()
        .min(2, "Промокод занадто короткий")
        .required("Введіть промокод"),
});

export const ShopCart = () => {
    // Всі хуки залишаються, вони чудово працюють у клієнтських компонентах
    const {
        cart,
        isLoading,
        updateItemQuantity,
        removeItemFromCart,
        isCartOpen,
        closeCart,
        refreshCart,
        clearCartAll,
    } = useCart();

    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    // useRef для debounced-функції - ідеальний підхід
    const debouncedUpdateItemQuantityRef = useRef<DebouncedFunc<(productId: number, quantity: number) => Promise<void>> | null>(null);

    // useEffect для створення debounced-функції
    useEffect(() => {
        const performUpdate = async (productId: number, quantity: number) => {
            try {
                await updateItemQuantity(productId, quantity);
            } catch (error) {
                console.error(`Error in debounced update for product ${productId}:`, error);
                toast.error('Не вдалося оновити кількість товару.');
            }
        };

        debouncedUpdateItemQuantityRef.current = debounce(performUpdate, 400); // 400ms - хороший інтервал

        return () => {
            debouncedUpdateItemQuantityRef.current?.cancel();
        };
    }, [updateItemQuantity]);

    const handleQuantityChange = useCallback((productId: number, quantity: number) => {
        debouncedUpdateItemQuantityRef.current?.(productId, quantity);
    }, []);

    const handleRemove = useCallback(async (productId: number) => {
        await removeItemFromCart(productId);
    }, [removeItemFromCart]);

    const handleCheckout = () => {
        if (!cart || cart.items.length === 0) return;
        closeCart();
        // ПОКРАЩЕННЯ: Використовуємо router.push для навігації
        router.push('/checkout_page');
    };

    const onSubmitPromo = async (data: PromoCode) => {
        try {
            // ПОКРАЩЕННЯ: guestToken більше не потрібен як аргумент
            const response = await applyPromocode(data.promo_code);
            if (response.status) {
                toast.success('Промокод успішно застосовано!');
                reset();
                await refreshCart();
            } else {
                toast.error(response.message || 'Невірний промокод.');
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message || 'Помилка при застосуванні промокоду.');
        }
    };

    if (!isCartOpen) {
        return null; // Якщо кошик закритий, не рендеримо нічого для кращої продуктивності
    }

    return (
        // Overlay
        <div onClick={closeCart} className={`${styles.sideShopCart} ${isCartOpen ? styles.openShopCart : ''}`}>
            {/* RemoveScroll буде працювати тільки коли isCartOpen === true */}
            <RemoveScroll>
                {/* Вміст кошика */}
                <div className={`${styles.sideShopCart_menu} ${isCartOpen ? styles.openMenu : ''}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.sideShopCart_menu_wrapper}>
                        <div className={styles.sideShopCart_menu_cart}>
                            <h3 className={styles.sideShopCart_h3}>Ваш кошик</h3>
                            <button onClick={closeCart} className={styles.closeButton} aria-label="Закрити кошик">
                                <RxCross1 />
                            </button>
                        </div>

                        <div className={styles.sideShopCart_menu_cart_items}>
                            {isLoading && (
                                <div className={styles.spinnerContainer}><Spin /></div>
                            )}

                            {!isLoading && !cart?.items.length && !cart?.order_gift.length && (
                                <p className={styles.emptyCartMessage}>Ваш кошик порожній</p>
                            )}

                            {!isLoading && cart?.items.map((item) => (
                                <ProductCardCart
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemove}
                                />
                            ))}

                            {!isLoading && cart?.order_gift.map((item) => (
                                <ProductCardGift key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Футер кошика з сумою та кнопками */}
                    {!isLoading && cart && (cart.items.length > 0 || cart.order_gift.length > 0) && (
                        <div className={styles.cartFooter}>
                            <form onSubmit={handleSubmit(onSubmitPromo)} noValidate>
                                <div className={`${styles.promoForm} ${errors.promo_code && styles.error}`}>
                                    <input
                                        placeholder="Введіть промокод"
                                        type="text"
                                        {...register("promo_code")}
                                    />
                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? '...' : 'Ок'}
                                    </button>
                                </div>
                                {errors.promo_code && <p className={styles.errorText}>{errors.promo_code.message}</p>}
                            </form>

                            <div className={styles.summary}>
                                {cart.is_free_delivery && (
                                    <div className={styles.summaryRow}>
                                        <p>Доставка</p>
                                        <span>Безкоштовна</span>
                                    </div>
                                )}
                                <div className={`${styles.summaryRow} ${styles.total}`}>
                                    <p>Загалом</p>
                                    <span>{cart.cost} грн</span>
                                </div>
                            </div>

                            <div className={styles.actionButtons}>
                                <ProductButton onClick={handleCheckout}>Оформити замовлення</ProductButton>
                                <ProductButton style={{ background: '#ffffff', color: '#000000' }} onClick={clearCartAll}>
                                    Очистити кошик
                                </ProductButton>
                            </div>
                        </div>
                    )}
                </div>
            </RemoveScroll>
        </div>
    );
};