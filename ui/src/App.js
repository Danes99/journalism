// Import downloaded modules
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import components
import TopNav from './components/TopNav/TopNav'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

import logo from './logo.svg';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
