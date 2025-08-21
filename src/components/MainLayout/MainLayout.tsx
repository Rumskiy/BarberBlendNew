"use client";

import {SideBarMenu} from "@/components/SideBarMenu";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import {useState} from "react";

// @ts-ignore
export const MainLayout = ({children, categories}) => {
    "use client";
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {/* Передаємо категорії в Navbar, якщо він їх потребує, і в SideBarMenu */}
            <SideBarMenu
                open={isSideMenuOpen}
                setOpen={setIsSideMenuOpen}
                categories={categories} // Передаємо як пропс!
            />
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
            <main>{children}</main>
            <Footer/>
        </>
    );
};