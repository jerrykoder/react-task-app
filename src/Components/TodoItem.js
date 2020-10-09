import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroupItem } from 'reactstrap';

const TodoItem = props => {
	//console.log(props)
	const { changeTodo, deleteTodo, editTodo, doneEditTodo, cancelEditTodo } = props;
	const { id, title, completed, editing } = props.todo;

	return (
		<ListGroupItem className={completed ? 'line' : ''} onDoubleClick={() => editTodo(props.todo)}>
			<input type="checkbox" onChange={changeTodo.bind(this, props.todo)} checked={completed} />

			{editing ? (
				<input
					type="text"
					defaultValue={title}
					autoFocus
					onBlur={e => doneEditTodo(props.todo, e)}
					onKeyUp={e => {
						if (e.key === 'Enter') {
							doneEditTodo(props.todo, e);
						} else if (e.key === 'Escape') {
							cancelEditTodo(props.todo, e);
						}
					}}
				/>
			) : (
				<span>{title}</span>
			)}

			<Button
				className="btn-delete"
				color="danger"
				onClick={() => {
					deleteTodo(id);
				}}
			>
				X
			</Button>
		</ListGroupItem>
	);
};

export default TodoItem;

// const todoStyle = {
// 	backgroundColor: '#ccc',
// 	padding: '20px'
// };
// style={todoStyle}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	changeTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired
};
