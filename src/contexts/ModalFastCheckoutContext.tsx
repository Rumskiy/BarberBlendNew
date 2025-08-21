import {createContext, useState, useContext, ReactNode, useCallback, useMemo} from 'react';

export interface FastCheckoutProductInfo {
    product_id: number;
    quantity: number;
}

interface ModalFastCheckoutContextType {
    isCheckoutOpen: boolean;
    openCheckoutModal: (productData: FastCheckoutProductInfo) => void;
    closeCheckoutModal: () => void;
    productInfo: FastCheckoutProductInfo | null;
}

const ModalFastCheckoutContext = createContext<ModalFastCheckoutContextType | undefined>(undefined);

export const ModalCheckoutProvider = ({children}: { children: ReactNode }) => {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [productInfo, setProductInfo] = useState<FastCheckoutProductInfo | null>(null);

    const openCheckoutModal = useCallback((productData: FastCheckoutProductInfo) => {
        setProductInfo(productData)
        setIsCheckoutOpen(true)
    }, []);
    const closeCheckoutModal = useCallback(() => {
        setIsCheckoutOpen(false)
        setProductInfo(null);
    }, []);

    const contextValue = useMemo(() => ({
        isCheckoutOpen,
        productInfo,
        openCheckoutModal,
        closeCheckoutModal,
    }), [isCheckoutOpen, productInfo, openCheckoutModal, closeCheckoutModal]);

    return (
        <ModalFastCheckoutContext.Provider value={contextValue}>
            {children}
        </ModalFastCheckoutContext.Provider>
    );
};

export const useModalFastCheckout = () => {
    const context = useContext(ModalFastCheckoutContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};