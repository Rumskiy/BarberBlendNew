"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import '../swiper-import.css'
import styles from './blogSwiper.module.scss'
import React from "react";
import parse from "html-react-parser";
import {Blog} from "@/model";
import {ProductButton} from "@/components/Buttons/ProductButton";
import Link from "next/link";

interface BlogSwiperProps {
    blog: Blog[];
}

export const productSwiperBreakpoints = {
    // від 0 до 319px
    0: {
        slidesPerView: 2,
        spaceBetween: 8,
    },
    450: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
    // від 768px до 1023px
    768: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    // від 1024px і більше
    1024: {
        slidesPerView: 2,
        spaceBetween: 24,
    },
    // великий десктоп
    1440: {
        slidesPerView: 3,
        spaceBetween: 28,
    },
};

export const BlogSwiper: React.FC<BlogSwiperProps> = ({blog}) => {

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={productSwiperBreakpoints}
            className={styles.blogSwiperContainer} // Добра практика - додати клас до самого Swiper
        >
            {blog.map((item) => (
                <SwiperSlide key={item.id}
                             className={styles.blogSwiperSlide}>
                    <div className={styles.blogSwiper_wrapper}>

                        {/* ПОКРАЩЕННЯ: Обгортаємо зображення в Link для кращого SEO та доступності */}
                        <Link href={`/blog/${item.slug}`}>
                            <div className={styles.blogSwiper_wrapperImg}>
                                <img
                                    className={styles.blogSwiper_wrapperImg_img}
                                    src={item.image?.[0]?.link} // Додамо опціональний чейнінг для безпеки
                                    alt={item.title} // ПОКРАЩЕННЯ: Використовуємо заголовок статті для alt-тега
                                />
                            </div>
                        </Link>
                        <div className={styles.blogSwiper_text}>
                            {/* ПОКРАЩЕННЯ: Заголовок також може бути посиланням */}
                            <Link href={`/blog/${item.slug}`}>
                                <h2 className={styles.blogSwiper_text_h2}>{item.title}</h2>
                            </Link>
                        </div>

                        <div className={styles.blogSwiper_textGap}>
                            {item.content?.[0]?.html && (
                                <div className={styles.blogSwiper_text_p}>
                                    {/* `parse` може бути повільним, але для коротких описів це нормально.
                                        `dangerouslySetInnerHTML` - швидша альтернатива, якщо ти довіряєш джерелу HTML. */}
                                    {parse(item.content[0].html)}
                                </div>
                            )}
                            <div className={styles.blogSwiper_button}>
                                {/* Передаємо `href` замість `link` для відповідності <Link> */}
                                <ProductButton href={`/blog/${item.slug}`}>Читати</ProductButton>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};