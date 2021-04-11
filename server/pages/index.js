import Link from 'next/link'

// Import custom components
import DateFormat from '../components/date'
import Layout from '../components/layout'

// Import Constants
import { DAO_ENDPOINT_ARTICLE } from '../config/dao'

// Get data from the API:
// This function is executed before the rendering of the HTML page.
// The return pass the data as parameters to the rendering function.
export async function getServerSideProps({ params }) {

    // Get the article from the DAO
    const req = await fetch(DAO_ENDPOINT_ARTICLE + 'last?q=6')

    // Test HTTP request result
    let articleList

    // Test HTTP Request status code
    switch (req.status) {

        // Is article OK?
        case 200:
            articleList = await req.json()
            break;

        // Does article exist?
        case 404:
            articleList = []
            break;

        // Is there server error?
        case 500:
            articleList = []
            break;

        default:
            articleList = []
            break;
    }

    // Return results
    return { props: { articleList } }
}

export default function Home({ articleList }) {

    const cards = articleList.map(element => (

        <Link href={`/post/${element.id}`}>
            <div className="bg-white overflow-hidden border-b-4 border-blue-500 md:w-1/4 m-4">

                <img
                    // src="https://images.unsplash.com/photo-1573748240263-a4e9c57a7fcd"
                    src="/img/card_image.jpeg"
                    alt="People" 
                    className="w-full object-cover h-16 sm:h-24 md:h-16"
                />

                <div className="p-4 md:p-6">

                    <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">News</p>
                    <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{element.title}</h3>

                    <div className="text-sm flex items-center">

                        {/* SVG: Clock Logo */}
                        <svg className="opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                            version="1.1" id="Capa_1" x="0px" y="0px" width="12" height="12" viewBox="0 0 97.16 97.16"
                            style={{ "enable-background": "new 0 0 97.16 97.16;" }} space="preserve"
                        >
                            <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
                            <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
                        </svg>

                        {/* Created at */}
                        <p className="leading-none">
                            <DateFormat dateString={element.created_at} />
                        </p>

                    </div>
                </div>
            </div>
        </Link>
    )
    )

    return (
        <Layout home>

            <section className="blog text-gray-700 body-font">
                <div className="container p-5 mx-auto">
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
                        {cards}
                    </div>
                </div>
            </section>

        </Layout >
    )
}

// https://tailwindcomponents.com/component/news-card
