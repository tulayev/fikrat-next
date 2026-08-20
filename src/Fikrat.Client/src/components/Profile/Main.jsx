import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { getOrders } from '../../features/order/orderSlice'
import { openModal } from '../../features/modal/modalSlice'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Profile.module.css'
import ProfileModal from '../Modals/ProfileModal'

const initialState = {
    type: 'upcoming'
}

export default function Main() {
    const router = useRouter()
    const { locale } = router
    const [params, setParams] = useState(initialState)
    const { orders } = useSelector(store => store.order)
    const { isProfileModalOpen } = useSelector(store => store.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders(params))
    }, [params])

    return (
        <main>
            { isProfileModalOpen &&
                <ProfileModal />
            }
            <div className="container">
                <div className={styles.wrapper}>
                    <div>
                        <Link 
                            href="/"
                            className="d-flex align-items-center"
                        >
                            <Image
                                width={20}
                                height={20}
                                src="/images/arrow-left-icon.svg"
                                alt="Arrow Left Icon" 
                            />
                            Bosh sahifaga qaytish
                        </Link>
                    </div>
                    
                    <div className={styles.seminars__wrapper}>
                        <Tabs>
                            <div className="row">
                                <div className="col-md-3">
                                    <TabList className={styles.seminars__tab}>
                                        <Tab onClick={() => setParams({ type: 'upcoming' })}>
                                            Kelasi seminarlar 
                                        </Tab>
                                        <Tab onClick={() => setParams({ type: 'viewed' })}>
                                            Ko'rilgan seminarlar 
                                        </Tab>
                                        <Tab>
                                            Sertifikatlarim
                                        </Tab>
                                        <Tab>
                                            Profil ma'lumotlarim
                                        </Tab>
                                        <li onClick={() => dispatch(openModal('ProfileModal'))}>
                                            Profildan chiqish
                                        </li>
                                    </TabList>
                                </div>

                                <div className="col-md-9">
                                    <TabPanel>
                                        { orders.map((order) => (
                                            <div
                                                key={order.id} 
                                                className={styles.seminars__content}
                                            >
                                                <div>
                                                    <h3>Nomi</h3>
                                                    <p>{ order.seminar.title }</p>
                                                </div>
                                                <div className="text-end">
                                                    <h3>Bo'lib o'tgan sana</h3>
                                                    <p>{ order.seminar.started_at }</p>
                                                </div>
                                                <div className="text-end">
                                                    <Link href={`/${locale}/seminars/${order.seminar.slug}`}>
                                                        Batafsil
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPanel>
                                    <TabPanel>
                                        { orders.map((order) => (
                                            <div
                                                key={order.id} 
                                                className={styles.seminars__content}
                                            >
                                                <div>
                                                    <h3>Nomi</h3>
                                                    <p>{ order.seminar.title }</p>
                                                </div>
                                                <div className="text-end">
                                                    <h3>Bo'lib o'tgan sana</h3>
                                                    <p>{ order.seminar.started_at }</p>
                                                </div>
                                                <div className="text-end">
                                                    <Link href={`/${locale}/seminars/${order.seminar.slug}`}>
                                                        Batafsil
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>Sertifikatlarim</h2>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>Profil ma'lumotlarim</h2>
                                    </TabPanel>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </main>
    )
}