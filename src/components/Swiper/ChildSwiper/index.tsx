"use client";

import styles from './childSwiper.module.scss'
import React from "react";
import {ProductData} from "@/model";
import {ProductSwiper} from "@/components/Swiper/ProductSwiper";

interface ChildSwiperProps {
    title: string;
    product: ProductData[];
}

export const ChildSwiper: React.FC<ChildSwiperProps> = (props) => {
    return (
        <div className={styles.childSwiper}>
            <h2 className={styles.childSwiper_h2}>{props.title}</h2>
            <ProductSwiper product={props.product}/>
        </div>
    );
};