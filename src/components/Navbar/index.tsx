// src/components/Navbar/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { GrMenu } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { PiUser, PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";

// Імпорти з нової структури
import { SideBarMenu } from "@/components/SideBarMenu";
import { ShopCart } from "@/components/ShopCart";
import { useAuth } from "@/contexts/Auth";
import { useModal } from "@/contexts/ModalContext";
import { useCart } from "@/contexts/CartContext";

import LogoIcon from "@/assets/img/icons/Barber_blend.svg";
import styles from './navbar.module.scss';

interface NavbarProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isSearchOpen, setIsSearchOpen }) => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    // Хуки з наших оновлених контекстів
    const { user, isLoading: isAuthLoading } = useAuth(); // Додаємо isLoading для уникнення мерехтіння
    const { openLoginModal } = useModal();
    const { toggleCart, cart } = useCart();

    // useNavigate більше не потрібен

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

    const handleAccountClick = () => {
        // Якщо користувач залогінений, клік на іконку профілю
        // веде на сторінку акаунту (реалізовано через <Link> нижче).
        // Якщо ні - відкриваємо модалку.
        if (!user) {
            openLoginModal();
        }
    };

    return (
        <nav className={styles.navbar}>
            <SideBarMenu open={isSideMenuOpen} setOpen={setIsSideMenuOpen} />
            <ShopCart />
            <div className={styles.container}>
                <div className={styles.navbar_wrapper}>
                    <div className={styles.navbar_buttons}>
                        <button className={styles.iconButton} onClick={toggleSideMenu} aria-label="Відкрити меню">
                            <GrMenu size={32} />
                        </button>
                        {/* ПОКРАЩЕННЯ: Ця кнопка тепер керується через CSS */}
                        <button onClick={toggleSearch} className={`${styles.iconButton} ${styles.searchIconButton}`} aria-label="Відкрити пошук">
                            {isSearchOpen ? <IoCloseOutline size={36} /> : <CiSearch size={32} />}
                        </button>
                    </div>

                    {/* ПОКРАЩЕННЯ: Використовуємо Link для головного логотипу */}
                    <Link href="/" className={styles.navbar_logoLink}>
                        {/* ПОКРАЩЕННЯ: Використовуємо next/image для оптимізації */}
                        <Image className={styles.navbar_logoMain} src={LogoIcon} alt="Barber Blend Logo" priority />
                    </Link>

                    <div className={styles.navbar_buttons}>
                        {/* ПОКРАЩЕННЯ: Використовуємо Link для навігації */}
                        <Link href="/favorite" className={`${styles.iconButton} ${styles.desktopOnly}`}>
                            <GoHeart size={26} />
                        </Link>

                        {/* ПОКРАЩЕННЯ: Умовний рендеринг на основі стану авторизації */}
                        {isAuthLoading ? (
                            <div className={styles.authPlaceholder} /> // Скелетон, поки завантажуються дані про юзера
                        ) : user ? (
                            <Link href="/account" className={`${styles.iconButton} ${styles.desktopOnly}`}>
                                <PiUser size={26} />
                            </Link>
                        ) : (
                            <button onClick={handleAccountClick} className={`${styles.iconButton} ${styles.desktopOnly}`} aria-label="Увійти в акаунт">
                                <PiUser size={26} />
                            </button>
                        )}

                        <button className={`${styles.iconButton} ${styles.cartButton}`} onClick={toggleCart} aria-label="Відкрити кошик">
                            <PiShoppingCart size={26} />
                            {cart && cart.items.length > 0 && (
                                <div className={styles.cartBadge}>
                                    {cart.items.length}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};