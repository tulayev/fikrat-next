import Head from 'next/head'
import Content from '../src/components/Courses/Content'
import Layout from '../src/components/Layout'

export default function Courses() {
	return (
		<>
			<Head>
				<title>Fikrlar atolyesi</title>
				<meta name="description" content="Fikrlar atolyesi" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Content />
			</Layout>
		</>	
	)
}