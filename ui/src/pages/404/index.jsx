// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { NavLink } from 'react-router-dom'

// Import CSS
import './styles.css'

const Page = () => {

    return (
        <div id="div404">
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>404 - Page not found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                    <NavLink to='/' id="HomeLink">Go To Homepage</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Page