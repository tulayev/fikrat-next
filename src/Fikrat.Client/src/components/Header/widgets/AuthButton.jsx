import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../features/modal/modalSlice'
import { resetStep } from '../../../features/auth/authSlice'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../Header.module.css'

export default function AuthButton() {
    const { user, googleUser } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [user, googleUser])
    
    return (
        <div className={styles.auth__button}>
            { !user && !googleUser
                ? 
                <button 
                    id={styles.loginButton}
                    type="button"
                    className="d-block m-auto text-white"
                    onClick={() =>{
                        dispatch(resetStep())
                        dispatch(openModal('SignUpModal'))
                    }}
                >
                    <Image 
                        src="/images/profile-icon.svg"
                        width={14}
                        height={14}
                        alt="Profile Icon"
                    />
                    Kirish
                </button> 
                : 
                <Link 
                    href="/profile"
                    id={styles.loginButton}
                    className="d-block text-center text-white"
                >
                    <Image 
                        src="/images/profile-icon.svg"
                        width={14}
                        height={14}
                        alt="Profile Icon"
                    />
                    { user ? user.first_name : googleUser.given_name }
                </Link>
            }
        </div>
    )
}