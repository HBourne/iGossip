import React, { Component } from "react";
import './default.less'

// Default Content:
// - Provide default content for users (before user click into any specific course)
// - This might include things like most popular courses, top rated courses, etc.


export class DefaultContent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='default_content'>
                This is where default content should be implemented!
            </div>
        )
    }
}

export default DefaultContent;