import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {
    const router = useRouter()
    const { locale } = router

    useEffect(() => {
        localStorage.setItem('locale', locale)
    }, [locale])

    return(
        <>
            <ToastContainer />
            
            <Header />
            
            { children }
            
            <Footer />
        </>
    )
}