import styles from './Home.module.css'
import Image from 'next/image'

export default function Main() {
    return (
        <main>
            <div className="container">
                <div className={styles.main__wrapper}>
                    <div className="row">
                        <div className="col-lg-8">
                            <h1 className={styles.main__title}>
                                Abdukarim Mirzayev bilan suhbat va seminarlar
                            </h1>
                        </div>

                        <div className="col-lg-4"></div>
                    </div>

                    <div>
                        <p className={styles.main__subtitle}>
                            Seminarlar 7 xil mavzuda olib boriladi
                        </p>
                    </div>
                    
                    <div>
                        <ul className={styles.main__stats_list}>
                            <li>
                                <div className="d-flex align-items-center">
                                    <Image 
                                        src="/images/video-icon-gray.svg"
                                        width={18}
                                        height={18}
                                        alt="Video Icon"
                                    />
                                    <b>82 ta</b>&nbsp;
                                    jonli seminarlar
                                </div>
                            </li>
                            <li>
                                <div className={styles.menu__splitter}></div>
                            </li>
                            <li>
                                <div className="d-flex align-items-center">
                                    <Image 
                                        src="/images/video-play-icon-gray.svg"
                                        width={18}
                                        height={18}
                                        alt="Video Icon"
                                    />
                                    <b>937 ta</b>&nbsp;
                                    video-kurslar
                                </div>
                            </li>
                            <li>
                                <div className={styles.menu__splitter}></div>
                            </li>
                            <li>
                                <div className="d-flex align-items-center">
                                    <Image 
                                        src="/images/people-icon-gray.svg"
                                        width={18}
                                        height={18}
                                        alt="Video Icon"
                                    />
                                    <b>7630 ta</b>&nbsp;
                                    o'quvchilar
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}