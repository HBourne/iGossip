import React, { Component } from "react";
import './login.less';
import 'antd/dist/antd.css';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>Welcome to iGossip!</h1>
                <p>Where insights get archieved.|</p>
            </div>
            <div className='login'>

            </div>
        )
    }
}

export default Home;