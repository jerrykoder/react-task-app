import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';

class Todos extends Component {
	render() {
		console.log(this.props);
		const { deleteTodo, changeTodo, editTodo, doneEditTodo, cancelEditTodo, filterTodos } = this.props;
		return (
			<ListGroup>
				{filterTodos().map(todo => (
					<TodoItem
						deleteTodo={deleteTodo}
						changeTodo={changeTodo}
						editTodo={editTodo}
						doneEditTodo={doneEditTodo}
						cancelEditTodo={cancelEditTodo}
						key={todo.id}
						todo={todo}
					/>
				))}
			</ListGroup>
		);
	}
}

export default Todos;

Todos.propTypes = {
	todos: PropTypes.array.isRequired,
	changeTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired
};
