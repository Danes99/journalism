// Import pre-installed modules
import React from 'react'

// Import downloaded modules
// import { NavLink } from 'react-router-dom'

const Page = () => {

    return (
        <>
        {/* Input Form */}
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow sm:rounded-md sm:overflow-hidden my-5 mx-20">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                        {/* User name */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" autoComplete="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        {/* User custom URI */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                                    Custom URI on the website
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        www.journalism.com/author/
                                    </span>
                                    <input type="text" name="company_website" id="company_website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="FirstName-LastName" />
                                </div>
                            </div>
                        </div>

                        {/* User email */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" name="email_address" id="email_address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        {/* User password */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" name="password" id="password" autoComplete="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        {/* User description */}
                        <div>
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
                            <div className="mt-1">
                                <textarea id="about" name="about" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Brief description htmlFor your profile. URLs are hyperlinked.
                            </p>
                        </div>

                    </div>

                    {/* Save button */}
                    <div className="flex justify-center px-4 py-3 text-right sm:px-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign up
                        </button>
                    </div>

                </div>
            </div>

            {/* End Border */}
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>

        </>
    )
}

export default Page
