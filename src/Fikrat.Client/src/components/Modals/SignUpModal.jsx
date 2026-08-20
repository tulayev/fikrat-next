import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../features/modal/modalSlice'
import { PhoneNumberModal, ConfirmCodeModal, PersonalDataModal } from './SignUpModalTypes'
import styles from './Modal.module.css'

export default function SignUpModal() {
    const dispatch = useDispatch()
    const { step } = useSelector(store => store.auth)
    const [modal, setModal] = useState(null)

    useEffect(() => {
        switch(step) {
            case 1:
                setModal(<PhoneNumberModal />)
                break
            case 2:
                setModal(<ConfirmCodeModal />)
                break
            case 3:
                setModal(<PersonalDataModal />)
                break
            default: 
                setModal(null)   
                break
        }
    }, [step])

    return (
        <div 
            className={styles.modal}
            onClick={() => dispatch(closeModal())}
        >
            <div 
                className={styles.modal__box} 
                onClick={(e) => e.stopPropagation()}
            >
                { modal }
            </div>
        </div>
    )
}