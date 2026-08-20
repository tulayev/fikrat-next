import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import store from '../src/stores/store'
import '../src/css/bootstrap.min.css'
import '../src/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => setShowChild(true), [])

    if (!showChild) {
        return null
    }

    if (typeof window === 'undefined') {
        return <></>
    } 

    return (
        <Provider store={store}> 
            <Script src="https://accounts.google.com/gsi/client" />
            <div className={inter.className}>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default MyApp
