import React, { Component } from "react";
import './home.less';
import { Sidebar } from '../sidebar/Sidebar';
import { Professor } from '../content/Professor';
import { Course } from '../content/Course';
import { Welcome } from './Welcome';
import { Profile } from '../content/Profile';
import { Favorites } from '../content/Favorites';
import { Navigator } from '../navigator/Navigator'
import { DefaultContent } from '../content/DefaultContent'
import { setRawCookie } from "react-cookies";
import cookie from 'react-cookies';
import axios from 'axios';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'home',
            login: false
        };
    }

    currentCallback = (newCurrent) => {
        if (newCurrent != 'login' && newCurrent != 'logout') {
            this.setState({
                current: newCurrent
            });
        } else {
            if (cookie.load('username') !== undefined) {
                this.setState({
                    login: true
                })
            } else {
                this.setState({
                    login: false,
                    current: 'home'
                })
            }
        }
    }

    sidebarCallback = (item, newCurrent) => {
        this.setState({
            course: item,
            current: newCurrent
        })
    }

    courseCallback = (id, newCurrent) => {
        this.setState({
            prof: id,
            current: newCurrent
        })
    }

    favoritesCallback = (item, newCurrent) => {
        this.setState({
            course: item,
            current: newCurrent
        })
    }

    componentDidMount() {
        axios.post('http://igossip.info/user/auth/')
            .then((res) => {
                if (res.status == 200) {
                    cookie.save('username', res.data);
                    this.setState({
                        login: true
                    });
                }
            })
    }

    render() {
        return (
            <div className='home'>
                <div className='up'>
                    <Navigator parentCallback={this.currentCallback} login={this.state.login} current={this.state.current}></Navigator>
                </div>
                <div className='bottom'>
                    <div className='left'>
                        <Sidebar parentCallback={this.sidebarCallback}></Sidebar>
                    </div>

                    <div className='right'>
                        <div className='content'>
                            {
                                this.state.current == 'home' &&
                                <Welcome></Welcome>
                            }
                            {
                                this.state.current == 'prof' && this.state.prof &&
                                <Professor prof={this.state.prof}></Professor>
                            }
                            {
                                this.state.current == 'course' && this.state.course &&
                                <Course course={this.state.course} parentCallback={this.courseCallback} login={this.state.login}></Course>
                            }
                            {
                                this.state.current == 'profile' &&
                                <Profile></Profile>
                            }
                            {
                                this.state.current == 'favorites' &&
                                <Favorites parentCallback={this.favoritesCallback}></Favorites>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;