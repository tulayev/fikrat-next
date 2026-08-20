import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { sendOtp } from '../../../features/auth/authSlice'
import { openModal } from '../../../features/modal/modalSlice'
import Image from 'next/image'
import GoogleAuth from '../../Google/GoogleAuth'
import styles from '../Modal.module.css'

const initialState = {
    phone: ''
}

export default function PhoneNumberModal() {
    const [values, setValues] = useState(initialState)
    const dispatch = useDispatch()

    const nextStep = () => {
        dispatch(openModal())
    }

    const handleChange = (e) => { 
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }

    const handleKeydown = (e) => {
        const regex = new RegExp(/[0-9]/)
        const { key } = e

        if (!regex.test(key) && key !== 'Backspace') 
            e.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { phone } = values
        
        if (!phone) {
            toast.error('Iltimos raqamni kiriting')
            return
        }

        dispatch(sendOtp({ phone: `998${phone}` }))
        nextStep()
    }

    return (
        <div id={styles.signInForm}>
            <h2>
                Ro‘yxatdan o‘tish / Kirish
            </h2>
            
            <p>Telefon raqamingizni kiriting yoki gmail orqali davom ettiring</p>
            
            <form className="d-flex align-items-center" onSubmit={ handleSubmit }>
                <div className={styles.code}>
                    +998
                </div>
                <input 
                    name="phone"
                    type="text"
                    placeholder="Tel.raqamingiz" 
                    onChange={ handleChange }
                    pattern="\d*"
                    maxLength="9"
                    inputMode="numeric"
                    onKeyDown={ handleKeydown }
                />
                <button type="submit">
                    <Image 
                        src="/images/arrow-right-white-icon.svg"
                        width={24}
                        height={24}
                        alt="Arrow Right Icon"
                    />
                </button>
            </form>
            
            <div className={styles.text}>
                YOKI
            </div>
            
            <GoogleAuth />
        </div>
    )
}