import React, { Component } from "react";
import './welcome.less';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'antd';

/**
 * Welcome page shown before logging in.
 * 127.0.0.1:8000/
 */


class Welcome extends Component {
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
                <div className='banner'>
                    <h1>Welcome to iGossip!</h1>
                    <p>Let's get your insights archieved...|</p>
                </div>
                <div>
                    <button onClick={this.routeToJoin}>Join us</button>
                    <button onClick={this.routeToLogin}>Login</button>
                </div>
            </div>
        )
    }
}

export default Welcome;