import React, { Component } from 'react';
import axios from 'axios';

export default class EmployeeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			time_zone: '',
			seniority: '',
			team_id: ''
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
			.post(`http://localhost:9000/create/employees`, this.state)
			.then((res) => {
				console.log('Sent employee form data');
				console.log(this.state);
				console.log(res);
			})
			.catch(function(error) {
				console.log(error);
			});
		await axios
			.get(`http://localhost:9000/select/employees`)
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
				<h1>Add a new employee:</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="form-group col">
							<label htmlFor="first_name">First Name:</label>
							<input
								type="text"
								className="form-control"
								id="first_name"
								placeholder="First name"
								name="first_name"
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group col">
							<label htmlFor="last_name">Last Name:</label>
							<input
								type="text"
								className="form-control"
								id="last_name"
								placeholder="Last name"
								name="last_name"
								onChange={this.handleChange}
								required
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col">
							<label htmlFor="time_zone">Time zone:</label>
							<input
								type="number"
								className="form-control"
								id="time_zone"
								name="time_zone"
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group col">
							<label htmlFor="seniority">Seniority</label>
							<select
								type="select"
								className="form-control"
								id="seniority"
								name="seniority"
								onChange={this.handleChange}
								required
							>
								<option selected value="New Grad">
									New Grad
								</option>
								<option value="Junior">Junior</option>
								<option value="Senior">Senior</option>
							</select>
						</div>
						<div className="form-group col">
							<label htmlFor="team_id">Assigned to team:</label>
							<input
								type="number"
								className="form-control"
								id="team_id"
								placeholder="Team ID"
								name="team_id"
								onChange={this.handleChange}
								required
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary" onClick={this.props.handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}
