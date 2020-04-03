import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import 'antd/dist/antd.css';
import axios from 'axios';

// csrf settings for django
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }

    usernameDataHandler = (e) => {
      this.state.username = e.target.value;
    }

    passwordDataHandler = (e) => {
        this.state.password = e.target.value;
    }

    login = () => {
      axios.post('http://127.0.0.1:8000/user/auth/', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    }

    render() {
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
                <LoginForm/>
              </div>
            </div>
          </div>
        )
    }
}

export default Login;