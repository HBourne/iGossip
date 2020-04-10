import React, { Component } from "react";
import './profile.less'
import { Form, Input, Button, PageHeader, Select, DatePicker } from 'antd';
// import { Input, PageHeader } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import axios from 'axios';

// Profile:
// - Display all the information of user himself including:
//   - name
//   - account info (which might expand to a variety of information)
//   - login history
//   - comment history
//   - reputation/level

// csrf settings for django
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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
export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "Secret",
            email: "secret@illinois.edu",
            major: "Secret",
            grad_year: "2020",
            bio: "This person is too lazy to leave a message."
        };

        // TODO: Substitute this mock info with mongodb fetch
        this.mongo = {
            description: "Hello world!"
        }
    }

    formRef = React.createRef();

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/user/getuserinfo/')
            .then((res) => {
                this.formRef.current.setFieldsValue({
                    username: res.headers['username'],
                    email: res.headers['email'],
                    grad_year: moment(res.headers['grad_year']),
                    major: res.headers['major'],
                    bio: res.headers['bio'],
                })

                this.setState({
                    username: res.headers['username'],
                    email: res.headers['email'],
                    grad_year: res.headers['grad_year'],
                    major: res.headers['major'],
                    bio: res.headers['bio'],
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    update = () => {
        axios.post('http://127.0.0.1:8000/user/updateuserinfo/', {
            username: this.state.username,
            email: this.state.email,
            grad_year: this.state.grad_year,
            major: this.state.major,
            bio: this.state.bio
        })
            .then((res) => {
                if (res.status == 200)
                    alert('Profile successfully updated!');
            })
            .catch((err) => {
                alert('Your profile failed to update...');
            })
    }

    gradDataHandler = (date, dateString) => {
        this.setState({ grad_year: parseInt(dateString) });
    }

    majorDataHandler = (value) => {
        this.setState({ major: value });
    }

    bioDataHandler = (e) => {
        this.setState({ bio: e.target.value });
    }

    emailDataHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    render() {
        return (
            <div className='profile'>
                <div className='profile_head'>
                    <PageHeader
                        title='Public Profile'
                    />
                </div>

                <div className="profile_body">
                    <Form
                        {...formItemLayout}
                        name="update"
                        onFinish={this.update}
                        ref={this.formRef}>

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                    whitespace: true
                                }
                            ]}>
                            <Input
                                value={this.state.username}
                                disabled={true} />
                        </Form.Item>

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
                            ]}>
                            <Input onChange={this.emailDataHandler}
                                // defaultValue={this.state.email}
                                value={this.state.email}
                            />
                        </Form.Item>

                        {/* <Form.Item
                        name="grad_year"
                        label="Graduate Year"
                        rules={[
                            {
                                required: true,
                                message: 'Please select time!'
                            }
                        ]}
                    >
                        <DatePicker picker="year" 
                            style={{width: '100%'}} 
                            onChange={this.gradDataHandler}
                            />
                    </Form.Item> */}

                        <Form.Item
                            name="major"
                            label="Major"
                        >
                            <Select style={{ width: '100%' }}
                                onChange={this.majorDataHandler}
                                // defaultValue={this.state.major}
                                value={this.state.major}>
                                <Select.Option value="cs">Computer Science</Select.Option>
                                <Select.Option value="ce">Computer Engineering</Select.Option>
                                <Select.Option value="cx">CS+X</Select.Option>
                                <Select.Option value="ee">Others</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="bio"
                            label="Bio"
                        >
                            <Input.TextArea onChange={this.bioDataHandler}
                                // defaultValue={this.state.bio}
                                value={this.state.bio}>
                            </Input.TextArea>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Save changes
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Profile;