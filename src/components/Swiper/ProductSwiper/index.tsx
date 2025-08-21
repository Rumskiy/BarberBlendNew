import {Swiper, SwiperSlide} from "swiper/react";
import '../swiper-import.css'
import React from "react";
import {ProductCard} from "@/components/ProductCard";
import {ProductData} from "@/model";

interface ProductCardProps {
    product: ProductData[];
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
        slidesPerView: 4,
        spaceBetween: 16,
    },
    // від 768px до 1023px
    768: {
        slidesPerView: 5,
        spaceBetween: 20,
    },
    // від 1024px і більше
    1024: {
        slidesPerView: 5,
        spaceBetween: 24,
    },
    // великий десктоп
    1440: {
        slidesPerView: 6,
        spaceBetween: 28,
    },
};

export const ProductSwiper: React.FC<ProductCardProps> = ({product}) => {

    return (
        <>
            <Swiper breakpoints={productSwiperBreakpoints}
                spaceBetween={30}
                className="mySwiper"
            >
                {product.map(product =>
                    <SwiperSlide><ProductCard product={product}/></SwiperSlide>
                )}
            </Swiper>
        </>
    );
};