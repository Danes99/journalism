// Import downloaded modules
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
// import './App.css';

// Import components
import NavBar from './components/Navbar'

// Import pages
import SignIn from './page/SignIn'
import SignUp from './page/SingUp'

function App() {
    return (
        <Router>

            {/* Navbar */}
            <NavBar />

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>

                {/* <Route path='/' exact component={Home} /> */}
                <Route path='/signIn' exact component={SignIn} />
                <Route path='/signup' exact component={SignUp} />
                        

                {/* Always put '/' in last! */}
                {/* <Route path='/' component={NotFound404} /> */}

            </Switch>

        </Router>
    );
}

export default App;
