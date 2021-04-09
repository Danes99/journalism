// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => (
    
    <Route {...rest} render={ props => {
        
        if (isAuth) {

            // Is authorized, so return component
            return <Component {...props} />

        } else {

            // Not logged in, so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

        }

    }} />
)

export default PrivateRoute

// https://www.youtube.com/watch?v=qnH5KNtRYEI