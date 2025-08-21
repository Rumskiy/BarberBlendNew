"use client"

import {Swiper, SwiperSlide} from "swiper/react";
import '../swiper-import.css'
import styles from './instagramSwiper.module.scss'
import React from "react";
import {InstagramBanners} from "@/model";

export const productSwiperBreakpoints = {
    // від 0 до 319px
    0: {
        slidesPerView: 3,
        spaceBetween: 8,
    },
    450: {
        slidesPerView: 3,
        spaceBetween: 16,
    },
    640: {
        slidesPerView: 4,
        spaceBetween: 16,
    },
    // від 768px до 1023px
    768: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    // від 1024px і більше
    1024: {
        slidesPerView: 4,
        spaceBetween: 24,
    },
    // великий десктоп
    1440: {
        slidesPerView: 5,
        spaceBetween: 28,
    },
};

interface InstaSwiperProps {
    instagramBanners: InstagramBanners[];
}

export const InstagramSwiper: React.FC<InstaSwiperProps> = ({instagramBanners}) => {

        return (
            <Swiper
                slidesPerView={5}
                spaceBetween={40}
                slidesPerGroup={1}
                breakpoints={productSwiperBreakpoints}
            >
                {instagramBanners.map((banner) => (
                    <SwiperSlide className={styles.instaSwiper_Slide} style={{zIndex: '100'}}>
                        <a rel="noopener noreferrer" target="_blank" href={banner.url}>
                            <div className={styles.instaSwiper_wrapperImg}>
                                {banner.image && banner.image.length > 0 && banner.image[0].link && (
                                    <img
                                        className={`${styles.instaSwiper_wrapperImg_img} ${styles.desktopImage}`}
                                        src={banner.image[0].link}
                                        alt="Desktop version"
                                    />
                                )}
                                {banner.mobile_image && banner.mobile_image.length > 0 && banner.mobile_image[0].link && (
                                    <img
                                        className={`${styles.instaSwiper_wrapperImg_img} ${styles.mobileImage}`}
                                        src={banner.mobile_image[0].link}
                                        alt="Mobile version"
                                    />
                                )}
                            </div>
                        </a>
                    </SwiperSlide>))
                }
            </Swiper>
        );
    }
;