// Import pre-installed modules
import React, { useState } from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'

// Import SVG
import bigLogo from '../../svg/workflow-logo-indigo-500-mark-white-text.svg'
import smallLogo from '../../svg/workflow-mark-indigo-500.svg'

// Constants
const INITIAL_STATE_IS_USER_MENU_ON = false
const INITIAL_STATE_IS_MAIN_MENU_ON = false

const Navbar = () => {

    // Create State
    const [isUserMenuOn, setIsUserMenuOn] = useState(INITIAL_STATE_IS_USER_MENU_ON)
    const [isMainMenuOn, setIsMainMenuOn] = useState(INITIAL_STATE_IS_MAIN_MENU_ON)

    // Update State functions
    const toggleUserMenu = () => setIsUserMenuOn(!isUserMenuOn)
    const toggleMainMenu = () => setIsMainMenuOn(!isMainMenuOn)

    return (
        // <!-- This example requires Tailwind CSS v2.0+ -->
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        {/* <!-- Mobile menu button--> */}
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" 
                            onClick={toggleMainMenu} >
                            <span className="sr-only">Open main menu</span>

                            {/* <!--
                                Icon when menu is closed.

                                Heroicon name: outline/menu

                                Menu open: "hidden", Menu closed: "block"
                            --> */}

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            {/* <!--
                                Icon when menu is open.

                                Heroicon name: outline/x

                                Menu open: "block", Menu closed: "hidden"
                            --> */}

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>

                    {/* NavBar Menu */}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <NavLink to='/'>
                                <img className="block lg:hidden h-8 w-auto" src={smallLogo} alt="Workflow" />
                                <img className="hidden lg:block h-8 w-auto" src={bigLogo} alt="Workflow" />
                            </NavLink>
                        </div>

                        {/* NavBar Navigation */}
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}


                                <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"><NavLink to='/'>Dashboard</NavLink></a>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><NavLink to='/about'>About</NavLink></a>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><NavLink to='/help'>Help</NavLink></a>
                                
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>

                            {/* <!-- Heroicon name: outline/bell --> */}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* <!-- Profile dropdown --> */}
                        <div className="ml-3 relative">
                            <div>
                                <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onClick={toggleUserMenu} />
                                </button>
                            </div>

                            {/* <!--
                                Dropdown menu, show/hide based on menu state.

                                Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            --> */}

                            { isUserMenuOn ? <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                            </div> 
                                : null }
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            { isMainMenuOn ? <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                </div>
            </div>
                : null }

        </nav>
    )
}

export default Navbar
