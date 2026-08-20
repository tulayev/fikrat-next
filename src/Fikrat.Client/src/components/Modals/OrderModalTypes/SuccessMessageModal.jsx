import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../features/modal/modalSlice'
import parse from 'html-react-parser'
import styles from '../Modal.module.css'

export default function SuccessMessageModal() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { successMessage } = useSelector(store => store.order)

    return (
        <div id={styles.successMessageModal}>
            <h2>Tashakkur!</h2>
            
            <p>{ parse(successMessage) }</p>

            <div>
                <button
                    onClick={() => {
                        dispatch(closeModal())
                        router.push('/profile')
                    }}
                >
                    Tushunarli rahmat
                </button>
            </div>
        </div>
    )
}