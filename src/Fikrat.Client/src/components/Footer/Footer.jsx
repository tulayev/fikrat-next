import styles from './Footer.module.css'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__splitter}></div>

            <div className="container">
                <div className={styles.wrapper}>
                    <div>
                        <Image 
                            className={styles.footer__logo}
                            src="/images/logo-icon.png"
                            width={100}
                            height={100}
                            alt="Logo Footer"
                        />
                    </div>

                    <div className="row">
                        <div className="col-12 col-lg-3 m-auto">
                            <h2 className={styles.footer__title}>
                                Abdukarim Mirzayev bilan suhbat va seminarlar
                            </h2>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12 col-lg-3 m-auto">
                            <div className={styles.icons__wrapper}>
                                <div className={styles.icons__item}>
                                    <a
                                        href="https://telegram.org"
                                        target="_blank"
                                    >
                                        <Image
                                            src="/images/telegram-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="Telegram Icon"
                                        />
                                    </a>
                                </div>
                                <div className={styles.icons__item}>
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                    >
                                        <Image
                                            src="/images/instagram-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="Instagram Icon"
                                        />
                                    </a>
                                </div>
                                <div className={styles.icons__item}>
                                    <a
                                        href="https://telegram.org"
                                        target="_blank"
                                    >
                                        <Image
                                            src="/images/facebook-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="Facebook Icon"
                                        />
                                    </a>
                                </div>
                                <div className={styles.icons__item}>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                    >
                                        <Image
                                            src="/images/twitter-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="Twitter Icon"
                                        />
                                    </a>
                                </div>
                                <div className={styles.icons__item}>
                                    <a
                                        href="https://www.youtube.com"
                                        target="_blank"
                                    >
                                        <Image
                                            src="/images/youtube-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="YouTube Icon"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer__splitter}></div>
            
            <div className="container">
                <p className={styles.copyright_text}>
                    © Fikr atolyesi, 2022. All rights reserved. Copying information from the site is prohibited.
                </p>
            </div>
        </footer>
    )
}