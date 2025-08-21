import {useState, useRef, useEffect} from 'react';
import styles from './aboutSection.module.scss';
import {SiteBanners} from "../../../model.tsx";
import parse from "html-react-parser";
import {Skeleton} from "components/Skeleton";
import {useWindowSize} from "../../../hooks/WindoSize/useWindowSize.tsx"; // Переконайтесь, що шлях правильний

interface SiteBanner {
    siteBanners: SiteBanners;
    loading?: boolean;
}

export const AboutSection: React.FC<SiteBanner> = ({siteBanners, loading}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState<string | number>('auto');
    const textContentRef = useRef<HTMLParagraphElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);
    const width = useWindowSize();

    const initialVisibleHeight = '1.5em'; // Така ж, як у CSS варіанті

    useEffect(() => {
        if (textWrapperRef.current && textContentRef.current) {
            if (isExpanded) {
                setContentHeight(textContentRef.current.scrollHeight);
            } else {
                setContentHeight(initialVisibleHeight);
            }
        }
    }, [isExpanded, initialVisibleHeight]);


    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className={styles.aboutSection}>
            {!loading ? <div className={styles.container}>
                <div className={styles.aboutSection_wrapper}>
                    <div>
                        <h2 className={styles.aboutSection_h2}>{siteBanners.title}</h2>
                    </div>
                    <div>
                        <div
                            ref={textWrapperRef}
                            className={`${styles.textWrapperReact} ${isExpanded ? styles.expanded : ''}`}
                            style={{maxHeight: contentHeight}} // Динамічно встановлюємо max-height
                        >
                            <p ref={textContentRef} className={styles.aboutSection_text}>
                                {parse(siteBanners.desc)}
                            </p>
                        </div>
                        <button onClick={toggleReadMore} className={styles.aboutSection_buttonReact}>
                            {isExpanded ? 'ЗАКРИТИ' : 'ЧИТАТИ ПОВНІСТЮ'}
                        </button>
                    </div>
                </div>
            </div> : <Skeleton style={{height: `${width < 576 ? '20dvh' : width < 1024 ? '20dvh' : '20dvh'}`}}/>}
        </section>
    );
};