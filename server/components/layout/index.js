// Import pre-installed components
import Head from 'next/head'
import Link from 'next/link'

// Import CSS
import styles from './layout.module.css'
import utilStyles from '../../styles/utils.module.css'

// Constants
const name = 'Journalism'

// Site Title
export const siteTitle = name

// Layout
export default function Layout({ children, home }) {
    return (
        <>
            {/* HTML page Head */}
            <Head>

                <title>{home ? name : 'Home'}</title>

                <link rel="icon" href="/svg/logo.svg" />

                <meta name="Journalism" content="Journalism" />
                <meta name="og:title" content={siteTitle} />

            </Head>



            {/* HTML body content */}
            <div className={styles.container}>

                {/* Page Header */}
                <header className={styles.header}>
                    <Link href="/">
                        <img src='/svg/logo.svg' alt='next' />
                    </Link>
                </header>

                <div className={styles.mainContent}>

                    <div className={styles.mainContentHeader}>
                        <p>Main Content Section</p>
                    </div>

                    {/* Main content */}
                    <main>{children}</main>

                </div>

                {/* Page Footer */}
                <footer>

                    {/* Back to Home Click */}
                    {!home && (
                        <Link href="/" >
                            <a className={styles.backToHome}>← Back to home</a>
                        </Link>
                    )}

                    {/* Media Name */}
                    <h2>Journalism</h2>
                </footer>

            </div>

        </>
    )
}