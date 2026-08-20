import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../features/modal/modalSlice'
import { SuccessMessageModal } from './OrderModalTypes'
import styles from './Modal.module.css'

export default function OrderModal() {
    const dispatch = useDispatch()
    const { step } = useSelector(store => store.order)
    const [modal, setModal] = useState(null)

    useEffect(() => {
        switch(step) {
            case 1:
                setModal(<SuccessMessageModal />)
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