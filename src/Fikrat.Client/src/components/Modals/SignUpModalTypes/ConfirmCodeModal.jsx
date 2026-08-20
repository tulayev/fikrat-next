import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../../features/modal/modalSlice'
import { verifyOtp, prevStep, getAuthenticatedUser } from '../../../features/auth/authSlice'
import { toast } from 'react-toastify'
import OtpInput from '../../Common/Otp/OtpInput'
import styles from '../Modal.module.css'

export default function ConfirmCodeModal() {
    const [otp, setOtp] = useState('')
    const onChange = (value) => setOtp(value)
    const { otpMessage, otpToken, userExists } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userExists && otpToken) {
            dispatch(getAuthenticatedUser())
            dispatch(closeModal())
        } else {
            nextStep()
        }
    }, [otpToken, userExists])

    const goBack = () => {
        dispatch(prevStep())
        dispatch(openModal())
    }

    const nextStep = () => {
        dispatch(openModal())
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const phone = JSON.parse(localStorage.getItem('phone')) || null
        const code = { code: otp }

        if (!otp || !phone) {
            toast.error('Iltimos kodni kiriting')
            return
        } 

        const formData = { ...phone, ...code }
        dispatch(verifyOtp(formData))
    }
    
    return (
        <div id={styles.confirmForm}>
            <h2>
                Kodni kiriting
            </h2>
            
            <p>
                { otpMessage }
            </p>
            
            <form onSubmit={ handleSubmit }>
                <div className="d-flex justify-content-between">
                    <OtpInput 
                        value={otp}
                        valueLength={4}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type="submit">
                        Davom ettirish
                    </button>
                    <button onClick={ () => goBack() }>
                        Ortga
                    </button>
                </div>
            </form>
        </div>
    )
}