import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Main from '../src/components/Profile/Main'
import Layout from '../src/components/Layout'
import api from '../src/utils/api'
import Head from 'next/head'

export default function Profile() {
    const router = useRouter()
    const { user, googleUser } = useSelector(store => store.auth)

    useEffect(() => {
        const verifyAuthenticated = async () => {
            try {
                const { data } = await api.get('/auth/me')
                if (!data.success) {
                    router.push('/')
                } 
            } catch (error) {
                router.push('/')
            }
        }

        if (!googleUser) {
            verifyAuthenticated()
        }
    }, [user, googleUser])

	return (
		<>
			<Head>
				<title>Fikrlar atolyesi</title>
				<meta name="description" content="Fikrlar atolyesi" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Main />
			</Layout>
		</>	
	)
}