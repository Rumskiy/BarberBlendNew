'use client';

import React from "react";
import {AuthProvider} from "@/contexts/Auth";
import {ModalProvider} from "@/contexts/ModalContext";
import {CartProvider} from "@/contexts/CartContext";
import {ModalCheckoutProvider} from "@/contexts/ModalFastCheckoutContext";
import {antdThemeConfig} from "@/theme";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
    // Логіку для гостьового токену можна перенести сюди,
    // оскільки це клієнтський ефект, який має виконуватись один раз.
    React.useEffect(() => {
        const loadGuestToken = async () => {
            // ... твоя логіка з useEffect з App.tsx
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