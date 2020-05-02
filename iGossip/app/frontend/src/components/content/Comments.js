import React, { Component } from "react";
import './comments.less'
import { List, message } from 'antd';
import 'antd/dist/antd.css';
import cookie from "react-cookies";
import axios from 'axios';

// Comments:
// - A collection of all the comments of a user

export class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        // fetch comments to the course
        this.fetchComment();
    }

    handleDelete = (hash_val) => {
        axios.delete('http://igossip.info:3000/comment', {
            data: {
                user: cookie.load('username'),
                hash_val: hash_val,
            }
        })
            .then(res => {
                if (res.status >= 400) {
                    message.error(res.status)
                    throw res
                }

                if (res.status == 200) {
                    message.success("Successfully deleted comment")
                    this.fetchComment();
                }
            })
            .catch((err) => {
                message.error("Error deleting comment. Please try again later...")
            })
    }

    fetchComment = () => {
        axios.get('http://igossip.info:3000/comment?user=' + cookie.load('username'))
            .then((res) => {
                if (res.status >= 400) {
                    message.error(res.status)
                    throw res
                }
                return res.data;
            })
            .then(data => {
                this.setState({
                    comments: data
                })
            })
            .catch((err) => {
                message.error("Error fetching comments");
            })
    }

    render() {
        return (
            <div className='comments'>
                <div className='title'>
                    My Comments
                </div>
                <div className='comment_list'>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.comments}
                        renderItem={item => (
                            <List.Item
                                actions={[<a onClick={() => this.handleDelete(item.hash_val)}>Delete</a>]}
                            >
                                <List.Item.Meta
                                    title={item.course_subject + item.course_number + " " + item.course_name + " - " + item.instructor}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default Comments;