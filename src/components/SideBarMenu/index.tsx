import React, {RefObject, useEffect, useRef, useState} from "react";
import styles from './sideBarMenu.module.scss'; // Модульні стилі

// Імпорт іконок (припустимо, що у вас є react-icons)
import {IoCloseOutline} from 'react-icons/io5'; // Іконка закриття
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import InstagramIcon from '../../assets/img/icons/insta.svg'
import FacebookIcon from '../../assets/img/icons/facebook.svg'
import TiktokIcon from '../../assets/img/icons/tiktok.svg'
import {PiUser} from "react-icons/pi";
import {CiBullhorn, CiCircleMore, CiMobile3, CiShoppingBasket, CiViewTimeline} from "react-icons/ci";
import {GoHeart} from "react-icons/go";
import {RemoveScroll} from "react-remove-scroll";
import {useAuth} from "@/contexts/Auth";
import {useModal} from "@/contexts/ModalContext";
import {Category, SubCategory} from "@/model";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SideBarMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    categories: Category[];
}

export const SideBarMenu: React.FC<SideBarMenuProps> = ({open, setOpen, categories }) => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const router = useRouter();
    const { openLoginModal } = useModal();
    const { user } = useAuth();

    // useEffect для завантаження даних більше не потрібен!

    const handleCategoryClick = (categoryId: number, categorySlug: string, subCategories: SubCategory[]) => {
        if (!subCategories || subCategories.length === 0) {
            router.push(`/catalog/${categorySlug}`);
            closeMenu();
        } else if (activeAccordion === categoryId) {
            router.push(`/catalog/${categorySlug}`);
            closeMenu();
        } else {
            setActiveAccordion(categoryId);
        }
    };

    const closeMenu = () => {
        setOpen(false);
        setActiveAccordion(null);
    };

    const handleLinkClick = (path: string) => {
        closeMenu();
        router.push(path);
    };

    const handleAccountClick = () => {
        closeMenu();
        if (!user) {
            openLoginModal();
        } else {
            router.push('/account');
        }
    };

    if (!open) return null;

    return (
        <div onClick={closeMenu} className={`${styles.sideBarOverlay} ${open ? styles.openOverlay : ''}`}>
            <RemoveScroll>
                <aside className={styles.sideBarMenuContent} onClick={e => e.stopPropagation()}>
                    <button onClick={closeMenu} className={styles.closeButton} aria-label="Закрити меню">
                        <IoCloseOutline size={30} />
                    </button>

                    <nav>
                        <h2 className={styles.menuTitle}>Каталог</h2>
                        <ul className={styles.categoryList}>
                            {/* ПОКРАЩЕННЯ: Використовуємо Link */}
                            <li>
                                <Link href="/catalog" onClick={closeMenu} className={styles.textButton}>
                                    Переглянути усі товари
                                </Link>
                            </li>
                            {categories?.map(category => (
                                <li key={category.id} className={styles.categoryItem}>
                                    <div onClick={() => handleCategoryClick(category.id, category.slug, category.sub_category)} className={styles.categoryHeader}>
                                        <span>{category.name}</span> {/* Зробили текстом, бо клік на весь div */}
                                        {category.sub_category?.length > 0 && (
                                            <span className={styles.accordionToggle}>
                                                {activeAccordion === category.id ? <IoIosArrowDown size={20} /> : <IoIosArrowForward size={20} />}
                                            </span>
                                        )}
                                    </div>

                                    {category.sub_category?.length > 0 && (
                                        <div className={`${styles.subCategoryAccordion} ${activeAccordion === category.id ? styles.open : ''}`}>
                                            <ul>
                                                {category.sub_category.map(sub => (
                                                    <li key={sub.id}>
                                                        {/* ПОКРАЩЕННЯ: Link для підкатегорій */}
                                                        <Link href={`/catalog/${category.slug}/${sub.slug}`} onClick={closeMenu} className={styles.subCategoryButton}>
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <ul className={styles.navList}>
                            {/* Навігаційні посилання */}
                            <NavItem icon={<GoHeart size={26}/>} onClick={() => handleLinkClick('/favorite')}>Обране</NavItem>
                            <NavItem icon={<PiUser size={26}/>} onClick={handleAccountClick}>Профіль</NavItem>
                        </ul>
                        <ul className={styles.navList}>
                            {/* Інформаційні посилання */}
                            <NavItem icon={<CiShoppingBasket size={26}/>} onClick={() => handleLinkClick('/opt')}>Оптові закупівлі</NavItem>
                            {/* ... інші посилання ... */}
                        </ul>
                        <ul className={styles.socialList}>
                            {/* Соціальні посилання */}
                        </ul>
                    </nav>
                </aside>
            </RemoveScroll>
        </div>
    );
};

// @ts-ignore
const NavItem = ({ icon, children, onClick }) => (
    <li>
        <button onClick={onClick} className={styles.navItemButton}>
            {icon}
            <span>{children}</span>
        </button>
    </li>
);