import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${ touched && error ? "has-danger" : "" }`;

		return (
			<div className={ className }>
				<label>{ field.label }</label>
				<input
					className="form-control"
					type="text"
					{ ...field.input }
				/>
				<div className="form-group text-help">
					{ touched ? error : "" }
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () =>  {
			this.props.history.push("/");
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					<Field
						label="Title"
						name="title"
						component={ this.renderField }
					/>
					<Field
						label="Categories"
						name="categories"
						component={ this.renderField }
					/>
					<Field
						label="Post Content"
						name="content"
						component={ this.renderField }
					/>
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	// Values => { title: "a title", categories: "the categories", content: "text content" }
	const errors = {};

	// Validate the inputs from "values"
	if (!values.title || values.title.length < 3) {
		errors.title = "The title must be at least 3 characters long!";
	}
	if (!values.categories) {
		errors.categories= "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Please, enter some content"
	}

	// If errors is empty, the forms is fine to submit
	// If errors has *any* properties, redux form assumes form is invalid
	return errors;
}

export default reduxForm({
	validate,
	form: "PostsNewForm"
})(
	connect(null, { createPost })(PostsNew)
);