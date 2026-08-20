import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { checkCoupon, orderCreate } from '../../../features/order/orderSlice'
import { openModal } from '../../../features/modal/modalSlice'
import { getSeminar } from '../../../features/seminar/seminarSlice'
import Spinner from '../../Common/Spinner/Spinner'
import OrderModal from '../../Modals/OrderModal'
import Image from 'next/image'
import styles from './Details.module.css'

const initialState = {
    code: ''
}

const dots = '............................................................................................................'

export default function Details({ slug }) {
    const { coupon, successMessage } = useSelector(store => store.order)
    const { isOrderModalOpen } = useSelector(store => store.modal)
    const { seminar, isLoading } = useSelector(store => store.seminar)
    const { user, googleUser } = useSelector(store => store.auth)
    const router = useRouter()
    const [values, setValues] = useState(initialState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSeminar(slug))
    }, [])

    useEffect(() => {
    }, [user, googleUser])

    useEffect(() => {
        dispatch(checkCoupon(values))
    }, [values])
    
    useEffect(() => { 

    }, [coupon])
    
    useEffect(() => { 
        if (successMessage) {
            dispatch(openModal('OrderModal'))
        }
    }, [successMessage])

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!googleUser || !user) {
            dispatch(openModal('SignUpModal'))
            return
        }
        
        let formData = { seminar_id: seminar.id }
        
        if (coupon?.exists) {
            formData = { ...formData, ...{ is_coupon: true, coupon_id: coupon.id } }
        } else {
            formData = { ...formData, ...{ is_coupon: false } }
        }

        dispatch(orderCreate(formData))
    }

    if (isLoading)
        return <Spinner />

    return (
        <div className="container">
            { isOrderModalOpen &&
                <OrderModal />
            }
            <div className={styles.wrapper}>
                <div className={styles.back__button}>
                    <button
                        onClick={() => router.back()}
                    >
                        <Image
                            src="/images/arrow-left-icon.svg"
                            width={20} 
                            height={20} 
                            alt="Arrow Left Icon"
                        />
                        Ortga qaytish
                    </button>
                </div>

                <div className={styles.details}>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className={styles.details__poster}>
                                <img
                                    src={seminar.caption}
                                    alt="Poster" 
                                />
                            </div>
                            <h2 className={styles.details__title}>
                                { seminar.title }
                            </h2>
                            <p className={styles.details__text}>
                                { seminar.short_description }
                            </p>
                        </div>
                        <div className="col-lg-5">
                            { seminar.is_purchased 
                                ?
                                <div className={styles.order}>
                                    <div className={styles.order__text}>
                                        <h3>Sana</h3>
                                        <span>{ dots }</span> 
                                        <p>{ seminar.started_at }</p>
                                    </div>
                                    <div className={styles.order__text}>
                                        <h3>Davomiyligi</h3>
                                        <span>{ dots }</span> 
                                        <p>{ seminar.duration }</p>
                                    </div>
                                    <div className={styles.order__text}>
                                        <h3>Bilet narxi</h3>
                                        <span>{ dots }</span>
                                        <p style={{ color: '#31C87F' }}>{ seminar.price } U</p>
                                    </div>
                                    <div className={styles.order__text}>
                                        <h3>Boshlanishiga qoldi</h3>
                                        <span>{ dots }</span>
                                        <p style={{ color: '#31C87F' }}>2 kun, 3 soat</p>
                                    </div>
                                    <div className={styles.order__button_enter}>
                                        <button type="submit">
                                            SEMINARGA KIRISH
                                        </button>
                                    </div>
                                </div> 
                                :
                                <div className={styles.order}>
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.order__text}>
                                            <h3>Sana</h3>
                                            <span>{ dots }</span> 
                                            <p>{ seminar.started_at }</p>
                                        </div>
                                        <div className={styles.order__text}>
                                            <h3>Davomiyligi</h3>
                                            <span>{ dots }</span> 
                                            <p>{ seminar.duration }</p>
                                        </div>
                                        <div className={styles.order__text}>
                                            <h3>Bilet narxi</h3>
                                            <span>{ dots }</span>
                                            <p style={{ color: '#31C87F' }}>{ seminar.price } U</p>
                                        </div>
                                        <div className={styles.order__coupon}>
                                            <input 
                                                type="text" 
                                                name="code"
                                                onChange={handleChange}
                                                placeholder="Promokodni kiriting"
                                            />
                                        </div>

                                        { coupon?.exists &&
                                            <>
                                                <div className={styles.order__text}>
                                                    <h3>Chegirma</h3>
                                                    <span>{ dots }</span>
                                                    <p>{ coupon.discount }</p>
                                                </div>
                                                <div className={styles.order__text}>
                                                    <h3>Oxirgi to'lov summa</h3>
                                                    <span>{ dots }</span>
                                                    <p style={{ color: '#31C87F' }}>
                                                        { parseFloat(seminar.price) - coupon.discount } U
                                                    </p>
                                                </div>
                                            </>
                                        }
                                        
                                        <div className={styles.order__button}>
                                            <button type="submit">
                                                XARID QILISH
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}