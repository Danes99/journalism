// Import pre-installed modules
import { useState } from 'react'

// Import downloaded modules
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import components
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

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

function App() {

    // State
    const [jwt, setJwt] = useState(window.localStorage.getItem('jwt'))
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

    // console.log(jwt)

    return (
        <div className="flex flex-col min-h-screen">
            <Router>

                <div className="flex-grow">

                    {/* Navbar */}
                    <NavBar />

                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                    <Switch>

                        {/* Private routes, do not need to be authenticated to access */}
                        <Route path='/' exact component={Home} />
                        <Route path='/signIn' exact component={SignIn} />
                        <Route path='/signUp' exact component={SignUp} />
                        <Route path='/help' exact component={Help} />
                        <Route path='/about' exact component={About} />

                        {/* Private routes, need to be authenticated to access */}
                        <PrivateRoute path='/settings' exact component={Settings} />
                        <PrivateRoute path='/article' exact component={Article} />
                        <PrivateRoute path='/article/create' exact component={ArticleCreate} />
                        <PrivateRoute path='/article/update' component={ArticleUpdate} isAuth={false}/>

                        {/* Always put 404 Not Found ('/' not exact) in last! */}
                        <Route path='/' component={NotFound404} />

                    </Switch>

                </div>

                {/* Footer */}
                <Footer />

            </Router>
        </div>
    );
}

export default App;
