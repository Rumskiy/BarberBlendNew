import {useEffect, RefObject} from "react";

export const UseDisableScroll = <E extends HTMLElement>(active: boolean, scrollableRef?: RefObject<E>) => {
    useEffect(() => {
        if (!active) return;

        function preventDefault(e: Event) {
            // Якщо є scrollableRef і подія сталася всередині нього або на ньому самому
            if (scrollableRef?.current && scrollableRef.current.contains(e.target as Node)) {
                // Перевіряємо, чи елемент дійсно може прокручуватися і чи не на межі
                const el = scrollableRef.current;
                const isScrollable = el.scrollHeight > el.clientHeight;

                if (e instanceof WheelEvent) {
                    const wheelDelta = e.deltaY;
                    const isAtTop = el.scrollTop === 0;
                    const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1;

                    // Дозволяємо прокрутку, якщо вона можлива всередині елемента
                    if (isScrollable && !((wheelDelta < 0 && isAtTop) || (wheelDelta > 0 && isAtBottom))) {
                        return; // Не блокувати
                    }
                } else if (e instanceof TouchEvent) {
                    // Для тач подій логіка визначення межі складніша,
                    // поки що просто дозволяємо, якщо елемент містить ціль
                    // Можна додати більш складну логіку відстеження touchstart/touchmove
                    if (isScrollable) {
                        return; // Не блокувати
                    }
                } else {
                    // Для інших подій, якщо всередині - не блокувати
                    return;
                }
            }
            e.preventDefault();
        }

        const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
            // 37–40: стрілки ←↑→↓, 32: Space, 33–34: PageUp/PageDown, 35–36: End/Home
            const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
            if (keys.includes(e.keyCode)) {
                // Якщо фокус або ціль всередині scrollableRef, не блокувати
                if (scrollableRef?.current && scrollableRef.current.contains(e.target as Node)) {
                    // Додатково можна перевірити, чи активний елемент є самим scrollableRef або його дочірнім
                    // const activeElement = document.activeElement;
                    // if (scrollableRef.current.contains(activeElement)) {
                    //    return;
                    // }
                    return;
                }
                e.preventDefault();
            }
        };

        const wheelOpt = {passive: false} as AddEventListenerOptions;

        window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.addEventListener('wheel', preventDefault, {passive: false});
        window.addEventListener('touchmove', preventDefault, wheelOpt);
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);

        return () => {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener('wheel', preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        };
    }, [active, scrollableRef]); // Додаємо scrollableRef в залежності
};