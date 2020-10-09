import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddTodo extends Component {
	state = {
		name: ''
	};

	addTodoItem = e => {
		e.preventDefault();
		console.log(this.state);

		//Do not add empty input values
		if (this.state.name.trim().length === 0) {
			return;
		}

		this.props.addTodo(this.state.name);

		this.setState({ name: '' });
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		console.log(this.props);
		return (
			<Modal isOpen={this.props.modal}>
				<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
				<ModalBody>
					<form onSubmit={this.addTodoItem}>
						<input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
						<button type="submit">Add Todo</button>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.toggle}>
						Do Something
					</Button>{' '}
					<Button color="secondary" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default AddTodo;
