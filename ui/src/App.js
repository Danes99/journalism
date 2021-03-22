// Import downloaded modules
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
// import './App.css';

// Import components
import NavBar from './components/Navbar'
import Footer from './components/Footer'

// Import pages
import About from './page/About'
import ArticleCreate from './page/ArticleCreate'
import ArticleUpdate from './page/ArticleUpdate'
import Help from './page/Help'
import Home from './page/Home'
import Settings from './page/Settings'
import SignIn from './page/SignIn'
import SignUp from './page/SingUp'
import NotFound404 from './page/404'

function App() {
    return (
        <div class="flex flex-col min-h-screen">
            <Router>

                <div class="flex-grow">

                    {/* Navbar */}
                    <NavBar />

                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                    <Switch>

                        <Route path='/' exact component={Home} />
                        <Route path='/help' exact component={Help} />
                        <Route path='/about' exact component={About} />
                        <Route path='/signIn' exact component={SignIn} />
                        <Route path='/signUp' exact component={SignUp} />
                        <Route path='/settings' exact component={Settings} />
                        <Route path='/article/create' exact component={ArticleCreate} />

                        <Route path='/article/update' component={ArticleUpdate} />

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
