import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/Contact" component={Contact}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
