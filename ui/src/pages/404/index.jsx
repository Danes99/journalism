// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'

// Import components
import WebPage from '../../components/WebPage'

// Import CSS
import './styles.css'

const Page = () => {


    return (
        <WebPage title='Page not found'>

            <h2 className='notFoundH2'>
                Oops!
            </h2>

            <p className='notFoundP'>
                The page you are looking for might have been removed had its name changed or is temporarily unavailable.
            </p>

            <NavLink to='/article' className='notFoundHomeLink'>
                Go To Homepage
            </NavLink>

        </WebPage>
    )
}

export default Page