// Import pre-installed modules
import React, { useState, useEffect } from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'

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

        try {

            const requestOptions = {
                headers: { 'Authorization': window.localStorage.getItem('jwt') }
            }
    
            // Fetch article list
            const response = await fetch(DAO_ENDPOINT_GET_EVERY_ARTICLES, requestOptions)
            const body = await response.json()
    
            setArticleList(body)
            setHasArticleRequestEnded(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    // Delete Article
    // HTTP DELETE to DAO
    const deleteArticle = async (id) => {

        try {

            const requestOptions = {
                headers: { 'Authorization': window.localStorage.getItem('jwt') },
                method: 'DELETE'
            }

            // HTTP DELETE Response from DAO
            const response = await fetch(DAO_ENDPOINT_ARTICLE + id, requestOptions)

            // Status OK: Article deleted
            if (response.status === 200) {

                // Refresh article list
                fetchArticles()
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

    // State
    const [articleList, setArticleList] = useState(INITIAL_STATE_ARTICLE_LIST)
    const [hasArticleRequestEnded, setHasArticleRequestEnded] = useState(INITIAL_STATE_HAS_ARTICLE_REQUEST_ENDED)


    useEffect(() => {
        fetchArticles()
    }, [])

    return <WebPage title='Articles'>

        {/* Create article */}
        <div className='transition duration-500 bg-blue-500 hover:bg-blue-600 transform hover:scale-110 text-white font-bold mb-3 py-2 px-4 border rounded-full'>
            <NavLink to='/article/create'>
                New +
            </NavLink>
        </div>

        {/* <div> */}

        {hasArticleRequestEnded ?
            articleList ?


                <div className='overflow-x-auto'>
                    <div className='w-full lg:w-6/6'>
                        <div className='bg-white shadow-md rounded my-6'>

                            {/* Article list */}
                            <table className='min-w-max w-full table-auto'>

                                {/* Article list header */}
                                <thead className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                                    <tr>
                                        <th className='py-3 px-6 text-left' >Title</th>
                                        <th className='py-3 px-6 text-left' >Created</th>
                                        <th className='py-3 px-6 text-left' >Updated</th>
                                        <th className='py-3 px-6 text-center'>Status</th>
                                        <th className='py-3 px-6 text-center' >Actions</th>
                                    </tr>
                                </thead>

                                {/* Article list body */}
                                <tbody className='text-gray-600 text-sm font-light'>
                                    {articleList.map(
                                        item => <tr
                                            key={`article_${item.id}`}
                                            className='transition duration-300 border-b border-gray-200 hover:bg-gray-100'
                                        >

                                            {/* Article title */}
                                            <td className='py-3 px-6 text-left whitespace-nowrap'>
                                                <div className='flex items-center'>

                                                    {/* Static Svg logo */}
                                                    {/* <div className='mr-2'>
                                            <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
                                                width='24' height='24'
                                                viewBox='0 0 48 48'
                                                style={{ 'fill': '#000000' }}>
                                                <path fill='#80deea' d='M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z'></path><path fill='#80deea' d='M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z'></path><path fill='#80deea' d='M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z'></path><circle cx='24' cy='24' r='4' fill='#80deea'></circle>
                                            </svg>
                                        </div> */}

                                                    {/* Article title as plain text */}
                                                    <span className='font-medium'>{item.title}</span>
                                                </div>
                                            </td>

                                            {/* Article Created at */}
                                            <td className='py-3 px-6 text-left'>
                                                <div className='flex items-center'>
                                                    <span>{
                                                        format(new Date(item.created_at), 'LLLL d, yyyy, h:m aaa')
                                                    }</span>
                                                </div>
                                            </td>

                                            {/* Article Updated at */}
                                            <td className='py-3 px-6 text-left'>
                                                <div className='flex items-center'>
                                                    <span>{
                                                        formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })
                                                    }</span>
                                                </div>
                                            </td>

                                            {/* Is article completed? */}
                                            <td className='py-3 px-6 text-center'>
                                                {item.is_completed ?
                                                    <span className='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>Completed</span>
                                                    :
                                                    <span className='bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs'>Pending</span>}
                                            </td>

                                            {/* Actions menu */}
                                            <td className='py-3 px-6 text-center'>
                                                <div className='flex items-center justify-center'>

                                                    {/* Read article (Eye) */}
                                                    <div className='transition duration-300 w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                                                        <NavLink to={`/article/read/${item.id}`}>
                                                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                                            </svg>
                                                        </NavLink>
                                                    </div>

                                                    {/* Edit article (Pencil) */}
                                                    <div className='transition duration-300 w-4 mr-2 transform hover:text-yellow-500 hover:scale-110'>
                                                        <NavLink to={`/article/update/${item.id}`}>
                                                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                                                            </svg>
                                                        </NavLink>
                                                    </div>

                                                    {/* Delete article (Trash) */}
                                                    <div 
                                                        className='transition duration-300 w-4 mr-2 transform hover:text-red-500 hover:scale-110' 
                                                        onClick={() => deleteArticle(item.id)} 
                                                        >

                                                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                :
                <p className='block font-sans'>Error</p>
            :
            <p className='block font-sans'>Loading</p>
        }

    </WebPage>
}

export default Page

// Modal: https://tailwindcomponents.com/component/simple-cards
