import React, { Component } from "react";
import './sidebar.less'
import { Input, List } from 'antd';
import 'antd/dist/antd.css';

// Sidebar:
// - Provide search for courses/professors
// - List all the courses returned by the search clause

const { Search } = Input;

export class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // TODO: Substitute this mock info with mongodb fetch
        this.mongo = [
            {
                id: 1,
                title: 'CS411 - Abdu'
            }, {
                id: 2,
                title: 'CS422 - Rosu'
            }
        ];
    }

    handleClick = (item) => {
        console.log(item)
        this.props.parentCallback(item.id, 'course');
    }

    render() {
        return (
            // TODO: Implement the onClick function to modify the current state so that correct content will be displayed
            <div className='sidebar'>
                <div className='search'>
                    <Search
                        placeholder="Search keywords for courses"
                        onSearch={value => console.log(value)}
                    />
                </div>

                <div className='result'>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.mongo}
                        renderItem={item => (
                            <List.Item onClick={() => this.handleClick(item)}>
                                <List.Item.Meta
                                    title={<a>{item.title}</a>}
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