import React, { Component } from "react";
import './home.less';
import { Sidebar } from '../sidebar/Sidebar';
import { Professor } from '../content/Professor';
import { Course } from '../content/Course';
import { Profile } from '../content/Profile';
import { Navigator } from '../navigator/Navigator'
import { DefaultContent } from '../content/DefaultContent'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        // TODO: Implement the state change to allow viewing different content on click different links
        return (
            <div className='home'>
                <div className='up'>
                    <Navigator></Navigator>
                </div>

                <div className='bottom'>
                    <div className='left'>
                        <Sidebar></Sidebar>
                    </div>

                    <div className='right'>
                        <div className='content'>
                            {/* The content should be determined by the state and choose from Professor, Course, Profile and DefaultContent */}
                            <Login></Login>
                            {/* <Professor></Professor> */}
                            {/* <Course></Course> */}
                            {/* <Profile></Profile> */}
                            {/* <DefaultContent></DefaultContent> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;