import React, { Component } from "react";
import './professor.less'
import { Descriptions, List } from 'antd';
import 'antd/dist/antd.css';

// Professor
// - Display all the information about certain professor requested by user including:
//   - name
//   - title
//   - age
//   - description
//   - courses held

export class Professor extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.info = {
            name: 'xxx',
            position: 'xxx',
            office: 'xxx',
            tel: 'xxx',
            fax: 'xxx',
            email: 'xxx',
            webpage: 'xxx',
            education: [
                {
                    degree: 'BS',
                    description: 'Dept. of Computer Science, University of Illinois (2018)'
                }, {
                    degree: 'MS',
                    description: 'Dept. of Computer Science, University of Illinois (2020)'
                }
            ],
            work: [
                {
                    year: '2020-now',
                    description: 'Assistant Professor, CS Dept., University of Illinois at Urbana Champaign'
                }
            ],
            honor: [
                {
                    org: 'University of Illinois',
                    year: '2020',
                    description: 'Excellent Graduate Student'
                }
            ],
            journal: [
                {
                    id: 1,
                    pub: 'xxxxxxxxxx'
                }, {
                    id: 2,
                    pub: 'aaaaaaaaa'
                }
            ]
        }
    }

    render() {
        return (
            <div className='professor'>
                <div className='info'>
                    <div name='title'>
                        {this.info.name}
                    </div>
                    <div className='body'>
                        <div className='contact'>
                            <Descriptions title={this.name} layout='vertical'>
                                <Descriptions.Item label='Position'>{this.info.position}</Descriptions.Item>
                                <Descriptions.Item label='Office'>{this.info.office}</Descriptions.Item>
                                <Descriptions.Item label='Tel'>{this.info.tel}</Descriptions.Item>
                                <Descriptions.Item label='Fax'>{this.info.fax}</Descriptions.Item>
                                <Descriptions.Item label='Email'>{this.info.email}</Descriptions.Item>
                                <Descriptions.Item label='Webpage'>{this.info.webpage}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className='photo'>
                            Photo should be inserted here.
                        </div>
                    </div>
                </div>

                <div className='education'>
                    <div name='title'>
                        Education
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.info.education}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.degree}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div className='work'>
                    <div name='title'>
                        Work Experience
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.info.work}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.year}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div className='honor'>
                    <div name='title'>
                        Honor
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.info.honor}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={this.generateHonorTitle(item.org, item.year)}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div className='journal'>
                    <div name='title'>
                        Journal
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.info.journal}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.id}
                                    description={item.pub}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }

    generateHonorTitle = (org, year) => {
        return org + " " + year;
    }
}



export default Professor;