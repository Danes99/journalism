import Head from 'next/head'
import Link from 'next/link'

import Date from '../../components/date'
import Layout from '../../components/layout'

// Import CSS
import styles from './post.module.css'

// Constants
import DAO_BASE_URL from '../../config/DAO_BASE_URL'

// Articles
const article404 = { title: 'Article does not exist', content: '404 not found' }
const article500 = { title: 'Server error', content: '502 Bad Gateway'}

// Users
const userNotDefined = { name: 'User not defined', created_at: null }

// Get Article from DAO (Data Access Object)
export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_BASE_URL + 'article/' + params.id)

    // Test HTTP request result
    let article
    let doGetUser = false

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
    }

    // // Get the user from the DAO
    let user
    if (doGetUser) {
        const reqUser = await fetch(DAO_BASE_URL + 'user/id/' + article.user_id)
        user = reqUser.status == 200 ? await reqUser.json() : userNotDefined
    } else {
        user = userNotD
    }

    // Return results
    return { props: { article, user } }
}

// Render Article
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
                <div className={styles.articleAuthor}>
                    by&nbsp;
                    <Link href='/author/'>
                        <a>{user.name}</a>
                    </Link>
                </div>

                {/* Article Updated At */}
                <div className={styles.articleUpdatedAt}>
                    Updated <Date dateString={article.updated_at} />
                </div>

                {/* <h2>Content</h2> */}

                {/* Article content */}
                <div className={styles.articleContent}>
                    {article.content}
                </div>

            </article>

        </Layout>
    )
}