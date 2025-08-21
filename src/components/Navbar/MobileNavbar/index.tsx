import {GoHeart} from "react-icons/go";
import styles from "./MobileNavbar.module.scss"
import {BsHouse} from "react-icons/bs";
import {PiShoppingCart, PiUser} from "react-icons/pi";
import {useCart} from "../../../contexts/CartContext.tsx";
import React from "react";
import {useAuth} from "../../../contexts/Auth.tsx";
import {useModal} from "../../../contexts/ModalContext.tsx";
import {useNavigate} from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

interface MobileNavbarProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void; // Цей пропс потрібен, щоб Navbar міг закрити його
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({isSearchOpen, setIsSearchOpen}) => {
    const {toggleCart, cart} = useCart();
    const {user} = useAuth();
    const {openLoginModal} = useModal();
    const nav = useNavigate();


    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleAccountClick = () => {
        !user ? openLoginModal() : nav('/account');
    }

    return (
        <nav className={styles.mobileNavbar}>
            <div className={styles.mobileNavbar_wrapper}>
                <a className={styles.mobileNavbar_items} href={'/'}>
                    <BsHouse size={24}/>
                    <p>Головна</p>
                </a>
                <button onClick={toggleSearch} className={styles.mobileNavbar_items} aria-label="Відкрити пошук">
                    <span>
                        <IoSearchOutline size={24}/>
                    </span>
                    <p>Пошук</p>
                </button>
                <a className={styles.mobileNavbar_items} href={'/favorite'}>
                    <span>
                        <GoHeart size={24}/>
                    </span>
                    <p>Вподобане</p>
                </a>
                <button className={styles.mobileNavbar_items} onClick={toggleCart}>
                    <span style={{position: 'relative'}}>
                        <PiShoppingCart size={24}/>
                        {cart && cart.items.length > 0 && (
                            <div className={styles.cartBadge}>
                                {cart.items.length}
                            </div>
                        )}
                    </span>
                    <p>Кошик</p>
                </button>
                <button className={styles.mobileNavbar_items} onClick={handleAccountClick}>
                    <PiUser
                        size={26}/>
                    <p>Профіль</p>
                </button>
            </div>
        </nav>
    );
};