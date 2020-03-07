import React, { Component } from "react";
import './profile.less'

// Profile:
// - Display all the information of user himself including:
//   - name
//   - email
//   - account info (which might expand to a variety of information)
//   - login history
//   - comment history
//   - reputation/level

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='profile'>
                This is where personal profile of user should be implemented!
            </div>
        )
    }
}

export default Profile;