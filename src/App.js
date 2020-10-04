import React, { Component } from 'react';
import TaskList from './TaskList';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: {
        text: '',
        key: ''
      }
    };
  }

  componentDidMount() {
    if( localStorage.getItem('items') ) {
      let data = JSON.parse(localStorage.getItem('items'));
      if( !data.currentTask ) {
        this.setState({
          tasks: [...data]
        });
      }else {
        this.setState({
          tasks: [...data.tasks, data.currentTask]
        });
      }
    }
  }

  handleInput = (e) => {
    this.setState({
      currentTask: {
        text: e.target.value,
        key: Date.now()
      }
    });
  };

  addTask = (e) => {
    e.preventDefault();
    let newTask = this.state.currentTask;
    if( newTask.text !== '' ) { 
      this.setState({
        tasks: [...this.state.tasks, newTask],
        currentTask: {
          text: '',
          key: ''
        }
      });
    }   
    localStorage.setItem('items', JSON.stringify(this.state));
  };

  deleteTask = (key) => {
    let filterTask = this.state.tasks.filter(task => task.key !== key);
    this.setState({
      tasks: filterTask
    });
    localStorage.setItem('items', JSON.stringify(filterTask));
  };

  updateTask = (text, key) => {
    let tasks = this.state.tasks;
    tasks.map(task => {
      if( task.key === key ) {
        task.text = text;
      }
    });
    this.setState({
      tasks
    });
    localStorage.setItem('items', JSON.stringify(tasks));
  };

  render() {
    let {tasks, currentTask} = this.state;
    return (
      <div className="App">
        <form className="Header" onSubmit={this.addTask}>
            <input type="text" placeholder="Enter task" value={currentTask.text} onChange={this.handleInput} />
            <button type="submit">Add</button>
        </form>
        <TaskList task={tasks} delete={this.deleteTask} update={this.updateTask} />
      </div>
    );
  }
}

export default App;