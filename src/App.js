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
import {authenticationService} from "./services/authentication.service";
import {history} from './services/history';
import {PrivateRoute} from "./components/private-route";
import {LoginPage} from "./components/login-page";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser
        .subscribe(user => this.setState({ currentUser: user }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    return (
        <Router history={history}>
          <div>
            {currentUser &&
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/samples">Samples</Link></li>
                  <li><Link to="/goats">Goats</Link></li>
                  <li><button onClick={this.logout}>Logout</button></li>
                </ul>
              </nav>
            }


            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <PrivateRoute exact path="/samples" comp={SamplePage}></PrivateRoute>
              <PrivateRoute exact path="/goats" comp={GoatPage}></PrivateRoute>
              <PrivateRoute exact path="/" comp={HomePage}></PrivateRoute>
              <Route path="/login" component={LoginPage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
