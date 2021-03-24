// Import pre-installed modules
import Head from 'next/head'
import Link from 'next/link'

// Import custom components
import DateFormat from '../../components/date'
import Layout from '../../components/layout'

// Import CSS
import styles from './styles.module.css'

// Import Constants
import { DAO_ENDPOINT_ARTICLE, DAO_ENDPOINT_USER } from '../../config/dao'

// Articles
const article404 = { title: 'Article does not exist', content: '404 not found' }
const article500 = { title: 'Server error', content: '502 Bad Gateway' }

// Get data from the API:
// This function is executed before the rendering of the HTML page.
// The return pass the data as parameters to the rendering function.
export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_ENDPOINT_ARTICLE + 'id/' + params.id)

    // Test HTTP request result
    let article
    let doGetUser = false

    // Test HTTP Request status code
    switch (req.status) {

        // Is article OK?
        case 200:
            article = await req.json()
            doGetUser = true
            break;

        // Does article exist?
        case 404:
            article = article404
            break;

        // Is there server error?
        case 500:
            article = article500
            break;
        
        default:
            article = article500
            break;
    }

    // Get the user from the DAO
    let user
    if (doGetUser) {
        const reqUser = await fetch(DAO_ENDPOINT_USER + 'id/' + article.user_id)
        user = reqUser.status == 200 ? await reqUser.json() : null
    } else {
        user = null
    }

    // Return results
    return { props: { article, user } }
}

// Render Web Page:
// This function is executed after the function 'getServerSideProps'
// The function parameters are the return of 'getServerSideProps'
export default function Post({ article, user }) {
    return (
        <Layout>

            {/* HTML Page Head */}
            <Head>
                <title>{article.title}</title>
            </Head>

            <article>

                {/* Article Title */}
                <div className={styles.articleTitle}>{article.title}</div>

                {/* Article Author */}
                {user && (
                    <div className={styles.articleAuthor}>
                        by&nbsp;
                        <Link href={`/author/${user.url}`}>
                            <a>{user.name}</a>
                        </Link>
                    </div>
                )}

                {/* Article Updated At */}
                {article.updated_at && (
                    <div className={styles.articleUpdatedAt}>
                        Updated <DateFormat dateString={article.updated_at} />
                    </div>
                )}

                {/* <h2>Content</h2> */}

                {/* Article content */}
                <div className={styles.articleContent}>
                    {article.content}
                </div>

            </article>

        </Layout>
    )
}