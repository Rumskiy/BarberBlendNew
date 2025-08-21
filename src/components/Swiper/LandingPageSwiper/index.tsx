"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import styles from './swiperLanding.module.scss'
import '../swiper-import.css'
import React from "react";
import {Banners} from "@/model";
import {useWindowSize} from "@/hooks/WindoSize/useWindowSize";

interface LandingPagePropsProps {
    banner: Banners[];
}

export const LandingPageSwiper: React.FC<LandingPagePropsProps> = ({banner}) => {
    const width = useWindowSize()

    return (
        <>
            <Swiper className="mySwiper">
                {banner !== null ? banner.map((item, index) =>
                    <SwiperSlide style={{cursor: 'pointer'}} key={index}>
                        <a href={item.url}>
                            {width > 768 ? <div className={styles.slide}>
                                <img className={styles.slideImg} src={item.image.link} alt={`${item.name}`}/>
                            </div> : <div className={styles.slide}>
                                {item.mobile_image && <img className={styles.slideImg} src={item.mobile_image.link}
                                                           alt={`${item.name}`}/>}
                            </div>}
                        </a>
                    </SwiperSlide>
                ) : ''}
            </Swiper>
        </>
    );
};