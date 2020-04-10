import React, { Component } from "react";
import './course.less'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import cookie from "react-cookies";
import axios from 'axios';

// Course:
// - Display all the information about certain course requested by user including:
//   - course name
//   - course description
//   - CRN
//   - Ratings
//   - Comments
//   - Average gpa


export class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favorite: false,
            course: this.props.course,
            login: false
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/favorites/check/',
            params: {
                username: cookie.load('username'),
                course_id: this.state.course.id,
            }
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw res
                } else {
                    this.setState({
                        favorite: false
                    })
                }
            })
            .catch((err) => message.alert(err.res.status))

        if (cookie.load('username') !== undefined) {
            this.setState({
                login: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.course != prevProps.course) {
            this.setState({
                course: this.props.course
            })
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/favorites/check/',
                params: {
                    username: cookie.load('username'),
                    course_id: this.props.course.id,
                }
            })
                .then((res) => {
                    if (res.status >= 400) {
                        throw res
                    } else {
                        this.setState({
                            favorite: false
                        })
                    }
                })
                .catch((err) => message.alert(err.res.status))
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
                        message.alert(res.status)
                        throw res
                    } else {
                        this.setState({
                            favorite: false
                        })
                    }
                })
                .catch((err) => message.alert(err.res.status))
        } else {
            axios.post('http://127.0.0.1:8000/favorites/add/', {
                username: cookie.load('username'),
                course_id: this.state.course.id,
            })
                .then((res) => {
                    if (res.status >= 400) {
                        message.alert(res.status)
                        throw res
                    } else {
                        this.setState({
                            favorite: true
                        })
                    }
                })
                .catch((err) => message.alert(err.res.status))
        }
    }

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
                    <div className='review'>
                        ratings
                    </div>
                </div>
                {
                    this.state.course &&
                    <div className='instructor'>
                        Instructed by: {this.state.course.instructor.replace(/\'/g, '')}
                    </div>
                }
                <div className='description'>
                    Course Description:
                </div>

                <div className='body'>
                    <div className='comment'>
                        comments
                    </div>
                </div>
            </div>
        )
    }
}

export default Course;