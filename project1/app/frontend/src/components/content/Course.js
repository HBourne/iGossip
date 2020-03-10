import React, { Component } from "react";
import './course.less'

// Course:
// - Display all the information about certain course requested by user including:
//   - course name
//   - course description
//   - CRN
//   - Ratings
//   - Comments
//   - Average gpa


export class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='course'>
                <div className='title'>
                    <div className='name'>
                        Course Code - Course Name
                    </div>
                    <div className='credit'>
                        Available Credits: 3 / 4
                    </div>
                </div>

                <div className='description'>
                    Course Description:
                </div>

                <div className='relevant'>
                    Relevant Courses:
                </div>

                <div className='body'>
                    <div className='comment'>
                        comments
                    </div>

                    <div className='review'>
                        ratings
                    </div>
                </div>
            </div>
        )
    }
}

export default Course;