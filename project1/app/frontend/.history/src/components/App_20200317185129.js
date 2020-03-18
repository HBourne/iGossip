import React, { Component } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom';
// import { Home } from "./home/Home"
import { Welcome } from '../content/Welcome';

class App extends Component {
    render() {
        return <Router>
            <Route exact path="/" component={Welcome} />
        </Router>
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);