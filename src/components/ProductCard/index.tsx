// src/components/ProductCard/ProductCard.tsx

"use client";

import React, {useState} from "react";
import Link from 'next/link';
import {SlPresent} from "react-icons/sl";
import {GoHeart, GoHeartFill} from "react-icons/go";

// Імпорти з нового Next.js-оточення
import {ProductButton} from "@/components/Buttons/ProductButton";
import {useCart} from "@/contexts/CartContext";
import styles from "./productCard.module.scss";
import {ProductData} from "@/model";
import {trackFbPixelEvent} from "@/lib/api/fpixel";
import {addToWishlist, removeFromWishlist} from "@/lib/api/wishlist";

interface ProductCardProps {
    product: ProductData;
    // liked, bonus, popular - ці пропси можна прибрати, якщо вони дублюють дані з `product`
    onFavoriteStatusChange?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, onFavoriteStatusChange}) => {
    // ПОКРАЩЕННЯ: Ініціалізуємо стан напряму з пропсів, `useEffect` не потрібен.
    const [isLiked, setIsLiked] = useState(product.is_favourite);
    const [bonusOpen, setBonusOpen] = useState(false);

    // Припускаємо, що CartContext надає `guestToken` або використовує його всередині своїх методів
    const {addItemToCart} = useCart();

    // `useWindowSize` залишається, якщо він потрібен для умовної логіки (я закоментував дублювання)

    const handleToggleFavorite = async () => {
        // Оптимістичне оновлення UI
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);

        try {
            if (newLikeStatus) {
                // Додаємо в обране
                await addToWishlist(product.id); // Припускаємо, що guestToken керується централізовано (в axios або контексті)
                trackFbPixelEvent('AddToWishlist', {
                    content_ids: [product.id],
                    content_type: 'product',
                    value: product.price,
                    currency: 'UAH',
                });
            } else {
                // Видаляємо з обраного
                await removeFromWishlist(product.id);
                // Якщо потрібно оновити список на сторінці (наприклад, на сторінці "Обране")
                onFavoriteStatusChange?.();
            }
        } catch (error) {
            console.error("Failed to update favorite status:", error);
            // Повертаємо UI до попереднього стану у випадку помилки
            setIsLiked(!newLikeStatus);
        }
    };

    const handleAddToCart = () => {
        addItemToCart(product.id, 1);
        trackFbPixelEvent('AddToCart', {value: product.price, currency: 'UAH'});
    };

    const price = product.is_discount && product.discount_price ? parseInt(product.discount_price) : parseInt(product.price);
    const oldPrice = product.is_discount ? parseInt(product.price) : null;

    return (
        <div className={styles.productCard}>
            {product.tags?.[0] && (
                <div className={styles.productCard_newItem}>
                    <h1>{product.tags[0].name}</h1>
                </div>
            )}

            {product.product_gift && ( // Припускаємо, що поле називається `has_gift`
                <SlPresent size={24} className={styles.productCard_bonus} onClick={() => setBonusOpen(!bonusOpen)}/>
            )}

            <div className={styles.imageContainer}>
                {/* ПОКРАЩЕННЯ: Використовуємо Link для SEO та prefetching */}
                <Link href={`/product/${product.slug}`} className={styles.productCard_img_wrapper}>
                    <img
                        className={styles.productCard_img}
                        src={product.images?.[0]?.link}
                        alt={product.name}
                    />
                </Link>
                <div className={styles.productCard_absoluteImg}>
                    <button
                        onClick={handleToggleFavorite}
                        className={styles.likeButton}
                        aria-label={isLiked ? "Видалити з обраного" : "Додати в обране"}
                    >
                        {isLiked ? (
                            <GoHeartFill size={28}/>
                        ) : (
                            <GoHeart size={28}/>
                        )}
                    </button>
                </div>
            </div>

            <div className={styles.productCard_infoText}>
                <div className={styles.productCard_title}>
                    <Link href={`/product/${product.slug}`} className={styles.productCard_title_h2}>
                        {product.name}
                    </Link>
                </div>
                <div className={styles.productCard_subtext}>
                    <p className={styles.volumeText}>{product.volume} {product.unit}</p>
                    <div className={styles.productCard_cost}>
                        <h3 className={styles.productCard_cost_h3}>{price} грн</h3>
                        {oldPrice && (
                            <h3 className={styles.productCard_cost_h3_lastPrice}>{oldPrice} грн</h3>
                        )}
                    </div>
                </div>
            </div>

            <ProductButton onClick={handleAddToCart}>Додати в кошик</ProductButton>
        </div>
    );
};