import React, { Component } from "react";
import './welcome.less';
import { useHistory } from 'react-router-dom';

/**
 * Welcome page shown before logging in.
 * 127.0.0.1:8000/
 */


export class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    routeToJoin = () => {
        let path = '/join';
        let history = useHistory();
        history.push(path);
    }

    routeToLogin = () => {
        let path = '/login';
        let history = useHistory();
        history.push(path);
    }    

    render() {
        return (
            <div className='welcome'>
                <div className='container'>
                    <div className='banner'>
                        <h1>Welcome to iGossip!</h1>
                        <div className='line'></div>
                        {/** Plan: type in effect */}
                        <p>where insights get archieved...|</p>
                    </div>
                    <div>
                        <button id='btn-join' onClick={this.routeToJoin}>Join us</button>
                        <button id='btn-login' onClick={this.routeToLogin}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;