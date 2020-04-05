import React, { Component } from "react";
import './profile.less'
import { Input, PageHeader } from 'antd';
import 'antd/dist/antd.css';

// Profile:
// - Display all the information of user himself including:
//   - name
//   - email
//   - account info (which might expand to a variety of information)
//   - login history
//   - comment history
//   - reputation/level

const { TextArea } = Input;

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // TODO: Substitute this mock info with api fetch
        this.info = {
            account: "xxx",
            name: "xxx",
            email: "xxx",
            department: "xxx",
        }

        // TODO: Substitute this mock info with mongodb fetch
        this.mongo = {
            description: "Hello world!"
        }
    }

    render() {
        return (
            // TODO: Implement onChange for certain fields
            // TODO: Add comment history for each logged-in user
            <div className='profile'>
                <div className='profile_head'>
                    <PageHeader
                        title='Public Profile'
                    />
                </div>

                <div className='profile_body'>
                    <div className='profile_left'>
                        <div name='title'>
                            Account
                        </div>
                        <Input
                            className='fixed_info'
                            placeholder='user account'
                            defaultValue={this.info.account}
                            disabled='true'
                        />

                        <div name='title'>
                            Name
                        </div>
                        <Input
                            placeholder='user name'
                            defaultValue={this.info.name}
                            disabled='true'
                        />

                        <div name='title'>
                            Email
                        </div>
                        <Input
                            placeholder='email address'
                            defaultValue={this.info.email}
                            disabled='true'
                        />

                        <div name='title'>
                            Department
                        </div>
                        <Input
                            placeholder='department'
                            defaultValue={this.info.department}
                            disabled='true'
                        />

                        <div name='title'>
                            Bio
                        </div>
                        <TextArea
                            placeholder='Tell us a little bit about yourself'
                            allowClear
                        />
                    </div>

                    <div className='profile_right'>
                        <div className='photo'>
                            Photo should be inserted here.
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;