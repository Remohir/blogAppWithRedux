import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}

	// How to avoid fetching data twice (in case network usage could be a problem)
	// componentDidMount() {
	// 	if (!this.props.post) {	
	// 		const { id } = this.props.match.params;
	// 		this.props.fetchPost(id);
	// 	}
	// }

	onDeleteClick() {
		const { id } = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push("/");
		});
	}

	render() {
		const { post } = this.props;

	if (!post) {
		return <div>Loading...</div>;
	}

		return (
			<div>
				<Link to="/" className="a">Back to index</Link>
				<button
					className="btn btn-danger pull-xs-right top"
					onClick={ this.onDeleteClick.bind(this) }
				>
					Delete Post
				</button>
				<h3 className="post_title">{ post.title }</h3>
				<h6 className="post_categories">Categories: { post.categories }</h6>
				<p className="post_content">{ post.content }</p>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);