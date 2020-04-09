import React, { Component } from "react";
import './home.less';
import { Sidebar } from '../sidebar/Sidebar';
import { Professor } from '../content/Professor';
import { Course } from '../content/Course';
// import { Welcome } from '../content/Welcome';
import { Profile } from '../content/Profile';
import { Navigator } from '../navigator/Navigator'
import { DefaultContent } from '../content/DefaultContent'
import { setRawCookie } from "react-cookies";
import cookie from 'react-cookies';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'default',
            login: false
        };
    }

    currentCallback = (newCurrent) => {
        if (newCurrent != 'login') {
            this.setState({
                current: newCurrent
            });
        } else {
            if (cookie.load('username') !== undefined) {
                this.setState({
                    login: true
                })
            }
            console.log('login: ', this.state.login);
        }
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

    componentDidMount() {
        if (cookie.load('username') !== undefined) {
            this.setState({
                login: true
            })
        }
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