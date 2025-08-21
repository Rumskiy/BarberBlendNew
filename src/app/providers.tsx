'use client';

import React, {useEffect} from "react";
import {AuthProvider} from "@/contexts/Auth";
import {ModalProvider} from "@/contexts/ModalContext";
import {CartProvider} from "@/contexts/CartContext";
import {ModalCheckoutProvider} from "@/contexts/ModalFastCheckoutContext";
import {antdThemeConfig} from "@/theme";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {createGuestToken} from "@/lib/api/auth";

export function Providers({ children }: { children: React.ReactNode }) {


    useEffect(() => {
        const loadGuestToken = async () => {
            const storedGuestToken = localStorage.getItem('guestToken'); // Перевіряємо localStorage
            if (storedGuestToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedGuestToken}`;
            } else {
                try {
                    const response = await createGuestToken(); // Запит нового токена
                    const newGuestToken = response.guest_token;
                    localStorage.setItem('guestToken', newGuestToken); // Зберігаємо новий токен
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newGuestToken}`; // Встановлюємо
                } catch (e) {
                }
            }
        };

        loadGuestToken();
    }, []);

    return (
        <AuthProvider>
            <ModalProvider>
                <CartProvider>
                    <ModalCheckoutProvider>
                        <ConfigProvider theme={antdThemeConfig}>
                            {children}
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                                toastStyle={{
                                    backgroundColor: '#DD5D03',
                                    color: '#ffffff'
                                }}
                            />
                        </ConfigProvider>
                    </ModalCheckoutProvider>
                </CartProvider>
            </ModalProvider>
        </AuthProvider>
    );
}