import './App.css';

import React, {Component} from "react"
import Modal from "./components/Modal"
import axios from "axios";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      modal: false
    };
  };

  async componentDidMount(){
    try {
      const res = await fetch('http://localhost:8000/api/todo/');
      const todoList = await res.json();
      this.setState({
        todoList
      });
    } catch (e) {
      console.log(e);
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  //Responsible for saving the task
  handleSubmit = item => {
    this.toggle();
    if(item.id) {
      axios
        .put(`http://localhost:8000/api/todo/${item.id}/`, item)
        .then( (response) => {
          const new_list = this.state.todoList;
          const t = new_list.find( (task) => task.id === item.id );
          Object.assign( t, item);
          this.setState({
            todoList: new_list
          })
        })
        .catch( (error) => console.log(error) );
      return;
    }
    axios
      .post("http://localhost:8000/api/todo/", item)
      .then( (response) => {
        //Add the new item to the list
        this.setState({
          todoList: [...this.state.todoList, response.data]
        })
      })
      .catch( (error) => console.log(error) );
  };

  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (id) => {
    this.setState({
      activeItem: this.state.todoList.find( (item) => item.id ===id),
      modal: true
    });
    
  }

  displayCompleted = status => {
    if(status) {
      return this.setState({ viewCompleted: true});
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <button
          onClick={ ()=>this.displayCompleted(true)}
          className= {this.state.viewCompleted ? "active" : ""}
          >
            Complete
          </button>
        <button
          onClick={ () => this.displayCompleted(false) }
          className={this.state.viewCompleted ? "" : "active" }
          >
            Incomplete
          </button>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter( item => item.completed === viewCompleted);
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
        onClick={() => this.editItem(item.id)}
        >
          <span
            className={`todo-title mr-2 
            ${ this.state.viewCompleted ? "completed-todo" : "" } `}
            title={item.description}
            >
              {item.title}
            </span>
        </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
          <Modal
            activeItem={this.state.activeItem}
            show={this.state.modal}
            onSave={this.handleSubmit}
            />
      
      </main>
    );
  }
}

export default App;
