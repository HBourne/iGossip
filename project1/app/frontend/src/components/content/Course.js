import React, { Component } from "react";
import './course.less'
import 'antd/dist/antd.css';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import cookie from "react-cookies";

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
        }
        if (this.props.login != prevProps.login) {
            this.setState({
                login: this.props.login
            })
        }
    }

    handleFavorite = () => {
        this.setState({
            favorite: !this.state.favorite
        })
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
                    <div className='credit'>
                        Available Credits: 3 / 4
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

                    <div className='review'>
                        ratings
                    </div>
                </div>
            </div>
        )
    }
}

export default Course;