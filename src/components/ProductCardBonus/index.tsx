import {RxCross1} from "react-icons/rx";
import {CiHeart} from "react-icons/ci";
import styles from "./productCardBonus.module.scss";
import {ProductButton} from "components/Buttons/ProductButton";
import {SlPresent} from "react-icons/sl";
import React, {useState} from "react";
import ProductPhoto from 'photos/productCard.png';
import {useNavigate} from "react-router-dom";

interface ProductCardProps {
    popular?: boolean;
    discount?: boolean;
    bonus?: boolean;
}

export const ProductCardBonus: React.FC<ProductCardProps> = (props) => {
    const [bonusOpen, setBonusOpen] = useState(false);
    const nav = useNavigate();

    return (
        <div className={styles.productCard}>
            {props.popular ? <div className={styles.productCard_newItem}><p>Хіт</p></div> : null}
            {props.bonus ? <SlPresent size={24} className={styles.productCard_bonus}
                                      onClick={() => setBonusOpen(!bonusOpen)}/> : null}
            {bonusOpen ? <div className={styles.productCard_bonus_open}>
                <RxCross1 size={16} onClick={() => setBonusOpen(!bonusOpen)}
                          className={styles.productCard_bonus_open_cross}/>
                <img src={''} alt="iten_bonus"/>
                <div>
                    <h3>Парфумований гель для душу Oxford</h3>
                    <p>Парфумований гель для душу Oxford - це гель для душу</p>
                </div>
            </div> : null}
            <div onClick={() => nav(`product/:id`)} className={styles.productCard_img_wrapper}>
                <img className={styles.productCard_img} src={ProductPhoto} alt=""/>
            </div>
            <div className={styles.productCard_infoText}>
                <div className={styles.productCard_title}>
                    <p onClick={() => nav(`product/:id`)} className={styles.productCard_title_h2}>Product Name Product
                        NameProduct NameProduct NameProduct
                        NameProduct Name</p>
                    <button><CiHeart size={32}/></button>
                </div>
                <div className={styles.productCard_subtext}>
                    <p className={styles.productCard_subtext_text}>SubText 2 columns SubText 2 columnsSubText 2
                        columnsSubText 2 columnsSubText 2 columnsSubText 2 columnsSubText 2 columnsSubText 2
                        columnsSubText 2 columns</p>
                    <p>100 мл</p>
                </div>
            </div>
            {props.bonus &&
                <div className={styles.productCard_cost}>
                    <h3 className={styles.productCard_cost_h3_discount}>A huy tobi</h3>
                </div>}
            <ProductButton children={'Додати в кошик'}/>
        </div>
    );
};