// Import pre-installed modules
import React, { useState } from 'react'

// Import components
import { NavLink } from 'react-router-dom'

// Import components
import WebPage from '../../components/WebPage'
import Spinner from '../../components/Spinner'

// Import Config
import { DAO_ENDPOINT_ARTICLE } from '../../config/dao'

// Initial state
const INITIAL_STATE_ARTICLE_TITLE = ""
const INITIAL_STATE_ARTICLE_CONTENT = ""
const INITIAL_STATE_IS_ARTICLE_TITLE_VALID = false
const INITIAL_STATE_IS_ARTICLE_CONTENT_VALID = false
const INITIAL_STATE_HAS_REQUEST_BEEN_MADE = false
const INITIAL_STATE_REQUEST_RESPONSE = null

// Constants
const ARTICLE_TITLE_MIN_LENGTH = 0
const ARTICLE_TITLE_MAX_LENGTH = 300
const ARTICLE_CONTENT_MIN_LENGTH = 0
const ARTICLE_CONTENT_MAX_LENGTH = 30000

// Display different result according to the HTTP response status code
const afterRequestDisplay = (key) => {

    switch (key) {

        case 201:
            return <div>Created</div>

        case 400:
            return <div>Bad request</div>

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
                    content: articleContent
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
            console.log(response.status)
            setRequestResponse(response.status)

        } catch (error) {
            console.log(error)
        }

    }

    // Can submit article?
    const canSubmit = isArticleTitleValid && isArticleContentValid

    // Article
    const articleFrom = <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

        {/* Article Title */}
        <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="true" placeholder="Title" type="text"
            onChange={handleChangeArticleTitle} />

        {/* Article Content */}
        <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="true" placeholder="Describe everything about this post here"
            onChange={handleChangeArticleContent}
        >

        </textarea>

        {/* <!-- icons --> */}
        <div className="icons flex text-gray-500 m-2">
            <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>

            {/* Character counter */}
            <div className="count ml-auto text-gray-400 text-xs font-semibold">0/30,000</div>
        </div>

        {/* <!-- buttons --> */}
        <div className="buttons flex">

            {/* Cancel button */}
            <button className="transition duration-300 btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto hover:border-gray-400">
                <NavLink to='/article' >Cancel</NavLink>
            </button>

            {/* Post button */}
            <button className="transition duration-300 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-600"
                disabled={!canSubmit}
                onClick={handleSubmit}
            >
                Post
        </button>

        </div>

    </div>


    return (
        <WebPage title="New Post">
            {/* <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div> */}

            {hasRequestBeenMade ?
                <div className="py-10">
                    {
                        requestResponse ?
                            afterRequestDisplay(requestResponse)
                            :
                            <Spinner diameter={24} />
                    }
                </div>
                :
                articleFrom
            }


        </WebPage>
    )
}

export default Page

// https://tailwindcomponents.com/component/post-making-form
