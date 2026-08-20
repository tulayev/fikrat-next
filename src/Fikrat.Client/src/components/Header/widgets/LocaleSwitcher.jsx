import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../Header.module.css'
import useComponentVisible from '../../../hooks/useComponentVisible'

const localesText = { uz: 'O\'ZB', oz: 'ЎЗБ' }

export default function LocaleSwitcher() {
    const router = useRouter()
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <div className={styles.locale__button}>
            <button 
                type="button"
                className="d-block m-auto text-white"
                onClick={() => setIsComponentVisible(true)}
            >
                <Image 
                    src="/images/uzb-flag-icon.svg"
                    width={18}
                    height={18}
                    alt="Uzb Flag Icon"
                />
                { localesText[router.locale] }
                <Image 
                    className={ isComponentVisible ? `${styles.arrow_up}` : `${styles.arrow_down}` }
                    src="/images/arrow-down-icon.svg"
                    width={14}
                    height={14}
                    alt="Arrow Down Icon"
                />
            </button>

            <ul 
                className={styles.dropdown__menu} 
                ref={ref}
            >
                { isComponentVisible &&
                    <>
                        { router.locales.map((locale) => (
                            <li key={locale}>
                                <Link 
                                    href={router.asPath}
                                    locale={locale}
                                    className="d-flex justify-content-center align-items-center"
                                    onClick={() => setIsComponentVisible(false)}
                                >
                                    <Image 
                                        src="/images/uzb-flag-icon.svg"
                                        width={18}
                                        height={18}
                                        alt="Uzb Flag Icon"
                                    />
                                    { localesText[locale] }
                                    { locale === router.locale &&
                                        <Image 
                                            src="/images/check-icon.svg"
                                            width={14}
                                            height={14}
                                            alt="Arrow Down Icon"
                                        />
                                    }
                                </Link>
                            </li>
                        ))}
                    </>
                }
            </ul>
        </div>
    )
}