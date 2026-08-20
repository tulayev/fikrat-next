import { useDispatch } from 'react-redux'
import { closeModal } from '../../features/modal/modalSlice'
import { logoutUser } from '../../features/auth/authSlice'
import styles from './Modal.module.css'

export default function ProfileModal() {
    const dispatch = useDispatch()

    return (
        <div 
            className={styles.modal}
            onClick={() => dispatch(closeModal())}
        >
            <div 
                className={styles.modal__box} 
                onClick={(e) => e.stopPropagation()}
            >
                <div id={styles.profileModal}>
                    <h2>Profildan chiqasizmi?</h2>
                    
                    <p>Rostdan ham ushbu profildan chiqasizmi?</p>

                    <div className="d-flex">
                        <button onClick={() => dispatch(closeModal())}>
                            Yo'q
                        </button>
                        <button
                            onClick={() => {
                                dispatch(logoutUser())
                                dispatch(closeModal())
                            }}
                        >
                            Ha
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}