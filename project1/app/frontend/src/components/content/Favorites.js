import React, { Component } from "react";
import './favorites.less'
import { Table, Tag, Popconfirm, message } from 'antd';
import 'antd/dist/antd.css';
import cookie from "react-cookies";
import axios from 'axios';

// Favorites:
// - A collection of all the favorite courses of a user

export class Favorites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course_list: []
        };
    }

    componentDidMount() {
        fetch("favorites/get?u=" + cookie.load('username')).then(res => {
            if (res.status >= 400) {
                message.error("Course list unavailable");
                throw "Error";
            }
            return res.json();
        }).then(data => {
            let formattedData = [];
            for (let i = 0; i < data.length; i++) {
                formattedData.push({
                    key: i,
                    title: data[i].subject.replace(/\'/g, '') + data[i].number,
                    name: data[i].name.replace(/\'/g, ''),
                    instructor: data[i].instructor.replace(/\'/g, ''),
                    tags: data[i].subject.replace(/\'/g, ''),
                    id: data[i].id
                })
            }
            console.log(formattedData);
            this.setState({
                course_list: formattedData,
                data: data
            })
        })
    }

    handleClick = (key) => {
        let current = 'course';
        let item = this.state.data[key];
        this.props.parentCallback(item, current)
    }

    handleDelete = (key) => {
        axios.delete('http://127.0.0.1:8000/favorites/delete/', {
            data: {
                username: cookie.load('username'),
                course_id: this.state.course_list[key].id,
            }
        })
            .then((res) => {
                if (res.status >= 400) {
                    throw res;
                } else {
                    this.setState({
                        course_list: this.state.course_list.filter(item => item.key !== key)
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const columns = [
            {
                title: 'Course Title',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => <a onClick={() => this.handleClick(record.key)}>{text}</a>,
            },
            {
                title: 'Course Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Instructor',
                dataIndex: 'instructor',
                key: 'instructor',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tag => (
                    <span>
                        <Tag color={'volcano'} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    </span>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ),
            },
        ];

        return (
            <div className='favorites'>
                <div className='title'>
                    My Favorite Courses
                </div>
                <div className='favorite_list'>
                    <Table
                        columns={columns}
                        dataSource={this.state.course_list}
                        pagination={false}
                        scroll={{ y: 700 }}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default Favorites;