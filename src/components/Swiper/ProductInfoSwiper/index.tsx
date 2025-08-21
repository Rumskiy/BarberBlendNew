import React, {useState} from 'react';
import '../swiper-import.css'
import {FreeMode, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperInstance} from 'swiper';
import styles from './productInfoSwiper.module.scss';
import {Image} from "../../../model.tsx";
import {useWindowSize} from "../../../hooks/WindoSize/useWindowSize.tsx";

interface ProductInfoSwiperProps {
    image: Image[];
}

export const ProductInfoSwiper: React.FC<ProductInfoSwiperProps> = ({image}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);

    const windowSize = useWindowSize();

    return (
        <div className={styles.swiperContainer}>
            {/* 1) Міні-слайдер зліва */}
            {
                // windowSize < 648 ? null :
                <Swiper
                    // @ts-ignore
                    onSwiper={setThumbsSwiper}
                    direction={`${windowSize > 1025 ? "vertical" : "horizontal"}`}
                    spaceBetween={40}
                    slidesPerView={4}
                    centeredSlides={false}
                    modules={[FreeMode, Thumbs]}
                    className={styles.thumbSwiperMini}
                    breakpoints={{
                        0: {
                            slidesPerView: 3,
                            spaceBetween: 8,
                        },
                        480: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 12,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 12,
                        },
                    }}
                >
                    {image.map(i => (
                        <SwiperSlide className={styles.thumbSwiperMini_slides} key={i.id}>
                            <img className={styles.thumbSwiperMini_slides_img} src={i.link}
                                 alt={'productPageThumbPhoto'}/>
                        </SwiperSlide>
                    ))}

                </Swiper>}

            {/* 2) Великий слайдер справа */}
            <Swiper
                spaceBetween={40}
                slidesPerView={1}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[FreeMode, Thumbs]}
                className={styles.thumbSwiperMain}
            >
                {image.map(i => (
                    <SwiperSlide className={styles.thumbSwiperMain_slides} key={i.id}>
                        <img className={styles.thumbSwiperMain_slides_img} src={i.link} alt={i.link}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
