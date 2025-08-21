// src/contexts/ModalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const contextValue = React.useMemo(() => ({
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
    }), [isLoginModalOpen]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};