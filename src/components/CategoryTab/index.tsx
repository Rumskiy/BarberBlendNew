// src/components/LandingPage/CategoryTab.tsx

"use client"; // ВАЖЛИВО: Позначаємо як Клієнтський Компонент

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ПОКРАЩЕННЯ: Новий хук для роутингу
import Link from 'next/link'; // ПОКРАЩЕННЯ: Новий компонент для посилань
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';

import { getProductByCategoryId } from "@/lib/api/category";
import { ProductSwiper } from "@/components/Swiper/ProductSwiper";
import { Skeleton } from "@/components/Skeleton";
import styles from './categoryTab.module.scss';
import {Category, ProductData} from "@/model";

interface CategoryNavProps {
    categories?: Category[];
    initialProducts: ProductData[]; // ПОКРАЩЕННЯ: Отримуємо початкові продукти
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, initialProducts }) => {
    const [activeItemId, setActiveItemId] = useState<string | undefined>(categories?.[0]?.id.toString());
    const [openCategoryId, setOpenCategoryId] = useState<string | undefined>(categories?.[0]?.id.toString());
    const [catLink, setCatLink] = useState<string | undefined>(categories?.[0]?.slug);
    const [products, setProducts] = useState<ProductData[]>(initialProducts); // ПОКРАЩЕННЯ: Встановлюємо початкові продукти
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Аналог useNavigate

    // ПОКРАЩЕННЯ: useEffect для початкового завантаження більше не потрібен!
    // Дані для першої вкладки приходять з сервера.

    const handleCategoryClick = async (cat: Category) => {
        const catId = cat.id.toString();
        // Не робимо запит, якщо вкладка вже активна
        if (activeItemId === catId) {
            // Просто відкриваємо/закриваємо акордеон
            if (cat.sub_category && cat.sub_category.length > 0) {
                setOpenCategoryId(openCategoryId === catId ? undefined : catId);
            }
            return;
        }

        setLoading(true);
        setActiveItemId(catId);
        setCatLink(cat.slug);
        setProducts([]); // Очищуємо продукти перед завантаженням нових

        if (cat.sub_category && cat.sub_category.length > 0) {
            setOpenCategoryId(openCategoryId === catId ? undefined : catId);
        } else {
            setOpenCategoryId(undefined);
        }

        try {
            const res = await getProductByCategoryId(catId);
            setProducts(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.categoryNavContainer}>
            {/* ... твій JSX для кнопок категорій ... */}
            <div className={styles.productsDisplay}>
                {loading ? <Skeleton style={{width:'100%', height:'400px'}} /> : products && <ProductSwiper product={products}/>}
            </div>
            <div className={styles.categoryNav_wrapper}>
                {/* ПОКРАЩЕННЯ: Використовуємо Link або router.push */}
                <button
                    className={styles.categoryNav_wrapper_button}
                    onClick={() => router.push(`/catalog/${catLink}`)}
                >
                    Переглянути всі
                </button>
            </div>
        </div>
    );
};