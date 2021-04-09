// Import pre-installed modules
import React, { useState, useEffect } from 'react'

// Import downloaded modules
import { useHistory } from 'react-router-dom'

// Import components
import ArticleForm from '../../components/ArticleForm'
import Spinner from '../../components/Spinner'
import WebPage from '../../components/WebPage'

// Import Config
import {
    DAO_ENDPOINT_ARTICLE_ID
} from '../../config/dao'

// Initial state
const INITIAL_STATE_ARTICLE_TITLE = ""
const INITIAL_STATE_ARTICLE_CONTENT = ""
const INITIAL_STATE_HAS_FETCH_REQUEST_BEEN_MADE = false
const INITIAL_STATE_FETCH_REQUEST_RESPONSE = null

const Page = () => {

    // Constants
    const ARTICLE_ID = window.location.pathname.split('/')[3]
    const DAO_ENDPOINT_ARTICLE_READ = DAO_ENDPOINT_ARTICLE_ID + ARTICLE_ID

    const history = useHistory()
    const goRouteUpdateArticle = () => history.push(`/article/update/${ARTICLE_ID}`)

    const fetchArticle = async () => {

        try {

            setHasFetchRequestBeenMade(true)

            const requestOptions = {
                headers: { 'Authorization': window.localStorage.getItem('jwt') }
            }

            // Fetch article list
            const response = await fetch(DAO_ENDPOINT_ARTICLE_READ, requestOptions)

            // Status OK: Article got
            if (response.status === 200) {

                // Article
                const body = await response.json()

                // Update state
                setArticleTitle(body.title)
                setArticleContent(body.content)
                setFetchRequestResponse(body)
            }

            // Bad request
            if (response.status === 400) {

                // Do something
            }

            // Unauthorized
            if (response.status === 401) {

                // Do something
            }

            // Article with this id does not exist
            if (response.status === 404) {

                // Do something
            }

            // Server Error
            if (response.status === 500) {

                // Do something
            }

        } catch (error) {
            console.log(error)
        }
    }

    // State: article
    const [articleTitle, setArticleTitle] = useState(INITIAL_STATE_ARTICLE_TITLE)
    const [articleContent, setArticleContent] = useState(INITIAL_STATE_ARTICLE_CONTENT)

    // State: HTTP requests
    const [hasFetchRequestBeenMade, setHasFetchRequestBeenMade] = useState(INITIAL_STATE_HAS_FETCH_REQUEST_BEEN_MADE)
    const [fetchRequestResponse, setFetchRequestResponse] = useState(INITIAL_STATE_FETCH_REQUEST_RESPONSE)

    // Run only once
    useEffect(() => {
        fetchArticle()
        // Do not delete the following comment, it disables the useEffect warning on the console
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <WebPage title="Read Post">
            {
                hasFetchRequestBeenMade ?
                    fetchRequestResponse ?
                        <ArticleForm
                            articleTitle={articleTitle}
                            articleContent={articleContent}
                            isReadOnly={true}
                            handleSubmit={goRouteUpdateArticle}
                        />
                        :
                        <p>Error</p>
                    :
                    <Spinner />
            }
        </WebPage>
    )
}

export default Page
