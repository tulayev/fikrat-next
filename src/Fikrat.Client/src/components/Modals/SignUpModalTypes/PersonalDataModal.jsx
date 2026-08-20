import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../features/modal/modalSlice'
import { signUp, getAuthenticatedUser } from '../../../features/auth/authSlice'
import { toast } from 'react-toastify'
import styles from '../Modal.module.css'

const initialState = {
    first_name: '',
    last_name: ''
}

export default function PersonalDataModal() {
    const [values, setValues] = useState(initialState)
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        if (user) {
            dispatch(closeModal())
        }
    }, [user])

    const handleChange = (e) => { 
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { first_name, last_name, } = values
        
        if (!first_name || !last_name) {
            toast.error('Iltimos ma\'lumotni kiriting')
            return
        }
        
        dispatch(signUp(values))
    }
    
    return (
        <div id={styles.personalDataForm}>
            <h2>
                Shaxsiy ma'lumotlar
            </h2>
            
            <p>
                Ism va familiyangizni kiriting
            </p>
            
            <form onSubmit={ handleSubmit }>
                <div className="d-flex justify-content-between">
                    <input 
                        name="first_name"
                        type="text"
                        placeholder="Ism"
                        onChange={ handleChange }
                    />
                    <input 
                        name="last_name"
                        type="text"
                        placeholder="Familiya"
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <button type="submit">
                        Davom etish
                    </button>
                </div>
            </form>
        </div>
    )
}