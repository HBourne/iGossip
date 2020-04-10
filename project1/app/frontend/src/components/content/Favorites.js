import React, { Component } from "react";
import './favorite.less'

// Favorites:
// - A collection of all the favorite courses of a user

export class DefaultContent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='favorites'>
                This is where default content should be implemented!
            </div>
        )
    }
}

export default DefaultContent;