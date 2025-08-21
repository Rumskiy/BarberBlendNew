import {ReactNode, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    children: ReactNode;
}

export function ScrollToTop({ children }: ScrollToTopProps) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // 2) Повертаємо саме children, щоб вони рендерилися
    return <>{children}</>;
}
