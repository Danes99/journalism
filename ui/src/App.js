// Import pre-installed modules
import { useState, useEffect } from 'react'

// Import downloaded modules
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import components
import Footer from './components/Footer'
import NavBar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Spinner from './components/Spinner'
import WebPage from './components/WebPage'

// Import pages
import About from './pages/About'
import Article from './pages/Article'
import ArticleCreate from './pages/ArticleCreate'
import ArticleUpdate from './pages/ArticleUpdate'
import Help from './pages/Help'
import Home from './pages/Home'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SingUp'
import NotFound404 from './pages/404'

// Import config
import { DAO_ENDPOINT_USER_IS_LOGGED_IN } from './config/dao'

// Function
let tokenReceived

function App() {

    // Create tokenReceived(): use when received JWT from authentication 
    useEffect(() => {

        tokenReceived = () => setIsAuth(true)

    }, [])

    const [authRequestHasBeenMade, setAuthRequestHasBeenMade] = useState(false)
    const [isAuth, setIsAuth] = useState(
        () => {

            // Get jwt from web browser local storage
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
            const jwt = window.localStorage.getItem('jwt')

            // Is there a JWT in Web Browser Local Storage?
            if (!jwt) {
                setAuthRequestHasBeenMade(true)
                return false
            }


            // Put JWT in HTTP Request Header
            // Test (ask DAO) if JWT is valid
            const requestOptions = {
                headers: { 'Authorization': jwt }
            }

            // HTTP GET request
            fetch(DAO_ENDPOINT_USER_IS_LOGGED_IN, requestOptions)
                .then(response => {

                    // Is JWT still valid?
                    if (response.status === 200) setIsAuth(true)

                    // Request has been made
                    setAuthRequestHasBeenMade(true)
                })

            return false
        }
    )

    return (
        <div className="flex flex-col min-h-screen">
            <Router>
                <div className="flex-grow">

                    {/* Navbar */}
                    <NavBar displayUserMenu={isAuth} />

                    {authRequestHasBeenMade ?

                        <Switch>
                            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}

                            {/* Private routes, do not need to be authenticated to access */}
                            <Route path='/' exact component={Home} />
                            <Route path='/help' exact component={Help} />
                            <Route path='/about' exact component={About} />

                            {/* When user is authenticated, use callback function (tokenReceived) */}
                            <Route path='/signIn' exact render={ (props) => <SignIn tokenReceived={tokenReceived} /> } />
                            <Route path='/signUp' exact render={ (props) => <SignUp tokenReceived={tokenReceived} /> } />

                            {/* Private routes, need to be authenticated to access */}
                            <PrivateRoute path='/settings' exact component={Settings} isAuth={isAuth} />
                            <PrivateRoute path='/article' exact component={Article} isAuth={isAuth} />
                            <PrivateRoute path='/article/create' exact component={ArticleCreate} isAuth={isAuth} />
                            <PrivateRoute path='/article/update' component={ArticleUpdate} isAuth={isAuth} />

                            {/* 404 */}
                            <Route component={NotFound404} />

                        </Switch>

                        : 
                            <WebPage title='Loading'>
                            {/* Display loading spinner while waiting for the authentication */}
                            <Spinner />
                        </WebPage>
                    }

                </div>

                {/* Footer */}
                <Footer />

            </Router>
        </div>
    );
}

export default App;
