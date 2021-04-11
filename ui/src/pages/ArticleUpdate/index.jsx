// Import pre-installed modules
import React, { useState, useEffect } from 'react'

// Import components
import ArticleForm from '../../components/ArticleForm'
import Spinner from '../../components/Spinner'
import WebPage from '../../components/WebPage'

// Import Config
import {
    DAO_ENDPOINT_ARTICLE,
    DAO_ENDPOINT_ARTICLE_ID
} from '../../config/dao'

import {
    ARTICLE_TITLE_MIN_LENGTH,
    ARTICLE_TITLE_MAX_LENGTH,
    ARTICLE_CONTENT_MIN_LENGTH,
    ARTICLE_CONTENT_MAX_LENGTH
} from '../../config/article'

// Initial state
const INITIAL_STATE_ARTICLE_TITLE = ''
const INITIAL_STATE_ARTICLE_CONTENT = ''
const INITIAL_STATE_ARTICLE_IS_COMPLETED = null
const INITIAL_STATE_IS_ARTICLE_TITLE_VALID = false
const INITIAL_STATE_IS_ARTICLE_CONTENT_VALID = false

const INITIAL_STATE_HAS_REQUEST_BEEN_MADE = false
const INITIAL_STATE_REQUEST_RESPONSE = null
const INITIAL_STATE_HAS_FETCH_REQUEST_BEEN_MADE = false
const INITIAL_STATE_FETCH_REQUEST_RESPONSE = null

// Display different result according to the HTTP response status code
const afterRequestDisplay = (key) => {

    switch (key) {

        case 200:
            return <div>Done</div>

        case 400:
            return <div>Bad request</div>

        case 401:
            return <div>Unauthorized</div>

        case 404:
            return <div>Not found</div>

        case 500:
            return <div>Server Error</div>

        default:
            return <div>Error</div>
    }
}

const Page = () => {

    const fetchArticle = async () => {

        try {

            setHasFetchRequestBeenMade(true)

            const requestOptions = {
                headers: { 'Authorization': window.localStorage.getItem('jwt') }
            }

            // Constants
            const ARTICLE_ID = window.location.pathname.split('/')[3]
            const DAO_ENDPOINT_ARTICLE_READ = DAO_ENDPOINT_ARTICLE_ID + ARTICLE_ID

            // Fetch article list
            const response = await fetch(DAO_ENDPOINT_ARTICLE_READ, requestOptions)

            // Status OK: Article got
            if (response.status === 200) {

                // Article
                const body = await response.json()

                // Update state
                setArticleTitle(body.title)
                setArticleContent(body.content)
                setArticleIsCompleted(body.is_completed)
                setFetchRequestResponse(body)

                setIsArticleTitleValid(true)
                setIsArticleContentValid(true)
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
    const [articleIsCompleted, setArticleIsCompleted] = useState(INITIAL_STATE_ARTICLE_IS_COMPLETED)

    const [isArticleTitleValid, setIsArticleTitleValid] = useState(INITIAL_STATE_IS_ARTICLE_TITLE_VALID)
    const [isArticleContentValid, setIsArticleContentValid] = useState(INITIAL_STATE_IS_ARTICLE_CONTENT_VALID)

    // State: HTTP requests
    const [hasFetchRequestBeenMade, setHasFetchRequestBeenMade] = useState(INITIAL_STATE_HAS_FETCH_REQUEST_BEEN_MADE)
    const [fetchRequestResponse, setFetchRequestResponse] = useState(INITIAL_STATE_FETCH_REQUEST_RESPONSE)
    const [hasRequestBeenMade, setHasRequestBeenMade] = useState(INITIAL_STATE_HAS_REQUEST_BEEN_MADE)
    const [requestResponse, setRequestResponse] = useState(INITIAL_STATE_REQUEST_RESPONSE)

    // Handle update of: article title
    const handleChangeArticleTitle = (e) => {

        // Update article title
        setArticleTitle(e.currentTarget.value)

        const length = e.currentTarget.value.length

        // Is article title valid?
        setIsArticleTitleValid(
            length > ARTICLE_TITLE_MIN_LENGTH
            && length < ARTICLE_TITLE_MAX_LENGTH
        )
    }

    // Handle update of: article content
    const handleChangeArticleContent = (e) => {

        // Update article content
        setArticleContent(e.currentTarget.value)

        const length = e.currentTarget.value.length

        // Is article content valid?
        setIsArticleContentValid(
            length > ARTICLE_CONTENT_MIN_LENGTH
            && length < ARTICLE_CONTENT_MAX_LENGTH
        )
    }

    // Handle update of: article 'is completed?'
    const handleChangeArticleIsCompleted = (e) => {
        
        // console.log(e.currentTarget.value)
        setArticleIsCompleted(e.currentTarget.value)
    }

    // Handle submit article
    const handleSubmit = async () => {

        // Constants
        const ARTICLE_ID = window.location.pathname.split('/')[3]
        const DAO_ENDPOINT_ARTICLE_PATCH = DAO_ENDPOINT_ARTICLE + ARTICLE_ID

        // HTTP request options
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('jwt')
            },
            body: JSON.stringify(
                {
                    title: articleTitle,
                    content: articleContent,
                    is_completed: articleIsCompleted
                },
                null,
                4
            )
        }

        try {

            setHasRequestBeenMade(true)

            // Send HTTP POST request: create article
            const response = await fetch(DAO_ENDPOINT_ARTICLE_PATCH, requestOptions)

            // Response status
            // 201: Article has been created
            // 400: Bad request
            // 500: Server error
            setRequestResponse(response.status)

        } catch (error) {
            console.log(error)
        }

    }

    // Can submit article?
    const canSubmit = isArticleTitleValid && isArticleContentValid

    // Run only once
    useEffect(() => {
        fetchArticle()
        // Do not delete the following comment, it disables the useEffect warning on the console
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <WebPage title='Update Post'>

            {hasRequestBeenMade ?
                <div className='py-10'>
                    {
                        requestResponse ?
                            afterRequestDisplay(requestResponse)
                            :
                            <Spinner diameter={24} />
                    }
                </div>
                :
                hasFetchRequestBeenMade ?
                    fetchRequestResponse ?
                        <ArticleForm

                            // Article data
                            articleTitle={articleTitle}
                            articleContent={articleContent}
                            articleIsCompleted={articleIsCompleted}

                            // Handle changes
                            handleChangeArticleTitle={handleChangeArticleTitle}
                            handleChangeArticleContent={handleChangeArticleContent}
                            handleChangeArticleIsCompleted={handleChangeArticleIsCompleted}
                            handleSubmit={handleSubmit}

                            // Can submit updates?
                            canSubmit={canSubmit}
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
