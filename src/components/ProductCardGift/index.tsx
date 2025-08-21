// src/components/ProductCardCart/ProductCardCart.tsx

import styles from "./productCardCart.module.scss";
import React, {useState} from "react";
import {RxCross1} from "react-icons/rx";
import {ProductData} from "../../model.tsx";

interface ProductCardGiftProps {
    item: ProductData;
    onQuantityChange?: (productId: number, newQuantity: number) => Promise<void>;
    onRemove?: (productId: number) => Promise<void>;
    min?: number;
    max?: number;
    isCounterDisplayed?: boolean;
    isCrossDisabled?: boolean;
}

export const ProductCardGift: React.FC<ProductCardGiftProps> = ({
                                                                    item,
                                                                    onRemove,
                                                                    isCrossDisabled,
                                                                }) => {
    // 1. Локальний стан для миттєвого оновлення UI
    const [isUpdating, setIsUpdating] = useState(false);

    const handleLocalRemove = async () => {
        setIsUpdating(true);
        await onRemove!(item.id);
        // Не потрібно setIsUpdating(false), бо компонент буде розмонтовано
    };

    return (
        <div className={styles.productCardCart}>
            {isCrossDisabled ? (
                <button
                    className={styles.productCardCart_removeButton}
                    onClick={handleLocalRemove}
                    disabled={isUpdating}
                    aria-label="Видалити товар"
                >
                    <RxCross1/>
                </button>
            ) : null}

            <div className={styles.productCardCart_wrapperImg}>
                {item.images && (<img
                    className={styles.productCardCart_wrapperImg_img}
                    src={item.images?.[0].link || '/placeholder-image.png'}
                    alt={item.name}
                />)}
            </div>
            <div className={styles.productCardCart_wrapper}>
                <div className={styles.productCardCart_title}>
                    {/* Використовуємо локальну кількість для миттєвого відображення */}
                    <p>{item.name} {`(кількість 1)`}</p>
                </div>

                <div className={styles.productCardCart_priceAmount}>
                    <div className={styles.productCardCart_priceAmount_text}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span className={styles.productCardCart_priceAmount_price}>
                                {parseInt(item.price!)} грн
                            </span>
                            {/*<span style={{ color: "#8D8D8D", fontSize: '0.8rem' }} className={styles.productCardCart_priceAmount_price}>*/}
                            {/*    РРЦ {parseInt(item.product.price)} грн*/}
                            {/*</span>*/}
                        </div>
                        <span className={styles.productCardCart_volume}>
                            {item.volume && <p>{item.volume} {item.unit}</p>}
                        </span>
                    </div>
                    <p style={{color: 'red'}}>ПОДАРУНОК</p>
                </div>
            </div>
        </div>
    );
};