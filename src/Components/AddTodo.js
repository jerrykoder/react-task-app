import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,InputGroup, InputGroupAddon, Input } from 'reactstrap';

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
				<ModalHeader onClick={this.props.toggle}>Things to do!!</ModalHeader>
				<ModalBody>
					<Form onSubmit={this.addTodoItem}>
						<InputGroup>
				        <Input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
				        <InputGroupAddon addonType="append">
				          <Button color="primary">Create Task</Button>
				        </InputGroupAddon>
				      </InputGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.props.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default AddTodo;
