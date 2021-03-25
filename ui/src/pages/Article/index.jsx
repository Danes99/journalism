// Import pre-installed modules
import React, { useState, useEffect } from 'react'

// Import components
import WebPage from '../../components/WebPage'

// Config
import { DAO_ENDPOINT_ARTICLE } from '../../config/dao'

// Constants
const DAO_ENDPOINT_GET_EVERY_ARTICLES = DAO_ENDPOINT_ARTICLE + 'all/'

// Initial state
const INITIAL_STATE_HAS_ARTICLE_REQUEST_ENDED = false
const INITIAL_STATE_ARTICLE_LIST = null

const Page = () => {

    const fetchArticles = async () => {

        const requestOptions = {
            headers: { 'Authorization': window.localStorage.getItem('jwt') }
        }

        // Fetch article list
        const response = await fetch(DAO_ENDPOINT_GET_EVERY_ARTICLES, requestOptions)
        const body = await response.json()

        setArticleList(body)
        setHasArticleRequestEnded(true)
    }

    // State
    const [articleList, setArticleList] = useState(INITIAL_STATE_ARTICLE_LIST)
    const [hasArticleRequestEnded, setHasArticleRequestEnded] = useState(INITIAL_STATE_HAS_ARTICLE_REQUEST_ENDED)


    useEffect(() => {
        fetchArticles()
    }, [])

    return <WebPage title="Articles">

        {hasArticleRequestEnded ?
            articleList ?

                <ul>
                    {articleList.map(
                        item => <li key={`article_${item.id}`}>
                            {item.title}
                        </li>
                    )}
                </ul>

                :
                <p className="block font-sans">Error</p>
            :
            <p className="block font-sans">Loading</p>
        }

    </WebPage>
}

export default Page
