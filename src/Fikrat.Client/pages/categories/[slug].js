import Layout from '../../src/components/Layout'
import Head from 'next/head'
import Category from '../../src/components/Category/Category'
import api from '../../src/utils/api'

export default function DynamicPage({ category }) {
    return (
        <>
            <Head>
				<title>Fikrlar atolyesi</title>
				<meta name="description" content="Fikrlar atolyesi" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <Layout>
                <div className="container">
                    <div style={{ paddingTop: 14 }}>
                        <Category category={category} />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({ params }) {
    try {
        const { data } = await api.get('/categories')
        const category = data.data.categories.find(c => c.slug === params.slug)

        return {
            props: { category }
        }
    } catch {
        console.warn("API unavailable — using fallback data.")
        return {
            props: {
                category: { name: context.params.slug, description: "Data unavailable" },
            },
            revalidate: 60, // optional ISR
        };
    }
}
  
export async function getStaticPaths({ locales }) {
    try {
        const { data } = await api.get('/categories')
        const paths = data.data.categories.map((category) => locales.map((locale) => ({
            params: { slug: category.slug },
            locale
        })))
        .flat()

        return { paths, fallback: true }
    } catch {
        console.warn("API unavailable — building with no category paths.");
        return { paths: [], fallback: 'blocking' }; 
    }
}