"use client";

import styles from "./footer.module.scss"
import LogoIcon from "../../assets/img/icons/Barber_blend.svg"
import InstagramIcon from '../../assets/img/icons/insta.svg'
import FacebookIcon from '../../assets/img/icons/facebook.svg'
import TiktokIcon from '../../assets/img/icons/tiktok.svg'
import VisaIcon from '../../assets/img/icons/icon_visa.svg'
import MastercardIcon from '../../assets/img/icons/icon_master.svg'
import PortMoneIcon from '../../assets/img/icons/icon_portmone.svg'
import {useModal} from "@/contexts/ModalContext";
import Link from "next/link";

export const Footer = () => {
    const {openLoginModal} = useModal()

    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer_wrapper}>
                    <div className={styles.footer_links_wrapper}>
                        <div className={styles.footer_links}>
                            <div>
                                <img src={LogoIcon} alt=""/>
                            </div>
                            <ul className={styles.footer_links_item}>
                                <li><a href={'https://www.instagram.com/barberblend.official'}
                                       target="_blank"
                                       rel="noopener noreferrer"><img src={InstagramIcon} alt="insta"/></a></li>
                                <li><a href={'https://www.facebook.com/share/1AvPzFYECD/?mibextid=wwXIfr'}
                                       target="_blank"
                                       rel="noopener noreferrer"><img src={FacebookIcon} alt="facebook"/></a></li>
                                {/*<li><a href={''}*/}
                                {/*       target="_blank"*/}
                                {/*       rel="noopener noreferrer"><img src={YoutubeIcon} alt="youtube"/></a></li>*/}
                                <li><a href={'https://www.tiktok.com/@barberblend.official'}
                                       target="_blank"
                                       rel="noopener noreferrer"><img src={TiktokIcon} alt="tiktok"/></a></li>
                            </ul>
                        </div>
                        <div className={styles.footer_linksList_wrapper}>
                            <div className={styles.footer_linksList}>
                                <h2 className={styles.footer_linksList_h2}>КЛІЄНТАМ</h2>
                                <ul className={styles.footer_linksList_list}>
                                    <li onClick={() => openLoginModal()} className={styles.footer_linksList_link}>Вхід до
                                        кабінету</li>
                                    <li><Link className={styles.footer_linksList_link}
                                              href={{pathname: '/contact_information'}}>Контактна інформація</Link></li>
                                    <li><Link className={styles.footer_linksList_link} href={{pathname: '/opt'}}>Оптові
                                        закупівлі</Link></li>
                                    <li><Link className={styles.footer_linksList_link}
                                              href={{pathname: '/help'}}>Допомога</Link></li>
                                    <li><Link className={styles.footer_linksList_link}
                                              href={{pathname: '/promobox'}}>Promobox</Link></li>
                                </ul>
                            </div>
                            <div className={styles.footer_linksList}>
                                <h2 className={styles.footer_linksList_h2}>ПРО КОМПАНІЮ</h2>
                                <ul className={styles.footer_linksList_list}>
                                    <li><Link className={styles.footer_linksList_link} href={{pathname: '/about_us'}}>Про
                                        нас</Link></li>
                                    {/*<li><Link className={styles.footer_linksList_link} to={{pathname: ''}}>Наші магазини</Link></li>*/}
                                    <li><Link className={styles.footer_linksList_link}
                                              href={{pathname: '/blog'}}>Блог</Link></li>
                                </ul>
                            </div>
                            <div className={styles.footer_linksList}>
                                <h2 className={styles.footer_linksList_h2}>КОНТАКТИ</h2>
                                <ul className={styles.footer_linksList_list}>
                                    <li>
                                        <p>Клієнтський сервіс працює щодня:</p>
                                        <p>Пн-Пт 09:00 18:00</p>
                                        <p>Сб-Нд 10:00 16:00</p>
                                    </li>
                                    <li style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
                                        <a style={{color: '#000000'}} href={'telto:+380667756308'}>Телефон: +380 66 775 63 08</a>
                                        <a style={{color: '#000000'}} href={'mailto:info.barberblend@gmail.com'}>Email: info.barberblend@gmail.com</a>
                                        <p>(лише текстові повідомлення у месенджери Telegram, Viber)</p>
                                    </li>
                                    <li className={styles.footer_linksList_list_text}>

                                        <p>Волинська обл., Луцький р-н, с. Липини, вул. Волинська, 13Б</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer_buttons}>
                        <div className={styles.footer_buttons_card}>
                            <a
                                href={'https://www.portmone.com.ua/'}
                                target="_blank"
                                rel="noopener noreferrer"
                            ><img src={PortMoneIcon} alt="portmone.com"/></a>
                            <div className={styles.footer_buttons_card_wrapperImg}>
                                <img className={styles.footer_buttons_card_wrapperImg_img} src={VisaIcon}
                                     alt="visa"/>
                            </div>
                            <div className={styles.footer_buttons_card_wrapperImg}>
                                <img src={MastercardIcon} alt="visa"/>
                            </div>
                        </div>
                        <div>
                            <p className={styles.footer_buttons_text}>Оплату картами Visa і Mastercard забезпечує сервіс
                                онлайн-платежів Portmone.com. Безпека
                                оплати підтверджена міжнародним аудитом PCI DSS.</p>
                        </div>
                        <div className={styles.footer_policy}>
                            <Link className={styles.footer_policy_item} href={{pathname: '/policy'}}>Політика
                                конфіденційності</Link>
                            <Link className={styles.footer_policy_item} href={{pathname: '/contract'}}>Договір
                                оферти</Link>
                            <Link className={styles.footer_policy_item} href={{pathname: '/purchase_and_returns'}}>Купівля
                                та
                                повернення</Link>
                            <Link className={styles.footer_policy_item} href={{pathname: '/payment_and_delivery'}}>Доставка
                                та оплата</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};