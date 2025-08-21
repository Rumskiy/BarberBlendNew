// src/components/Buttons/ProductButton.tsx

import Link from 'next/link';
import * as React from 'react';
import styles from './productButton.module.scss';

// ПОКРАЩЕННЯ: Оновлюємо інтерфейс пропсів для ясності та відповідності Next.js
interface ProductButtonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;

    // Якщо передано 'href', компонент буде посиланням
    href?: string;

    // Якщо передано 'onClick', компонент буде кнопкою
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

    // 'type' має сенс тільки для кнопки
    type?: "button" | "submit" | "reset";

    // Додаємо можливість відключити кнопку
    disabled?: boolean;
}

export const ProductButton: React.FC<ProductButtonProps> = ({
                                                                children,
                                                                className,
                                                                style,
                                                                href,
                                                                onClick,
                                                                type = 'button', // Встановлюємо 'button' за замовчуванням, щоб уникнути випадкових сабмітів форми
                                                                disabled = false,
                                                            }) => {
    // useNavigate більше не потрібен

    const combinedClassName = `${styles.productButton} ${className || ''}`;

    // ПОКРАЩЕННЯ: Умовний рендеринг.
    // Якщо є `href`, рендеримо компонент Link з Next.js. Це буде тег <a>.
    if (href) {
        return (
            <Link
                href={href}
                className={combinedClassName}
                style={style}
            >
                {children}
            </Link>
        );
    }

    // В іншому випадку, рендеримо звичайну кнопку <button>.
    return (
        <button
            style={style}
            type={type}
            onClick={onClick}
            className={combinedClassName}
            disabled={disabled}
        >
            {children}
        </button>
    );
};