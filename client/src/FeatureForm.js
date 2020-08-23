import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class FeatureForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project_id: '',
			description: '',
			type: '',
			priority: '',
			completed: ''
		};
	}
	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleSubmit = async (evt) => {
		evt.preventDefault();
		await axios
			.post(`http://localhost:9000/create/features`, this.state)
			.then((res) => {
				console.log(res);
			})
			.catch(function(error) {
				console.log(error);
			});
		await axios
			.get(
				`http://localhost:9000/select/projects/${this.props.id}`
			)
			.then((res) => {
				console.log(res);
				const projectList = res.data;
				this.setState({ list: projectList });
			});
		this.props.addItem(this.state.list);
	};

	render() {
		return (
			<div className="container">
				<h1>Enter a new feature:</h1>
				<form onSubmit={this.handleSubmit}>
					<div class="row">
						<div className="form-group col">
							<label htmlFor="project_id">Add to project:</label>
							<input
								type="number"
								className="form-control"
								id="project_id"
								placeholder="Project ID"
								name="project_id"
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group col">
							<label htmlFor="type">Type:</label>
							<select
								type="select"
								className="form-control"
								id="type"
								name="type"
								onChange={this.handleChange}
								required
							>
								<option value="1">Front End</option>
								<option value="0">Back End</option>
							</select>
						</div>
						<div className="form-group col">
							<label htmlFor="priority">Priority</label>
							<select
								type="select"
								className="form-control"
								id="priority"
								name="priority"
								onChange={this.handleChange}
								required
							>
								<option selected value="1">
									1
								</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="completed">Completed?</label>
							<select
								type="select"
								className="form-control"
								id="completed"
								name="completed"
								onChange={this.handleChange}
								required
							>
								<option value="true">Yes</option>
								<option selected value="false">
									No
								</option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							className="form-control"
							id="description"
							name="description"
							onChange={this.handleChange}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
						Add task
					</button>
				</form>
			</div>
		);
	}
}
