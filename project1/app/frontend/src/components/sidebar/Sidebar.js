import React, { Component } from "react";
import './sidebar.less'
import { Input, List, message } from 'antd';
import 'antd/dist/antd.css';

// Sidebar:
// - Provide search for courses/professors
// - List all the courses returned by the search clause

const { Search } = Input;

export class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mysql: []
        };

        // TODO: Substitute this mock info with mysql fetch
    }

    componentDidMount() {
        try {
            fetch("api/search").then(res => {
                if (res.status >= 400) {
                    message.error("Course list unavailable");
                    throw "Error";
                }
                return res.json();
            }).then(data => {
                this.setState({
                    mysql: data
                })
            })
        }
        catch (e) {
            console.error(e);
        }
    }

    handleClick = (item) => {
        this.props.parentCallback(item, 'course');
    }

    handleSearch = (value) => {
        try {
            fetch("api/search/?string=" + value).then(res => {
                if (res.status >= 400) {
                    throw res;
                }
                return res.json();
            }).then(data => {
                this.setState({
                    mysql: data
                })
            })
        }
        catch (e) {
            message.alert(e.status);
        }
    }

    render() {
        return (
            // TODO: Implement the onClick function to modify the current state so that correct content will be displayed
            <div className='sidebar'>
                <div className='search'>
                    <Search
                        placeholder="Search keywords for courses"
                        onSearch={value => this.handleSearch(value)}
                    />
                </div>

                <div className='result'>
                    <List
                        style={{ height: "87vh", overflow: "auto" }}
                        itemLayout="horizontal"
                        dataSource={this.state.mysql}
                        renderItem={item => (
                            <List.Item onClick={() => this.handleClick(item)}>
                                <List.Item.Meta
                                    title={<a>{item.subject.replace(/\'/g, '') + item.number + ' - ' + item.instructor.replace(/\'/g, '')}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default Sidebar;