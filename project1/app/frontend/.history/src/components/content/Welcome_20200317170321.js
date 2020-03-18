import React, { Component } from "react";
import { Modal, Button } from 'antd';

/**
 * Welcome page shown before logging in.
 * 127.0.0.1:8000/
 */

export class Welcome extends Component {
    render() {
        return (
            <div className='welcome'>
                <div className='banner'>

                </div>
                <div>
                    <button>Join us</button>
                    <button>Login</button>
                </div>
            </div>
        )
    }
}