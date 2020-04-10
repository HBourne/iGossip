import React, { Component } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from "./home/Home"
import { Welcome } from './home/Welcome';
import { Login } from './login/Login';
<<<<<<< HEAD
import { Join } from './login/Join';
=======
import { Join } from './login/Join'
>>>>>>> 3404c616f633255c7f5edb9c40e574eed1fb64b1

class App extends Component {
    render() {
        return <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/join" component={Join} />
        </Router>
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);