import React, { Component } from 'react';
import axios from 'axios';

export default class ProjectSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchBy: 'id',
			item: []
		};
	}
	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleSearch = async (evt) => {
		evt.preventDefault();
		if (this.state.searchBy === 'id') {
			await axios
				.get(
					`http://localhost:9000/select/projects/search/id/` +
						this.state.searchText
				)
				.then((res) => {
					console.log(res);
					const projectList = res.data;
					this.setState({ item: projectList });
				});
		} else if (this.state.searchBy === 'description') {
			await axios
				.get(
					`http://localhost:9000/select/projects/search/` +
						this.state.searchText
				)
				.then((res) => {
					console.log(res);
					const projectList = res.data;
					this.setState({ item: projectList });
				});
		}
		this.props.searchProject(this.state.item);
	};

	render() {
		return (
			<form onSubmit={this.handleSearch}>
				<div className="row">
					<div className="input-group input-group-md col">
						<div className="input-group-prepend">
							<select
								value={this.state.searchBy}
								className="custom-select"
								id="searchBy"
								name="searchBy"
								onChange={this.handleChange}
							>
								<option selected value="id">
									Search projects by ID
								</option>
								<option value="description">Search projects by description</option>
							</select>
						</div>
						<input
							className="input-group imput-group-md col"
							type="text"
							id="searchText"
							name="searchText"
							className="form-control"
							aria-label="Large"
							aria-describedby="inputGroup-sizing-sm"
							placeholder="Search projects"
							onChange={this.handleChange}
						/>
						<button className="btn btn-primary">Go!</button>
					</div>
				</div>
			</form>
		);
	}
}
