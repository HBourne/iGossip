import React, { Component } from "react";
import './welcome.less';
import { useHistory } from 'react-router-dom';

/**
 * Welcome page shown before logging in.
 * igossip.info/
 */


export class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='welcome'>
                <div className='container'>
                    <div className='banner'>
                        <h1>Welcome to iGossip!</h1>
                        <div className='line'></div>
                        {/** Plan: type in effect */}
                        <p>A Place Insights Get Achieved</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;