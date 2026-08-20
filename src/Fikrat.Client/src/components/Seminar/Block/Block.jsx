import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Block.module.css'

export default function Block({ seminar }) {
    const router = useRouter()
    const { locale } = router

    return (
        <Link href={`/${locale}/seminars/${seminar.slug}`}>
            <div className={styles.block__link}>
                <div 
                    className={styles.block__header} 
                    style={ { background: `no-repeat center/100% url('${seminar.caption}')`} }
                >
                    <div>
                        { seminar.duration }
                    </div>
                </div>
                <div className={styles.block__content}>
                    <h3 className={styles.block__title}>
                        { seminar.title }
                    </h3>
                    <p className={styles.block__text}>
                        { seminar.short_description }
                    </p>
                    <div className={styles.block__bottom_text}>
                        <div className={styles.block__price}>
                            { seminar.price } U
                        </div>
                        <div className={styles.block__date}>
                            { seminar.started_at }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}