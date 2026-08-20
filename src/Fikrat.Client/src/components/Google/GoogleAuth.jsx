import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser } from '../../features/auth/authSlice'
import { closeModal } from '../../features/modal/modalSlice'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'

export default function GoogleAuth() {
    const { googleUser } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const handleCallbackResponse = (response) => {
        const userObject = jwtDecode(response.credential)
        dispatch(signInUser(userObject))
        dispatch(closeModal())
    }

    useEffect(() => {
        /* global google */
        if (googleUser === null) {
            google.accounts.id.initialize({
                client_id: '861582288513-2d44h54029bc26rtb8h7sm8sbgpg6vje.apps.googleusercontent.com',
                callback: handleCallbackResponse
            })
    
            google.accounts.id.renderButton(
                document.getElementById('signInBtn'),
                { theme: 'outline', size: 'large', shape: 'pill', width: '300', locale: 'uz_UZ', logo_alignment: 'center' }
            )
        }
    }, [googleUser])

    return (
        <>
            { !googleUser &&
                <div id="signInBtn">
                    <Image 
                        src="/images/google-logo-icon.svg"
                        width={16}
                        height={16}
                        alt="Google Icon"
                    />
                    Google orqali davom etish
                </div> 
            }
        </>
    )
}