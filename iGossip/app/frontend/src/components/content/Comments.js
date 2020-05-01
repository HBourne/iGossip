import React, { Component } from "react";
import './favorites.less'
import { Table, Tag, Popconfirm, message } from 'antd';
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
        axios.get('http://127.0.0.1:3000/comment?user=' + cookie.load('username'))
            .then((res) => {
                if (res.status >= 400) {
                    message.error(res.status)
                    throw res
                }
                return res.data;
            })
            .then(data => {
                let comments = [];
                // for (let i = data.length - 1; i >= 0; i--) {
                //     comments.push({
                //         actions: data[i].user == cookie.load('username') ? [<Button onClick={this.handleDelete}>Delete</Button>] : null,
                //         author: data[i].user,
                //         content: (
                //             <p>
                //                 {data[i].content}
                //             </p>
                //         ),
                //         datetime: (
                //             <Tooltip
                //                 title={moment(data[i].created_at).fromNow()}
                //             >
                //                 <span>
                //                     {moment(data[i].created_at).fromNow()}
                //                 </span>
                //             </Tooltip>
                //         ),
                //     })
                // }
                this.setState({
                    comments: comments
                })
                console.log(data);
            })
            .catch((err) => {
                message.error("Error fetching comments");
            })
    }

    handleClick = (key) => {

    }

    handleDelete = (key) => {

    }

    render() {
        return (
            <div className='comments'>

            </div>
        )
    }
}

export default Comments;