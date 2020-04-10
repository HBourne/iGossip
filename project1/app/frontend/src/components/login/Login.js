import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from "react-router-dom";
import './login.less';
import 'antd/dist/antd.css';
import axios from 'axios';
import cookie from 'react-cookies';

const usernameContext = React.createContext('null');

// csrf settings for django
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class LoginForm extends Component {
    static contextType = usernameContext;

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            username: '',
            password: '',
        };

        this.usernameDataHandler = this.usernameDataHandler.bind(this);
        this.passwordDataHandler = this.passwordDataHandler.bind(this);
        this.login = this.login.bind(this);
    }

    usernameDataHandler(e) {
        this.state.username = e.target.value;
    }

    passwordDataHandler(e) {
        this.state.password = e.target.value;
    }

    login() {
        axios.post('http://127.0.0.1:8000/user/auth/', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((res) => {
                if (res.status == 200) {
                    // cookie.load('username') // on use
                    // cookie.remove('username') // on logout
                    cookie.save('username', this.state.username);
                    this.setState({ redirect: '/' });
                }
                else
                    alert(res.message)
            })
            .catch((err) => alert(err.response.data))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect, state: { username: true } }} />;
        }

        return (
            <Form
                name="login_form"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.login}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        onChange={this.usernameDataHandler}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={this.passwordDataHandler}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"> {/*onClick={this.login}> */}
              Log in
            </Button>
            Or <a href="/join" target="_self">register now!</a>
                </Form.Item>
            </Form>
        )
    }
}
export class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login'>
                <div className='container'>
                    <h1>Log into your iGossip account</h1>
                    <div className='form-wrapper'>
                        <LoginForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;