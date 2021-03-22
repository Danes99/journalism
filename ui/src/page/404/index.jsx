// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'

const Page = () => {

    return (
        <div class="container mx-auto flex flex-col flex-wrap items-center justify-between">

            <h1 class="block font-sans text-red-700">404</h1>
            <p class="block font-sans text-blue-700">Page not found</p>

            <a className="bg-blue-900 text-white block px-3 py-2 rounded-md text-base font-medium m-4"><NavLink to='/'>Go Home</NavLink></a>
        </div>
    )
}

export default Page