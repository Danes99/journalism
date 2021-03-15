// Import pre-installed modules
import Head from 'next/head'
// import Link from 'next/link'

// Import custom components
import DateFormat from '../../components/date'
import Layout from '../../components/layout'

// Import CSS
import styles from './styles.module.css'

// Import Constants
import { DAO_ENDPOINT_USER } from '../../config/dao'

// Users
const user404 = { name: 'User does not exist' }
const user500 = { name: 'Server error' }

// Get data from the API:
// This function is executed before the rendering of the HTML page.
// The return pass the data as parameters to the rendering function.
export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_ENDPOINT_USER  + 'url/' + params.id)

    // Test HTTP request result
    let user

    // Test HTTP Request status code
    switch (req.status) {

        // Is article OK?
        case 200:
            user = await req.json()
            break;

        // Does article exist?
        case 404:
            user = user404
            break;

        // Is there server error?
        case 500:
            user = user500
            break;

        default:
            user = user500
            break;
    }

    // Return results
    return { props: { user } }
}

// Render Web Page:
// This function is executed after the function 'getServerSideProps'
// The function parameters are the return of 'getServerSideProps'
export default function Post({ user }) {
    return (
        <Layout>

            {/* HTML Page Head */}
            <Head>
                <title>{!user || !user.name ? 'User' : user.name}</title>
            </Head>

            <article>

                {/* Username */}
                <div className={styles.articleTitle}>{user.name}</div>

                {/* User Created At */}
                {user && user.created_at && (
                    <div className={styles.articleUpdatedAt}>
                        Joined <DateFormat dateString={user.created_at} />
                    </div>
                )}

                {/* User Updated At */}
                {user && user.updated_at && (
                    <div className={styles.articleUpdatedAt}>
                        Last updated <DateFormat dateString={user.updated_at} />
                    </div>
                )}

                {/* Article content */}
                {user && user.description && (
                    <div className={styles.articleContent}>
                        {user.description}
                    </div>
                )}

            </article>

        </Layout>
    )
}