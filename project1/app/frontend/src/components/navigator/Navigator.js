import React, { Component } from "react";
import { Menu, Layout } from 'antd';
import './navigator.less';
import 'antd/dist/antd.css';
import { BankOutlined, LoginOutlined, HeartOutlined, DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'react-cookies';

const { Header, Content, Footer } = Layout;

// Navigator:
// - Provide quick navigation to functionalities like homepage, login, logout, favorite courses, comments


export class Navigator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'home'
        };
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        let current;
        if (e.key == 'home') {
            current = 'default';
        }
        if (e.key == 'comments') {
            current = 'comment';
        }
        if (e.key == 'favorites') {
            current = 'favorites';
        }
        this.props.parentCallback(current);
    }

    render() {
        return (
            <div className='navigator'>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme='light'>
                    <Menu.Item id='logo' disabled='true'>
                        iGossip
                    </Menu.Item>

                    {/* TODO: Add login related states to modify the logo & corresponding text for login/logout */}
                    <Menu.Item key="login">
                        <LoginOutlined />
                        <a href="/login" target="_self">Login</a>
                    </Menu.Item>

                    <Menu.Item key="comments">
                        <DatabaseOutlined />
                        Comments
                    </Menu.Item>

                    <Menu.Item key="favorites">
                        <HeartOutlined />
                        Favorites
                    </Menu.Item>

                    <Menu.Item key="home">
                        <BankOutlined />
                        Home
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Navigator;