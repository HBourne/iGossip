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
        return (
            <div className='home'>
                <div className='up'>
                    <div className='navigator'>
                        <Navigator></Navigator>
                    </div>
                </div>

                <div className='bottom'>
                    <div className='left'>
                        <div className='sidebar'>
                            <Sidebar></Sidebar>
                        </div>
                    </div>

                    <div className='right'>
                        <div className='content'>
                            {/* The content should be determined by the state and choose from Professor, Course, Profile and DefaultContent */}

                            {/* <Professor></Professor>
                            <Course></Course>
                            <Profile></Profile> */}
                            <DefaultContent></DefaultContent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;