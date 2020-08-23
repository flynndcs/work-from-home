import React, { Component } from 'react';
import axios from 'axios';

export default class CompleteButton extends Component {
	constructor(props) {
		super(props);
		this.state = { list: [], payload: { completed: '1' } };
	}

	handleComplete = async (evt) => {
		evt.preventDefault();
		console.log('Marking complete task: ', this.props.id);
		await axios
			.post(
				`http://localhost:9000/update/tasks/${this.props.id}`,
				this.state.payload
			)
			.then((res) => {
				console.log(res);
			})
			.catch(function(error) {
				console.log(error);
			});
		await axios
			.get(`http://localhost:9000/select/tasks`)
			.then((res) => {
				console.log(res);
				const projectList = res.data;
				this.setState({ list: projectList });
			});
		this.props.completeTask(this.state.list);
	};

	render() {
		return (
			<div>
				<button className="btn btn-primary" onClick={this.handleComplete}>
					Mark complete
				</button>
			</div>
		);
	}
}
