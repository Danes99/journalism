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
export default function Layout({ children }) {
    return (
        <div className={styles.container}>

            <Head>

                <link rel="icon" href="/favicon.ico" />

                <meta
                    name="description"
                    content="Journalism Article"
                />

                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />

                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />

                <title>Article</title>
            </Head>


            <div className={styles.mainContent}>
                <header className={styles.header}>

                    <Link href="/">
                        <a>Home</a>
                    </Link>

                    <h2 className={utilStyles.headingLg}>
                        <Link href="/">
                            <a className={utilStyles.colorInherit}>{name}</a>
                        </Link>
                    </h2>

                </header>

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