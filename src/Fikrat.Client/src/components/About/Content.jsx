import Image from 'next/image'
import styles from './About.module.css'

export default function Content() {
    return (
        <section>
            <div className="container">
                <div className={styles.content__wrapper}>
                    <h2 className={styles.content__title}>
                        Nega qatnashishim kerak?
                    </h2>

                    <div className="row">
                        <div className="col">
                            <div className={styles.content__item}>
                                <Image 
                                    src="/images/medal-star-icon.svg" 
                                    width={30}
                                    height={30}
                                    alt="Medal Star Icon" 
                                />
                            </div>
                            <div className={styles.content__text}>
                                Karyerangizga sarmoya kiritishga
                            </div>
                        </div>
                        <div className="col">
                            <div className={styles.content__item}>
                                <Image 
                                    src="/images/signpost-icon.svg" 
                                    width={30}
                                    height={30}
                                    alt="Signpost Icon" 
                                />
                            </div>
                            <div className={styles.content__text}>
                                O'zingizni rivojlantirish uchun 
                            </div>
                        </div>
                        <div className="col">
                            <div className={styles.content__item}>
                                <Image 
                                    src="/images/cup-icon.svg" 
                                    width={30}
                                    height={30}
                                    alt="Cup Icon" 
                                />
                            </div>
                            <div className={styles.content__text}>
                                Tajribalardan foydalanish uchun
                            </div>
                        </div>
                        <div className="col">
                            <div className={styles.content__item}>
                                <Image 
                                    src="/images/courthouse-icon.svg" 
                                    width={30}
                                    height={30}
                                    alt="Courthouse Icon" 
                                />
                            </div>
                            <div className={styles.content__text}>
                                O'ziga xos shaxsga aylanish uchun
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}