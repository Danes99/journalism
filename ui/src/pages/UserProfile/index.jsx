// Import pre-installed modules
import React, { useEffect, useState } from 'react'

// Import components
import WebPage from '../../components/WebPage'
import Spinner from '../../components/Spinner'

// Import Config
import { DAO_ENDPOINT_USER } from '../../config/dao'
import { format, formatDistanceToNow } from 'date-fns'

// Import image
import userAvatar from '../../img/photo-1472099645785-5658abf4ff4e.jpeg'

// Initial state
const INITIAL_STATE_USER = null
const INITIAL_STATE_FETCH_REQUEST_RESPONSE = null

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

    // State: HTTP requests
    const [user, setUser] = useState(INITIAL_STATE_USER)
    const [fetchRequestResponse, setFetchRequestResponse] = useState(INITIAL_STATE_FETCH_REQUEST_RESPONSE)

    const fetchUser = async () => {

        try {

            const requestOptions = {
                headers: { 'Authorization': window.localStorage.getItem('jwt') }
            }
            
            // Fetch article list
            const response = await fetch(DAO_ENDPOINT_USER, requestOptions)

            setFetchRequestResponse(response.status)

            // Status OK: Article got
            if (response.status === 200) {

                // Article
                const body = await response.json()
                setUser(body)
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

    // Run only once
    useEffect(() => {
        fetchUser()
        // Do not delete the following comment, it disables the useEffect warning on the console
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <WebPage title='Profile'>

            { fetchRequestResponse ?
                user ?
                    <div className="flex items-center w-full justify-center py-5">
                        <div className="max-w-xs">
                            <div className="bg-white shadow-xl rounded-lg py-3">

                                {/* User avatar image */}
                                <div className="photo-wrapper p-2">
                                    <img
                                        className="w-32 h-32 rounded-full mx-auto"
                                        src={userAvatar}
                                        // src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" 
                                        alt="user avatar"
                                    />
                                </div>

                                <div className="p-2">

                                    {/* User name */}
                                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>

                                    {/* User custom URL */}
                                    <div className="text-center text-gray-400 text-xs font-semibold">
                                        {user.url}
                                    </div>

                                    <table className="text-xs my-3">
                                        <tbody>

                                            {/* User Email */}
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                <td className="px-2 py-2">{user.email}</td>
                                            </tr>

                                            {/* User created at */}
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Created at</td>
                                                <td className="px-2 py-2">{format(new Date(user.created_at), 'LLLL d, yyyy, h:m aaa')}</td>
                                            </tr>

                                            {/* User Updated at */}
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Updated</td>
                                                <td className="px-2 py-2">{formatDistanceToNow(new Date(user.updated_at), { addSuffix: true })}</td>
                                            </tr>

                                            {/* User description */}
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">Description</td>
                                                <td className="px-2 py-2">{user.description}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    {/* <div className="text-center my-3">
                                        <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    afterRequestDisplay(fetchRequestResponse)
                : <Spinner />}

        </WebPage>
    )
}

export default Page

// https://tailwindcomponents.com/component/profile-card-2
