import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {HomePage} from "./components/home-page";
import {SamplePage} from "./components/sample-page";
import {GoatPage} from "./components/goat-page";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/samples">Samples</Link></li>
                <li><Link to="/goats">Goats</Link></li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/samples"><SamplePage/></Route>
              <Route path="/goats"><GoatPage/></Route>
              <Route path="/"><HomePage/></Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
