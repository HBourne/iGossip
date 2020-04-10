import React, { Component } from "react";
import { Menu, Layout, message } from 'antd';
import './navigator.less';
import 'antd/dist/antd.css';
import { BankOutlined, LoginOutlined, LogoutOutlined, HeartOutlined, DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'react-cookies';

const { Header, Content, Footer } = Layout;

// Navigator:
// - Provide quick navigation to functionalities like homepage, login, logout, favorite courses, comments


export class Navigator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'default',
            displaylogin: !this.props.login
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
            this.props.parentCallback(current);
        }
        if (e.key == 'profile') {
            current = 'profile';
            this.props.parentCallback(current);
        }
        if (e.key == 'comments') {
            current = 'comment';
            this.props.parentCallback(current);
        }
        if (e.key == 'favorites') {
            current = 'favorites';
            this.props.parentCallback(current);
        }
        if (e.key == 'login') {
            current = 'login'
            this.props.parentCallback(current);
        }
        if (e.key == 'logout') {
            current = 'logout'
            if (cookie.load('username') !== undefined) {
                axios.post('http://127.0.0.1:8000/user/quit/', {
                    username: cookie.load('username'),
                })
                    .then((res) => {
                        if (res.status == 200) {
                            // cookie.load('username') // on use
                            // cookie.remove('username') // on logout
                            cookie.remove('username');
                            this.setState({
                                displaylogin: true
                            });
                            this.props.parentCallback(current);
                        } else alert(res.message)
                    })
                    .catch((err) => alert(err.response.data))
            } else {
                message.error("Error logging out...")
            }
        }
    }

    componentDidMount() {
        if (cookie.load('username') !== undefined) {
            this.setState({
                login: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.login != prevProps.login) {
            this.setState({
                displaylogin: !this.props.login
            })
        }

        if (this.props.current != prevProps.current) {
            this.setState({
                current: this.props.current
            })
        }
    }

    render() {
        return (
            <div className='navigator'>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme='light'>
                    <Menu.Item id='logo' disabled='true'>
                        iGossip
                    </Menu.Item>

                    {/* TODO: Add login related states to modify the logo & corresponding text for login/logout */}
                    {
                        this.state.displaylogin &&
                        <Menu.Item key="login">
                            <LoginOutlined />
                            <a href="/login" target="_self">Login</a>
                        </Menu.Item>
                    }
                    {
                        !this.state.displaylogin &&
                        <Menu.Item key="logout">
                            <LogoutOutlined />
                            Logout
                        </Menu.Item>
                    }
                    {
                        !this.state.displaylogin &&
                        <Menu.Item key="profile">
                            <DatabaseOutlined />
                            Profile
                        </Menu.Item>
                    }
                    {
                        !this.state.displaylogin &&
                        <Menu.Item key="comments">
                            <DatabaseOutlined />
                            Comments
                        </Menu.Item>
                    }
                    {
                        !this.state.displaylogin &&
                        <Menu.Item key="favorites">
                            <HeartOutlined />
                            Favorites
                        </Menu.Item>
                    }

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