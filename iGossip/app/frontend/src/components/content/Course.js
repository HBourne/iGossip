import React, { Component } from "react";
import cookie from "react-cookies";
import axios from 'axios';
import { message, Comment, Tooltip, List, Form, Input, Button } from 'antd';
import moment from 'moment';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './course.less'

// Course:
// - Display all the information about certain course requested by user including:
//   - course name
//   - course description
//   - CRN
//   - Ratings
//   - Comments
//   - Average gpa

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <Input.TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
        </Button>
        </Form.Item>
    </div>
);

export class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favorite: false,
            course: this.props.course,
            login: false,
            comments: [
                {
                    actions: [<span>Delete</span>], // hidden if not the author
                    author: 'Apple Apple',
                    content: (
                        <p>
                            Hello world,
                        </p>
                    ),
                    datetime: (
                        <Tooltip
                            title={moment()
                                .subtract(1, 'days')
                                .format('YYYY-MM-DD')}
                        >
                            <span>
                                {moment()
                                    .subtract(1, 'days')
                                    .fromNow()}
                            </span>
                        </Tooltip>
                    ),
                },
                {
                    actions: [<span>Delete</span>],
                    author: 'Pigpig',
                    content: (
                        <p>
                            This is the best course I have ever taken.
                        </p>
                    ),
                    datetime: (
                        <Tooltip
                            title={moment()
                                .subtract(4, 'days')
                                .format('YYYY-MM-DD')}
                        >
                            <span>
                                {moment()
                                    .subtract(1, 'days')
                                    .fromNow()}
                            </span>
                        </Tooltip>
                    ),
                },
                {
                    actions: [<span>Delete</span>],
                    author: 'CCCCC',
                    content: (
                        <p>
                            HAHAHAHHAHAHAHA
                        </p>
                    ),
                    datetime: (
                        <Tooltip
                            title={moment()
                                .subtract(1, 'days')
                                .format('YYYY-MM-DD')}
                        >
                            <span>
                                {moment()
                                    .subtract(3, 'days')
                                    .fromNow()}
                            </span>
                        </Tooltip>
                    ),
                }
            ],
            submitting: false,
            value: '',
        };
    }

    componentDidMount() {
        // check whether the course is in the user's favorite list
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/favorites/check/',
            params: {
                u: cookie.load('username'),
                cid: this.state.course.id,
            }
        })
            .then((res) => {
                if (res.data.status >= 400) {
                    throw res
                }
                this.setState({
                    favorite: res.data.favorite
                })
            })
            .catch((err) => console.log(err))

        if (cookie.load('username') !== undefined) {
            this.setState({
                login: true
            })
        }

        // fetch course description
        try {
            fetch('http://127.0.0.1:3000/course?val=' + this.props.course.hash_val.replace(/'/g, "")).then(res => {
                if (res.status >= 400) {
                    message.error("Course info unavailable");
                    throw "Error";
                }
                return res.json();
            }).then(mongo => {
                this.setState({
                    mongo: mongo[0]
                })
            })
        }
        catch (e) {
            console.error(e);
        }

        // fetch comments to the course       
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.course != prevProps.course) {
            this.setState({
                course: this.props.course,
                value: null
            })
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/favorites/check/',
                params: {
                    u: cookie.load('username'),
                    cid: this.props.course.id,
                }
            })
                .then((res) => {
                    if (res.data.status >= 400) {
                        throw res
                    }
                    this.setState({
                        favorite: res.data.favorite
                    })
                })
                .catch((err) => message.error("Favorite info unavailable"))

            if (cookie.load('username') !== undefined) {
                this.setState({
                    login: true
                })
            }

            // fetch course description
            try {
                fetch('http://127.0.0.1:3000/course?val=' + this.props.course.hash_val.replace(/'/g, "")).then(res => {
                    if (res.status >= 400) {
                        message.error("Course info unavailable");
                        throw "Error";
                    }
                    return res.json();
                }).then(mongo => {
                    this.setState({
                        mongo: mongo[0]
                    })
                })
            }
            catch (e) {
                console.error(e);
            }
        }

        if (this.props.login != prevProps.login) {
            this.setState({
                login: this.props.login,
                username: cookie.load('username')
            })
        }
    }

    handleFavorite = () => {
        if (this.state.favorite) {
            axios.delete('http://127.0.0.1:8000/favorites/delete/', {
                data: {
                    username: cookie.load('username'),
                    course_id: this.state.course.id,
                }
            })
                .then((res) => {
                    if (res.status >= 400) {
                        message.error(res.status)
                        throw res
                    } else {
                        this.setState({
                            favorite: false
                        })
                        message.success("Cancel favorite successfully");
                    }
                })
                .catch((err) => message.error(err.response.status))
        } else {
            axios.post('http://127.0.0.1:8000/favorites/add/', {
                username: cookie.load('username'),
                course_id: this.state.course.id,
            })
                .then((res) => {
                    if (res.status >= 400) {
                        message.error(res.status)
                        throw res
                    } else {
                        this.setState({
                            favorite: true
                        })
                        message.success("Add favorite successfully");
                    }
                })
                .catch((err) => message.error(err.response.status))
        }
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        axios.post('http://127.0.0.1:3000/comment', {
            data: {
                user: cookie.load('username'),
                content: this.state.value,
                hash_val: this.props.course.hash_val.replace(/'/g, ""),
            }
        })
            .then((res) => {
                if (res.status >= 400) {
                    message.error(res.status)
                    throw res
                }

                if (res.status == 200) {
                    message.success("Successfully commented")
                    this.setState({
                        value: null
                    })
                }
            })
            .catch((err) => {
                if (err.response.status == 406) {
                    message.error("Cannot comment a same course twice");
                }
            })

        this.setState({
            submitting: false,
        })
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <div className='course'>
                <div className='title'>
                    <div className='name_favorite'>
                        {
                            this.state.login &&
                            <div className='favorite'>
                                <a onClick={this.handleFavorite}>
                                    {
                                        !this.state.favorite &&
                                        <HeartOutlined />
                                    }
                                    {
                                        this.state.favorite &&
                                        <HeartTwoTone twoToneColor="#eb2f96" />
                                    }
                                </a>
                            </div>
                        }
                        {
                            this.state.course &&
                            <div className='name'>
                                {this.state.course.subject.replace(/\'/g, '') + this.state.course.number + " - " + this.state.course.name.replace(/\'/g, '')}
                            </div>
                        }
                    </div>
                </div>
                {
                    this.state.course &&
                    <div className='instructor'>
                        Instructed by: {this.state.course.instructor.replace(/\'/g, '')}
                    </div>
                }
                {
                    this.state.mongo &&
                    <div className='description'>
                        Course Description:
                        <p>{this.state.mongo.Description}</p>
                    </div>
                }

                <div className='body'>
                    <div className='comment'>
                        {
                            this.state.login &&
                            <Comment
                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                        submitting={this.state.submitting}
                                        value={this.state.value}
                                    />
                                }
                            />
                        }

                        What people are talking about: <br></br>
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={this.state.comments}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={item.actions}
                                        author={item.author}
                                        content={item.content}
                                        datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Course;