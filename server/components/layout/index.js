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
        <div className={styles.container}>

            <Head>

                <link rel="icon" href="/svg/logo.svg" />

                <meta
                    name="description"
                    content="Journalism"
                />

                <meta name="og:title" content={siteTitle} />

                <title>{home ? name : 'Home'}</title>
            </Head>


            <div className={styles.mainContent}>
                
                {/*Header*/}
                <header className={styles.header}>
                    <Link href="/">
                        <img src='/svg/logo.svg' alt='next' />
                    </Link>
                </header>

                {/* Main content */}
                <main>
                    {children}
                </main>

            </div>

            <footer>

                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}

                <h2>Journalism</h2>

            </footer>

        </div>
    )
}