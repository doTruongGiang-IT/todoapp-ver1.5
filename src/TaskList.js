import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';
import './TaskList.css';

class TaskList extends Component {
    deleteTask = (key) => {
        this.props.delete(key);
    };

    editTask = (text, key) => {
        this.props.update(text, key);
    }

    render() {
        let listTask = this.props.task.map(task => {
            return <div className="taskList" key={task.key}>
                        <p>
                            <input type="text" id={task.key} value={task.text} onChange={(e) => this.editTask(e.target.value, task.key)} />
                            <span>
                                <FontAwesomeIcon className="faicons" icon="trash" onClick={() => this.deleteTask(task.key)} />
                            </span>
                        </p>
                    </div>
        }); 

        return (
            <div>
                <FlipMove duration={300} easing="ease-in-out">
                    {listTask}
                </FlipMove>
            </div>
        );
    }
}

export default TaskList;
