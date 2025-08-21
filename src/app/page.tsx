// src/app/page.tsx

// Імпорти для API-функцій та типів
import { getAllCategory, getProductByCategoryId } from '@/lib/api/category'; // Нові шляхи до API
import { getLandingData } from '@/lib/api/landing';
import type { Metadata } from 'next';

import { BlogSwiper } from "@/components/Swiper/BlogSwiper";
import { InstagramSwiper } from "@/components/Swiper/InstaSwiper";
import styles from './landing.module.scss';
import {CategoryNav} from "@/components/CategoryTab";
import Link from "next/link";
import {AboutSection} from "@/components/AboutSection";
import {LandingPageSwiper} from "@/components/Swiper/LandingPageSwiper";
import "./globals.css"

export const metadata: Metadata = {
  title: 'BARBER BLEND - Твій домашній догляд із вайбом барбершопу',
  description: 'Знайди найкращі засоби для догляду за волоссям та бородою. Професійна косметика з доставкою по Україні.',
};

// ПОКРАЩЕННЯ №2: Компонент став асинхронним!
export default async function LandingPage() {
  // ПОКРАЩЕННЯ №3: Дані завантажуються на сервері. Ніяких useEffect, useState, loading.
  // Використовуємо Promise.all для паралельного завантаження даних.
  const [categories, landingData] = await Promise.all([
    getAllCategory(),
    getLandingData(),
  ]);

  let initialProducts: any = [];
  if (categories && categories.length > 0) {
    initialProducts = await getProductByCategoryId(categories[0].id.toString());
  }

  const { banners, category: catBanner, blog, instagramBanners, under_text: siteText } = landingData;

  return (
      <>
        <section className={styles.heroSection}>
          {banners && (
              <div className={styles.heroSection_wrapper}>
                <LandingPageSwiper banner={banners} />
              </div>
          )}
        </section>

        <section className={styles.categories}>
          <div className={styles.container}>
            <h2 className={styles.categories_h2}>Категорії</h2>
            {/* Передаємо початкові дані в клієнтський компонент */}
            <CategoryNav categories={categories} initialProducts={initialProducts} />
          </div>
        </section>

        <section className={styles.gridImgs}>
          <div className={styles.container}>
            <div className={styles.gridImgs_wrapper}>
              <h2 className={styles.gridImgs_h2}>Топові засоби BARBER BLEND</h2>
              <div className={styles.gridImgs_grid}>
                {catBanner?.map((e) => (
                    <Link href={`/catalog/${e.slug}`} key={e.id} className={styles.gridImgs_grid_wrapperImg}>
                      <img className={styles.gridImgs_grid_wrapperImg_img} src={e.image.link} alt={e.name} />
                    </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.blog}>
          <div className={styles.container}>
            {/* ... інший код без змін */}
            <BlogSwiper blog={blog} />
          </div>
        </section>

        <section className={styles.moreBlock}>
          <div className={styles.container}>
            <h2 className={styles.moreBlock_h2}>Слідкуйте за нами в Instagram</h2>
            <InstagramSwiper instagramBanners={instagramBanners} />
          </div>
        </section>

        {/* AboutSection - це клієнтський компонент, але він отримує дані з сервера */}
        {siteText && <AboutSection siteBanners={siteText} />}
      </>
  );
}