import React, { Component } from "react";
import './home.less';
import { Sidebar } from '../sidebar/Sidebar';
import { Professor } from '../content/Professor';
import { Course } from '../content/Course';
// import { Welcome } from '../content/Welcome';
import { Profile } from '../content/Profile';
import { Navigator } from '../navigator/Navigator'
import { DefaultContent } from '../content/DefaultContent'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'default'
        };
    }

    currentCallback = (newCurrent) => {
        this.setState({
            current: newCurrent
        })
    }

    sidebarCallback = (id, newCurrent) => {
        console.log(id, newCurrent)
        this.setState({
            course: id,
            current: newCurrent
        })
    }

    courseCallback = (id, newCurrent) => {
        this.setState({
            prof: id,
            current: newCurrent
        })
    }

    render() {
        // TODO: Implement the state change to allow viewing different content on click different links
        return (
            <div className='home'>
                <div className='up'>
                    <Navigator parentCallback={this.currentCallback}></Navigator>
                </div>

                <div className='bottom'>
                    <div className='left'>
                        <Sidebar parentCallback={this.sidebarCallback}></Sidebar>
                    </div>

                    <div className='right'>
                        <div className='content'>
                            {
                                this.state.current == 'default' &&
                                <DefaultContent></DefaultContent>
                            }
                            {
                                this.state.current == 'prof' && this.state.prof &&
                                <Professor prof={this.state.prof}></Professor>
                            }
                            {
                                this.state.current == 'course' && this.state.course &&
                                <Course course={this.state.course} parentCallback={this.courseCallback}></Course>
                            }
                            {
                                this.state.current == 'profile' &&
                                <Profile></Profile>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;