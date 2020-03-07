import React, { Component } from "react";
import './professor.less'

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
    }

    render() {
        return (
            <div className='professor'>
                This is where professor page should be implemented!
            </div>
        )
    }
}

export default Professor;