import Layout from '../src/components/Layout'
import { Content, Main } from '../src/components/Home'
import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>Fikrlar atolyesi</title>
				<meta name="description" content="Fikrlar atolyesi" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Main />
				<Content />
			</Layout>
		</>	
	)
}