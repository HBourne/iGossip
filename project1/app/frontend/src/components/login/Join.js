import React, { Component } from "react";
import './join.less';
import {Form, Input, Button, Checkbox, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';

const formItemLayout = {
    labelCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 8,
        },
    },
    wrapperCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    }
};

const MajorSelector = (
    <Select style={{width: '100%'}}>
        <Option value="cs">Computer Science</Option>
        <Option value="ce">Computer Engineering</Option>
        <Option value="cx">CS+X</Option>
        <Option value="ee">Others</Option>
    </Select>
);


class JoinForm extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish() {

    }
        
    render() {
        return (<Form
            {...formItemLayout}
            // form={form}
            name="join"
            onFinish={this.onFinish}
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        messgae: 'The input is not a valid E-mail!'
                    },
                    {
                        required: true,
                        messgae: 'Please input your E-mail!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="username"
                label="User Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        whitespace:true
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    }
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') == value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords do not match!');
                        }
                    })
                ]}
            >
                <Input.Password/>
            </Form.Item>    
            
            <Form.Item
                name="year"
                label="Graduate Year"
                rules={[
                    {
                        required: true,
                        message: 'Please select time!'
                    }
                ]}
            >
                <DatePicker picker="year" style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                name="major"
                label="Major"
            >
                {MajorSelector}
            </Form.Item>   

            <Form.Item name="agreement" valuePropName="checked" {...tailFormItemLayout}>
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>    

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>             
        </Form>)
    }
    
}

export class Join extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='join'>
              <div className='container'>
                <h1>Join us to gossip together!</h1>
                <div className='form-wrapper'>    
                    <JoinForm></JoinForm>
                </div>
              </div>
            </div>            
        )
    }
}