import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//import uuid from 'uuid';
import axios from 'axios';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import Navigation from './Components/Navigation';
import About from './Components/About';
import { Button, Container, Row, Col, Alert } from 'reactstrap';

const apiUrl = process.env.REACT_APP_API;

class App extends Component {
	state = {
		modal: false,
		beforeEditCache: '',
		filter: 'all',
		todos: []
	};

	componentDidMount() {
		axios
			.get(apiUrl)
			.then(res => {
				console.log(res.data);
				this.setState({ todos: res.data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	changeTodo = todo => {
		console.log(todo);
		let completedTodo = { completed: !todo.completed };
		axios
			.put(`${apiUrl}/${todo.id}`, completedTodo)
			.then(res => {
				console.log(res.data);

				let todos = this.state.todos;

				todo.completed = !todo.completed;

				this.setState({ todos });
			})
			.catch(error => {
				console.log(error);
			});
	};

	addTodo = title => {
		axios
			.post(apiUrl, { completed: false, title })
			.then(res => {
				console.log(res.data);
				this.setState({ todos: [...this.state.todos, res.data], modal: false });
			})
			.catch(error => {
				console.log(error);
			});
	};

	deleteTodo = id => {
		axios
			.delete(`${apiUrl}/${id}`)
			.then(res => {
				console.log(res.data);
				this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
			})
			.catch(error => {
				console.log(error);
			});
	};

	editTodo = todo => {
		console.log(todo);
		let editingTodo = {
			editing: true
		};
		axios
			.put(`${apiUrl}/${todo.id}`, editingTodo)
			.then(res => {
				console.log(res.data);

				let todos = this.state.todos;

				todo.editing = true;

				this.setState({ todos, beforeEditCache: todo.title });
			})
			.catch(error => {
				console.log(error);
			});
	};

	doneEditTodo = (todo, e) => {
		console.log(todo);
		e.persist();

		//let updateTodoTitle = e.target.value;
		let doneEditingTodo = { editing: false, title: e.target.value };
		axios
			.put(`${apiUrl}/${todo.id}`, doneEditingTodo)
			.then(res => {
				console.log(res.data);

				let todos = this.state.todos;

				todo.editing = false;
				todo.title = e.target.value;

				this.setState({ todos });
			})
			.catch(error => {
				console.log(error);
			});
	};

	cancelEditTodo = todo => {
		let todos = this.state.todos;

		todo.editing = false;
		todo.title = this.state.beforeEditCache;

		this.setState({ todos });
	};

	remainingTodos = () => {
		return this.state.todos.filter(todo => !todo.completed).length;
	};

	completedTodosCount = () => {
		return this.state.todos.filter(todo => todo.completed).length;
	};

	clearCompletedTodos = () => {
		let todos = this.state.todos;

		todos = todos.filter(todo => !todo.completed);

		this.setState({ todos });
	};

	updateFilterTodos = filter => {
		console.log(filter);
		this.setState({ filter });
	};

	filterTodos = () => {
		if (this.state.filter === 'all') {
			return this.state.todos;
		} else if (this.state.filter === 'active') {
			return this.state.todos.filter(todo => !todo.completed);
		} else if (this.state.filter === 'completed') {
			return this.state.todos.filter(todo => todo.completed);
		}

		return this.state.todos;
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	render() {
		return (
			<Router>
				<Container>
					<Row>
						<Col sm="12">
							<Navigation />
							<Switch>
								<Route
									exact
									path="/"
									render={props => (
										<div>
											<AddTodo addTodo={this.addTodo} modal={this.state.modal} toggle={this.toggle}/>
											<Alert color="primary">
											Remaining Todos: {this.remainingTodos()}
											</Alert>
											<Todos
												changeTodo={this.changeTodo}
												deleteTodo={this.deleteTodo}
												editTodo={this.editTodo}
												doneEditTodo={this.doneEditTodo}
												cancelEditTodo={this.cancelEditTodo}
												filterTodos={this.filterTodos}
												todos={this.state.todos}
											/>
											
											<div className="btns-list">
											{this.completedTodosCount() > 0 && (
												<Button color="danger" onClick={this.clearCompletedTodos}>
													Remove Completed Todos
												</Button>
											)}
											<Button
												color="primary" className={this.state.filter === 'all' ? 'active' : ''}
												onClick={() => this.updateFilterTodos('all')}
											>
												All
											</Button>
											<Button color="success"
												className={this.state.filter === 'active' ? 'active' : ''}
												onClick={() => this.updateFilterTodos('active')}
											>
												Active
											</Button>
											<Button color="success"
												className={this.state.filter === 'completed' ? 'active' : ''}
												onClick={() => this.updateFilterTodos('completed')}
											>
												Completed
											</Button>
											<Button color="primary" onClick={this.toggle}>
												+
											</Button></div>
										</div>
									)}
								/>
								<Route exact path="/about" component={About} />
							</Switch>
						</Col>
					</Row>
				</Container>
			</Router>
		);
	}
}

export default App;
