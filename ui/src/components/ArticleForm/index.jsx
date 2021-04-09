
// Import pre-installed modules
import React, { useState } from 'react'

// Import components
import { NavLink } from 'react-router-dom'

// Import Config
import {
    ARTICLE_TITLE_MIN_LENGTH,
    ARTICLE_TITLE_MAX_LENGTH,
    // ARTICLE_CONTENT_MIN_LENGTH,
    ARTICLE_CONTENT_MAX_LENGTH
} from '../../config/article'

const ArticleForm = (props) => {

    // State
    const [articleTitle, setArticleTitle] = useState(props.articleTitle || "")
    const [articleContent, setArticleContent] = useState(props.articleContent || "")

    const componentHandleChangeArticleTitle = (e) => {

        // Pass event to parent component
        props.handleChangeArticleTitle(e)

        // Update Article Title
        setArticleTitle(e.currentTarget.value)

    }

    const componentHandleChangeArticleContent = (e) => {

        // Pass event to parent component
        props.handleChangeArticleContent(e)

        // Update Article Content
        setArticleContent(e.currentTarget.value)

    }

    return (

        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

            {/* Article Title */}
            <input
                className="title bg-gray-100 border border-gray-300 p-2 outline-none"
                spellCheck="true"
                placeholder="Title"
                type="text"

                // Min & max length
                minLength={ARTICLE_TITLE_MIN_LENGTH}
                maxLength={ARTICLE_TITLE_MAX_LENGTH}

                // Default value
                value={props.articleTitle}

                // Callback function called when value changes
                onChange={componentHandleChangeArticleTitle}

                // If not callback function, then cannot edit
                disabled={ typeof props.handleChangeArticleTitle === 'undefined' }
            />

            {/* Article title length, character counter */}
            <div className="icons flex text-gray-500 m-2 mb-4">
                <div className="count ml-auto text-gray-400 text-xs font-semibold">
                    {articleTitle.length}/{ARTICLE_TITLE_MAX_LENGTH}
                </div>
            </div>

            {/* Article Content */}
            <textarea
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                spellCheck="true"
                placeholder="Describe everything about this post here"

                // Min & max length
                minLength={ARTICLE_TITLE_MIN_LENGTH}
                maxLength={ARTICLE_CONTENT_MAX_LENGTH}

                // Default value
                value={props.articleContent}

                // Callback function called when value changes
                onChange={componentHandleChangeArticleContent}

                // If not callback function, then cannot edit
                disabled={ typeof props.handleChangeArticleContent === 'undefined' }
            />

            {/* <!-- icons --> */}
            <div className="icons flex text-gray-500 m-2">

                {/* Icon: Location */}
                <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                {/* Icon: Smiley */}
                <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {/* Icon: paperclip */}
                <svg className="transition duration-300 mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>

                {/* Article content length, character counter */}
                <div className="count ml-auto text-gray-400 text-xs font-semibold">
                    {articleContent.length}/{ARTICLE_CONTENT_MAX_LENGTH}
                </div>

            </div>

            {/* <!-- buttons --> */}
            {props.isReadOnly ?
                <div className="buttons flex">

                    {/* Cancel button */}
                    <NavLink
                        className="transition duration-300 btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto hover:border-gray-400"
                        to='/article'
                    >Back</NavLink>

                    {/* Is article completed & ready to publish? */}
                    {/* <select className="border border-gray-300 p-1 px-8 font-semibold cursor-pointer text-gray-500 ml-2 hover:border-gray-400">
                        <option value={true}>Save & Publish</option>
                        <option value={false}>Save Draft</option>
                    </select> */}

                    {/* Post button */}
                    <button
                        className="transition duration-300 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-600"
                        onClick={props.handleSubmit}
                    >Update</button>

                </div>
                :
                <div className="buttons flex">

                    {/* Cancel button */}
                    <NavLink
                        className="transition duration-300 btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto hover:border-gray-400"
                        to='/article'
                    >Cancel</NavLink>

                    {/* Is article completed & ready to publish? */}
                    <select className="border border-gray-300 p-1 px-8 font-semibold cursor-pointer text-gray-500 ml-2 hover:border-gray-400">
                        <option value={true}>Save & Publish</option>
                        <option value={false}>Save Draft</option>
                    </select>

                    {/* Post button */}
                    <button
                        className="transition duration-300 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-600"
                        disabled={!props.canSubmit}
                        onClick={props.handleSubmit}
                    >Post</button>

                </div>
            }

        </div>
    )
}

export default ArticleForm