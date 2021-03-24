// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'

// Import components
import WebPage from '../../components/WebPage'

// Constants
const CLASS_BUTTON = "transition duration-500 inline-flex justify-center my-4 py-3 w-36 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

const Page = () => {

    return <WebPage title="Home">

        <div className="flex flex-col items-center py-3">

            {/* Sign In */}
            <div className={CLASS_BUTTON}>
                <NavLink to='/signIn'>Sign In</NavLink>
            </div>

            {/* Sign Up */}
            <div className={CLASS_BUTTON}>
                <NavLink to='/signUp'>Sign Up</NavLink>
            </div>

        </div>

    </WebPage>
}

export default Page
