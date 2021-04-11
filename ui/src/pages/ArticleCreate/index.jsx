// Import pre-installed modules
import React, { useState } from 'react'

// Import components
import ArticleForm from '../../components/ArticleForm'
import Spinner from '../../components/Spinner'
import WebPage from '../../components/WebPage'

// Import Config
import { DAO_ENDPOINT_ARTICLE } from '../../config/dao'

import {
    ARTICLE_TITLE_MIN_LENGTH,
    ARTICLE_TITLE_MAX_LENGTH,
    ARTICLE_CONTENT_MIN_LENGTH,
    ARTICLE_CONTENT_MAX_LENGTH
} from '../../config/article'

// Initial state
const INITIAL_STATE_ARTICLE_TITLE = ''
const INITIAL_STATE_ARTICLE_CONTENT = ''
const INITIAL_STATE_ARTICLE_IS_COMPLETED = false
const INITIAL_STATE_IS_ARTICLE_TITLE_VALID = false
const INITIAL_STATE_IS_ARTICLE_CONTENT_VALID = false
const INITIAL_STATE_HAS_REQUEST_BEEN_MADE = false
const INITIAL_STATE_REQUEST_RESPONSE = null

// Display different result according to the HTTP response status code
const afterRequestDisplay = (key) => {

    switch (key) {

        case 201:
            return <div>Created</div>

        case 400:
            return <div>Bad request</div>

        case 401:
            return <div>Unauthorized</div>

        case 500:
            return <div>Server Error</div>

        default:
            return <div>Error</div>
    }
}

const Page = () => {

    // State
    const [articleTitle, setArticleTitle] = useState(INITIAL_STATE_ARTICLE_TITLE)
    const [articleContent, setArticleContent] = useState(INITIAL_STATE_ARTICLE_CONTENT)
    const [articleIsCompleted, setArticleIsCompleted] = useState(INITIAL_STATE_ARTICLE_IS_COMPLETED)

    const [isArticleTitleValid, setIsArticleTitleValid] = useState(INITIAL_STATE_IS_ARTICLE_TITLE_VALID)
    const [isArticleContentValid, setIsArticleContentValid] = useState(INITIAL_STATE_IS_ARTICLE_CONTENT_VALID)
    
    const [hasRequestBeenMade, setHasRequestBeenMade] = useState(INITIAL_STATE_HAS_REQUEST_BEEN_MADE)
    const [requestResponse, setRequestResponse] = useState(INITIAL_STATE_REQUEST_RESPONSE)

    // Handle update of: article title
    const handleChangeArticleTitle = (e) => {

        setArticleTitle(e.currentTarget.value)

        const length = e.currentTarget.value.length

        setIsArticleTitleValid(
            length > ARTICLE_TITLE_MIN_LENGTH
            && length < ARTICLE_TITLE_MAX_LENGTH
        )
    }

    // Handle update of: article content
    const handleChangeArticleContent = (e) => {

        setArticleContent(e.currentTarget.value)

        const length = e.currentTarget.value.length

        setIsArticleContentValid(
            length > ARTICLE_CONTENT_MIN_LENGTH
            && length < ARTICLE_CONTENT_MAX_LENGTH
        )
    }

    // Handle update of: article 'is completed?'
    const handleChangeArticleIsCompleted = (e) => {
        
        setArticleIsCompleted(e.currentTarget.value)
    }

    // Handle submit article
    const handleSubmit = async () => {

        // HTTP request options
        const requestOptions = {
            method: 'POST',
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
            const response = await fetch(DAO_ENDPOINT_ARTICLE, requestOptions)

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

    return (
        <WebPage title='New Post'>

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
                // articleFrom
                <ArticleForm
                    handleChangeArticleTitle={handleChangeArticleTitle}
                    handleChangeArticleContent={handleChangeArticleContent}
                    handleChangeArticleIsCompleted={handleChangeArticleIsCompleted}
                    handleSubmit={handleSubmit}
                    canSubmit={canSubmit}
                />
            }


        </WebPage>
    )
}

export default Page

// https://tailwindcomponents.com/component/post-making-form
