import {Swiper, SwiperSlide} from "swiper/react";
import '../swiper-import.css'
import styles from './moreSwiper.module.scss'
import './moreSwiper.css'

export const MoreSwiper = () => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={40}
            slidesPerGroup={1}
        >
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles.moreSwiper_Slide} style={{ zIndex: '100' }}>
                <div className={styles.moreSwiper_wrapperImg}>
                    <img className={styles.moreSwiper_wrapperImg_img} src={"https://picsum.photos/200/300"} alt=""/>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};