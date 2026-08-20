import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getSeminars } from '../../features/seminar/seminarSlice'
import Image from 'next/image'
import Spinner from '../Common/Spinner/Spinner'
import Block from '../Seminar/Block/Block'
import styles from './Category.module.css'

export default function Category({ category, homePage }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const { seminars, isLoading } = useSelector(store => store.seminar)

    useEffect(() => {
        dispatch(getSeminars(category.slug))
    }, [])

    if (isLoading)
        return <Spinner />

    return (
        <div>
            { !homePage &&
                <div>
                    <div className={styles.back__button}>
                        <button onClick={() => router.back()}>
                            <Image
                                src="/images/arrow-left-icon.svg"
                                width={20} 
                                height={20} 
                                alt="Arrow Left Icon"
                            />
                            Ortga qaytish
                        </button>
                    </div>

                    <h2 className={styles.category__title}>
                        { category.name }
                    </h2>
                </div>
            }
            <div className="row">
                { homePage ?
                    category.seminars.map((seminar) => (
                        <div className="col-12 col-md-6 col-lg-4" key={seminar.id}>
                            <Block seminar={seminar} />
                        </div>
                    )) : 
                    seminars.map((seminar) => (
                        <div className="col-12 col-md-6 col-lg-4" key={seminar.id}>
                            <Block seminar={seminar} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}