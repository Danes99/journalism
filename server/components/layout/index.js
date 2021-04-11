// Import pre-installed components
import Head from 'next/head'
import Link from 'next/link'

// Import custom components
import Footer from '../footer'

// Import CSS
import styles from './layout.module.css'

// Constants
const name = 'Journalism'
export const siteTitle = 'Journalism'

// Layout
export default function Layout({ children, home }) {
    return (
        <>
            {/* HTML page Head */}
            <Head>
                <title>{home ? name : 'Home'}</title>
                <link rel='icon' href='/svg/logo.svg' />
                <meta name='Journalism' content='Journalism' />
                <meta name='og:title' content={siteTitle} />
            </Head>

            {/* HTML page body */}
            <div className={styles.body}>

                {/* Page Header */}
                {/* <header className='header flex flex-row justify-center bg-red-600 py-3' >
                    <Link href='/'>
                        <img className={styles.headerImg} src='/svg/logo.svg' alt='next' />
                    </Link>
                </header> */}

                <div className="w-full border-b flex flex-row flex-wrap items-center p-1">

                    <div className="w-1/5 p-3">
                        <div className="text-2xl font-thin text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div>
                    </div>

                    {/* Home logo */}
                    <div className="w-3/5 p-3">
                        <center>
                            <Link href='/'>
                                <img
                                    className="w-1/4"
                                    // className={styles.headerImg}
                                    src="/img/politico-logo.png"
                                    alt="logo"
                                // src="https://static.politico.com/11/3c/2571c0ab455e91bf81dc4bab93a6/politico-logo.png" 
                                />
                            </Link>
                        </center>
                    </div>

                    <div className="w-1/5 flex flex-row flex-wrap">
                        <ul className="w-3/4 flex flex-row flex-wrap text-xs font-semibold">
                            <li className="mx-3">MAGAZINE</li>
                            <li className="mx-3">THE AGENDA</li>
                            <li className="mx-3">PRO</li>
                        </ul>
                        <div className="w-1/4 text-lg text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </div>

                </div>

                {/* HTML body content */}
                <div className={styles.container}>

                    <div className='flex-grow'>
                        {/* <p className='text-center'>Main Content Section</p> */}
                        {/* Layout children */}
                        <main>{children}</main>
                    </div>

                    {/* Back to Home Click */}
                    {!home &&
                        <div className={styles.backToHome}>
                            <Link href='/'>
                                <a className="transition duration-300 text-gray-500 hover:text-gray-700 font-semibold text-s mb-1 leading-none " >← Back to home</a>
                            </Link>
                        </div>
                    }

                </div>

                {/* HTML page Footer */}
                <footer>
                    <Footer />
                </footer>

            </div>

        </>
    )
}