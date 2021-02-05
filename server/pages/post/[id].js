import Head from 'next/head'

import Date from '../../components/date'
import Layout from '../../components/layout'

// Import CSS
import utilStyles from '../../styles/utils.module.css'

import DAO_BASE_URL from '../../config/DAO_BASE_URL'

export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_BASE_URL + 'article/' + params.id)
    const article = await req.json()

    return { props: { article } }
}

export default function Post({ article }) {

    return (

        <Layout>

            <Head>
                <title>{article.title}</title>
            </Head>

            <article>

                <h1 className={utilStyles.headingXl}>{article.title}</h1>
                <div className={utilStyles.lightText}>
                    Updated <Date dateString={article.updated_at} />
                </div>

                <h2>Content</h2>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />

            </article>
        </Layout>
    )
}