import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { LocaleSwitcher, AuthButton, BurgerMenu } from './widgets'
import useTranslation from 'next-translate/useTranslation'
import SignUpModal from '../Modals/SignUpModal'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
    const { isSignUpModalOpen } = useSelector(store => store.modal)
    const router = useRouter()
    const { t, lang } = useTranslation()

    return (
        <header className={styles.header}>
            { isSignUpModalOpen &&
                <SignUpModal/>
            }

            <div className="container">
                <div className={styles.wrapper}>
                    <div className="row align-items-center">
                        <div className="col-2 col-md-1 col-lg-1">
                            <Link href="/">
                                <Image
                                    className={styles.logo}
                                    src="/images/logo-icon.png"
                                    width={50}
                                    height={50}
                                    alt="Logo"
                                />
                            </Link>
                        </div>

                        <div className="col-8 col-md-7 col-lg-8">
                            <nav className={styles.menu}>
                                <ul className="d-flex align-items-center">
                                    <li>
                                        <div className={styles.menu__splitter}></div>
                                    </li>
                                    <li className={router.pathname === '/' ? `${styles.active}` : ''}>
                                        <Link
                                            href="/"
                                            className="d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/video-icon.svg"
                                                width={24}
                                                height={24}
                                                alt="Video Icon"
                                            />
                                            Jonli seminarlar
                                        </Link>
                                    </li>
                                    <li className={router.pathname === '/courses' ? `${styles.active}` : ''}>
                                        <Link
                                            href="/courses"
                                            className="d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/video-play-icon.svg"
                                                width={24}
                                                height={24}
                                                alt="Video Icon"
                                            />
                                            Video-kurslar
                                        </Link>
                                    </li>
                                    <li className={router.pathname === '/about' ? `${styles.active}` : ''}>
                                        <Link
                                            href="/about"
                                            className="d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/people-icon.svg"
                                                width={24}
                                                height={24}
                                                alt="Video Play Icon"
                                            />
                                            Biz haqimizda
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-2 col-md-4 col-lg-3">
                            <nav className={styles.menu__right}>
                                <ul className="d-flex justify-content-end">
                                    {/* Auth Button */}
                                    <li>
                                        <AuthButton />
                                    </li>

                                    {/* Locale Switcher */}
                                    <li>
                                        <LocaleSwitcher />
                                    </li>
                                </ul>
                            </nav>

                            {/* Burger Menu */}
                            <BurgerMenu />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}