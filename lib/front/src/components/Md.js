import React from 'react';
var {findDOMNode} = require('react-dom');
import { connect } from 'react-redux';
import { mdEdited } from '../actions/actions';
import { insertReplaceAtCursor } from '../editor';

const mapStateToProps = (state) => ({
	md: state.main.md,
	insert: state.main.insert
});

const mapDispatchToProps = dispatch => ({
	mdEdited: (mdValue) => dispatch(mdEdited(mdValue))
});

var markdownEl;

class Md extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.md
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		markdownEl = findDOMNode(this).querySelector('textarea');
	}

	//On keypress
	handleChange(event) {
		this.setState({
			value: event.target.value,
			selectionStart: event.target.selectionStart,
			selectionEnd: event.target.selectionEnd
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.md !== this.state.value) {
			this.setState({ value: nextProps.md });
			return;
		}

		if (nextProps.insert) {
			var insertResult = insertReplaceAtCursor({
				value: nextProps.insert.text,
				patter: nextProps.insert.pattern,
				text: markdownEl.value,
				selectionEnd: markdownEl.selectionEnd,
				selectionStart: markdownEl.selectionStart
			});

			this.setState({
				value: insertResult.text,
				selectionEnd: insertResult.selectionEnd,
				selectionStart: insertResult.selectionStart
			})


		}
	}

	//If value is changed dispatch the action
	componentDidUpdate(prevProps, prevState) {
		markdownEl.selectionEnd = this.state.selectionEnd;
		markdownEl.selectionStart = this.state.selectionStart;

		if (this.state.value !== prevState.value) {
			this.props.mdEdited({
				value: this.state.value,
				selectionStart: this.state.selectionStart,
				selectionEnd: this.state.selectionEnd
			});
		}
	}

	render() {
		return (
			<div className="mdContainer">
				<div className="tabContainer">
					<div className="tab mdTab text">Markdown editor</div>
				</div>
				<textarea
					className="raw-markdown"
					value={this.state.value}
					onChange={this.handleChange}
					/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Md);
