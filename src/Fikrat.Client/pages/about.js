import { Main, Content } from '../src/components/About'
import Layout from '../src/components/Layout'
import Head from 'next/head'

export default function About() {
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