// Import pre-installed modules
import React, { useState } from 'react'

// Import downloaded modules
import { NavLink, useHistory } from 'react-router-dom'

// Import SVG
import logo from '../../svg/workflow-mark-indigo-600.svg'

// Import Config
import { DAO_ENDPOINT_USER_LOGIN } from '../../config/dao'

// Constants: Initial state
// const INITIAL_SATE_LOGIN_REQUEST_HAS_BEEN_SEND = false
// const INITIAL_SATE_LOGIN_REQUEST_HAS_BEEN_RECEIVED = null
// const INITIAL_SATE_LOGIN_REQUEST_RESULT = null

const Page = (props) => {

    // History
    const history = useHistory()

    // State
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)
    // const [loginRequestHasBeenSend, setLoginRequestHasBeenSend] = useState(INITIAL_SATE_LOGIN_REQUEST_HAS_BEEN_SEND)
    // const [loginRequestHasBeenReceived, setLoginRequestHasBeenReceived] = useState(INITIAL_SATE_LOGIN_REQUEST_HAS_BEEN_RECEIVED)
    // const [loginRequestResult, setLoginRequestResult] = useState(INITIAL_SATE_LOGIN_REQUEST_RESULT)

    // Update User Email
    const handleChangeUserEmail = (e) => {
        setUserEmail(e.currentTarget.value)
    }

    // Update User Password
    const handleChangeUserPassword = (e) => {
        setUserPassword(e.currentTarget.value)
    }

    // Request: HTTP POST Login
    const handleSubmit = async (e) => {

        // Change layout when login request has been made
        // setLoginRequestHasBeenSend(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, password: userPassword }, null, 4)
        }

        try {

            // Send HTTP POST request: login user
            const response = await fetch(DAO_ENDPOINT_USER_LOGIN, requestOptions)

            // setLoginRequestHasBeenReceived(response.status)

            // User is authenticated (Good credentials)
            if (response.status === 200) {

                // HTTP response body
                const body = await response.json()

                // Set JWT in local storage
                // setLoginRequestResult(body.token)
                window.localStorage.setItem('jwt', body.token)

                // Redirect to article main menu
                props.tokenReceived()
                history.push('/article')

            }

            // User is not authenticated (Bad credentials)
            if (response.status === 400) {

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

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8">

                {/* Sign In message */}
                <div>
                    <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <div className="mt-2 text-center text-sm text-gray-600">
                        Or&nbsp;
                        <p className="transition duration-500 font-medium text-indigo-600 hover:text-indigo-500">
                            <NavLink to='/signUp'>
                                Sign Up
                            </NavLink>
                        </p>
                    </div>
                </div>

                {/* Sign In Form */}
                <div className="mt-8 space-y-6" >
                    <input type="hidden" name="remember" value="true" />

                    {/* Email & Password */}
                    <div className="rounded-md shadow-sm -space-y-px">

                        {/* Email */}
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" placeholder="Email address" required 
                            onChange={handleChangeUserEmail} 
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password"  placeholder="Password" required 
                            onChange={handleChangeUserPassword}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                        </div>

                    </div>

                    {/* Sign in options */}
                    <div className="flex items-center justify-between">

                        {/* Remember me */}
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {/* Forgot your password? */}
                        <div className="text-sm">
                            <p className="transition duration-500 font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </p>
                        </div>

                    </div>

                    {/* Sign in button */}
                    <button type="submit" onClick={handleSubmit}
                        className="transition duration-500 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            {/* SVG Lock */}
                            <svg className="transition duration-500 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </span>

                            Sign in
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Page
