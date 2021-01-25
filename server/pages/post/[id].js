import Head from 'next/head'

import Date from '../../components/date'

import DAO_BASE_URL from '../../config/DAO_BASE_URL'

export async function getServerSideProps() {
    const id = '1'
    const req = await fetch(DAO_BASE_URL + 'article/' + id)
    const article = await req.json()

    return { props: { article } }
}

export default function Post({ article }) {

    return (
        <div>

            <Head>
                <title>{article.title}</title>
            </Head>
            <article>
                <h1>Content</h1>

                <h2>
                    Updated <Date dateString={article.updated_at} />
                </h2>

                <p>
                    {article.content}
                </p>
                
            </article>
        </div>
    )
}