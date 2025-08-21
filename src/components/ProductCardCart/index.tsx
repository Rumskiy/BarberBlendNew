// src/components/ProductCardCart/ProductCardCart.tsx
"use client";

import styles from "./productCardCart.module.scss";
import {HiMinus, HiPlus} from "react-icons/hi";
import React, {ChangeEvent, useState, useEffect} from "react"; // Додано useState, useEffect
import {RxCross1} from "react-icons/rx";
import { CartItem } from "@/model";

interface ProductCardCartProps {
    item: CartItem;
    // onQuantityChange та onRemove тепер будуть передаватися з ShopCart
    onQuantityChange: (productId: number, newQuantity: number) => Promise<void>;
    onRemove: (productId: number) => Promise<void>;
    min?: number;
    max?: number;
    isCounterDisplayed?: boolean;
    isCrossDisabled?: boolean;
}

export const ProductCardCart: React.FC<ProductCardCartProps> = ({
                                                                    item,
                                                                    onQuantityChange,
                                                                    onRemove,
                                                                    min = 1,
                                                                    max = 99, // Максимальна кількість, яку можна додати
                                                                    isCounterDisplayed,
                                                                    isCrossDisabled,
                                                                }) => {
    const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
    const [isUpdating, setIsUpdating] = useState(false); // Для блокування кнопок під час запиту

    // Синхронізація локальної кількості, якщо вона змінилася ззовні (наприклад, після refreshCart)
    useEffect(() => {
        setCurrentQuantity(item.quantity);
    }, [item.quantity]);


    const handleUpdate = async (newQuantity: number) => {
        if (isUpdating) return; // Запобігаємо багаторазовим запитам
        setIsUpdating(true);
        try {
            await onQuantityChange(item.product.id, newQuantity);
            // Не потрібно setCurrentQuantity(newQuantity) тут,
            // бо useEffect оновить його, коли оновиться item.quantity з контексту
        } catch (error) {
            console.error("Error updating quantity in ProductCardCart:", error);
            // Можна повернути кількість до попереднього значення, якщо помилка
            // setCurrentQuantity(item.quantity);
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePlus = () => {
        const next = Math.min(currentQuantity + 1, max);
        if (next !== currentQuantity) { // Оновлюємо, тільки якщо значення змінилося
            setCurrentQuantity(next); // Оновлюємо локально для миттєвого UI
            handleUpdate(next); // Відправляємо на сервер
        }
    };

    const handleMinus = () => {
        const next = Math.max(currentQuantity - 1, min);
        if (next !== currentQuantity) {
            setCurrentQuantity(next);
            handleUpdate(next);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (Number.isNaN(val)) return; // Ігноруємо нечислові значення
        const clamped = Math.min(Math.max(val, min), max);
        setCurrentQuantity(clamped); // Оновлюємо локально
        // Можна додати debounce тут, щоб не відправляти запит на кожну зміну, а після паузи
        handleUpdate(clamped);
    };

    const handleLocalRemove = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            await onRemove(item.product.id);
        } catch (error) {
            console.error("Error removing item in ProductCardCart:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={styles.productCardCart}>
            {isCrossDisabled ? <button // Змінено RxCross1 на button для кращої доступності
                className={styles.productCardCart_removeButton}
                onClick={handleLocalRemove}
                disabled={isUpdating}
                aria-label="Видалити товар"
            >
                <RxCross1/>
            </button> : null}

            <div className={styles.productCardCart_wrapperImg}>
                <img
                    className={styles.productCardCart_wrapperImg_img}
                    src={item.product.images?.[0]?.link || '/placeholder-image.png'} // Додано плейсхолдер
                    alt={item.product.name}
                />
            </div>
            <div className={styles.productCardCart_wrapper}>
                <div className={styles.productCardCart_title}>
                    <p>{item.product.name}</p>
                </div>

                <div className={styles.productCardCart_priceAmount}>
                    <div className={styles.productCardCart_priceAmount_text}>
                        <span className={styles.productCardCart_priceAmount_price}>
                            {item.current_cost || item.product.price} грн
                        </span>
                        <span className={styles.productCardCart_volume}>
                        {item.product.volume && <p>{item.product.volume} {item.product.unit}</p>}
                        </span>
                    </div>
                    {isCounterDisplayed ? <div className={styles.productCardCart_priceAmount_counter}>
                            <button
                                type="button"
                                onClick={handleMinus}
                                disabled={currentQuantity <= min || isUpdating}
                                className={styles.button}
                            >
                                <HiMinus/>
                            </button>
                            <input
                                type="number"
                                className={styles.productCardCart_priceAmount_counter_input}
                                value={currentQuantity}
                                onChange={handleChange}
                                min={min}
                                max={max}
                                step={1}
                                disabled={isUpdating}
                            />
                            <button
                                type="button"
                                onClick={handlePlus}
                                disabled={currentQuantity >= max || isUpdating}
                                className={styles.button}
                            >
                                <HiPlus/>
                            </button>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );
};