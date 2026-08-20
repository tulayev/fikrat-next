import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../Header.module.css'
import AuthButton from './AuthButton'

const localesText = { uz: 'O\'ZB', oz: 'ЎЗБ' }

export default function BurgerMenu() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={styles.menu__burger}>
            <button onClick={handleOpen}>
                <Image 
                    className={styles.burger__open_img}
                    src="/images/burger-icon.svg"
                    width={50}
                    height={50}
                    alt="Burger Menu Icon"
                />
            </button>

            { open &&
                <div className={styles.menu__burger_wrapper}>
                    <div className="container">
                        <div className={styles.menu__burger_button}>
                            <button
                                onClick={handleOpen}
                            >
                                <Image 
                                    className={styles.burger__close_img}
                                    src="/images/close-icon.svg"
                                    width={50}
                                    height={50}
                                    alt="Burger Menu Close Icon"
                                />
                            </button>
                        </div>

                        <div className={styles.menu__burger_content}>
                            <ul>
                                <li>
                                    <Link href="/">
                                        Jonli seminarlar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses">
                                        Video-kurslar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        Biz haqimizda
                                    </Link>
                                </li>
                                <li onClick={handleOpen}>
                                    <AuthButton />
                                </li>
                                <li>
                                    <div className={styles.locale__button_mobile}>
                                        { router.locales.map((locale) => (
                                            <Link
                                                key={locale} 
                                                href={router.asPath}
                                                locale={locale}
                                                style={{ color: locale !== router.locale && "#151515" }}
                                                onClick={() => handleOpen}
                                            >
                                                { localesText[locale] }
                                            </Link>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}