import Head from 'next/head'

import Date from '../../components/date'
import Layout from '../../components/layout'

// Import CSS
import utilStyles from '../../styles/utils.module.css'

import DAO_BASE_URL from '../../config/DAO_BASE_URL'

// Get Article from DAO (Data Access Object)
export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_BASE_URL + 'article/' + params.id)
    const article = await req.json()

    const reqUser = await fetch(DAO_BASE_URL + 'user/id/' + article.user_id)
    const user = await reqUser.json()

    return { props: { article, user } }
}

// Render Article
export default function Post({ article, user }) {

    return (

        <Layout>

            <Head>
                <title>{article.title}</title>
            </Head>

            <article>

                <h1 className={utilStyles.headingXl}>{article.title}</h1>
                by <h2 className={utilStyles.headingMd}>{user.name}</h2>

                <div className={utilStyles.lightText}>
                    Updated <Date dateString={article.updated_at} />
                </div>

                <h2>Content</h2>

                {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */}
                {/* Article content */}
                <div>
                    {article.content}
                </div>

            </article>
        </Layout>
    )
}