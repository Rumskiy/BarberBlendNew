// CategoryNav.tsx
import React, {useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom'; // Якщо потрібна навігація
import styles from './categoryTab.module.scss';
import {Category, ProductData} from "../../../model.tsx";
import {ProductSwiper} from "components/Swiper/ProductSwiper";
import {getProductByCategoryId} from "../../../Api/Category";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowDown} from "react-icons/io";
import classNames from "classnames";
import {Skeleton} from "components/Skeleton";

// import { ProductSwiper } from "components/Swiper/ProductSwiper"; // Якщо потрібен свайпер

interface CategoryNavProps {
    categories?: Category[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({categories}) => {
    const [activeItemId, setActiveItemId] = useState<string>();
    const [openCategoryId, setOpenCategoryId] = useState<string>();
    const [catLink, setCatLink] = useState<string>('');
    const [product, setProduct] = useState<ProductData[] | null>(null);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (!categories || categories.length === 0) return;
        const fetchProduct = async () => {
            try {

                const prod = await getProductByCategoryId(categories[0].id.toString());
                setProduct(prod);
                setCatLink(prod[0].categories[0].slug)

                const catId = prod[0].categories[0].id.toString();
                setActiveItemId(catId);
                setOpenCategoryId(catId);

                setLoading(false);
            } catch (err) {
                console.error("Помилка при завантаженні продуктів:", err)
            }
        }
        fetchProduct();
    }, [categories]);

    const handleCategoryClick = async (cat: Category) => {
        setLoading(true);
        const catId = cat.id.toString();
        setActiveItemId(catId);
        setCatLink(cat.slug)

        // якщо є підкатегорії — відкриваємо accordion
        if (cat.sub_category && cat.sub_category.length > 0) {
            setOpenCategoryId(openCategoryId === catId ? '' : catId);
        } else {
            setOpenCategoryId('0');
        }

        try {
            setProduct([])
            const res = await getProductByCategoryId(catId);
            setProduct(res)
        } catch (err) {
            console.error(err);
            setProduct([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.categoryNavContainer}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <div className={styles.categoryNav}>
                    {categories ? categories.map(cat => (
                        <div key={cat.id} className={styles.categoryItemContainer}>
                            <button
                                className={
                                    `${styles.categoryButton} ` +
                                    `${activeItemId === cat.id.toString() ? styles.active : ''}`
                                }
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat.name}
                                <IoIosArrowDown
                                    className={classNames(
                                        styles.categoryNav_button,
                                        {
                                            [styles.open]: activeItemId === cat.id.toString()
                                        }
                                    )}
                                />
                            </button>
                        </div>
                    )) : ''}
                </div>
                <div>
                    {categories ? categories.map(cat =>
                        <div>{openCategoryId === cat.id.toString() && (
                            <div className={styles.subCategoryList}>
                                {cat.sub_category?.map(sub => (
                                    <Link to={{pathname: `/catalog/${catLink}/${sub.slug}`}}
                                          key={sub.id}
                                          className={
                                              `${styles.subCategoryButton} ` +
                                              `${activeItemId === sub.id.toString() ? styles.activeSub : ''}`
                                          }
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        )}</div>
                    ) : ''}
                </div>
            </div>
            <div className={styles.productsDisplay}>
                {loading ? <Skeleton style={{width:'100%', height:'400px'}} /> : product && <ProductSwiper product={product}/>}
            </div>
            <div className={styles.categoryNav_wrapper}>
                <button className={styles.categoryNav_wrapper_button}
                        onClick={() => nav(`/catalog/${catLink}`)}>Переглянути всі
                </button>
            </div>
        </div>
    );
};