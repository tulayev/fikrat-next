import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../features/category/categorySlice'
import Category from '../Category/Category'
import Spinner from '../Common/Spinner/Spinner'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Home.module.css'

export default function Content() {
    const router = useRouter()
    const { locale } = router
    const { isLoading, categories } = useSelector(store => store.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories({ type: 'live', seminar_limit: 3 }))
    }, [])

    if (isLoading)
        return <Spinner />

    return (
        <section>
            <div className="container">
                <div className={styles.content__wrapper}>
                    { categories.map((category) => (
                        <div key={category.id}>
                            <div className="row align-items-center">
                                <div className="col-9 col-md-10">
                                    <div>
                                        <h2 className={styles.content__title}>
                                            { category.name }
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-3 col-md-2">
                                    <div className={styles.content__link}>
                                        <Link href={`/${locale}/categories/${category.slug}`}>
                                            <span>
                                                Barchasi
                                            </span>
                                            <Image
                                                src="/images/arrow-right-icon.svg"
                                                width={18}
                                                height={18}
                                                alt="Arrow Right Icon"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div key={category.id}>
                                <Category 
                                    category={category}
                                    homePage={true} 
                                /> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}