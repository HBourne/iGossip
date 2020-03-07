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
                This is where course pages should be implemented!
            </div>
        )
    }
}

export default Course;