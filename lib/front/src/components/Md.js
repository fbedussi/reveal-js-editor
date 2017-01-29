import React from 'react';
var {findDOMNode} = require('react-dom');
import { connect } from 'react-redux';
import { mdEdited, editorPosChanged } from '../actions/actions';
import { insertReplaceAtCursor } from '../editor';

const mapStateToProps = (state) => ({
	md: state.main.md,
	insert: state.main.insert
});

const mapDispatchToProps = dispatch => ({
	mdEdited: (mdValue) => dispatch(mdEdited(mdValue)),
	editorPosChanged: (payload) => dispatch(editorPosChanged(payload))
});

var markdownEl;

class Md extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.md
		};

		this.handleChange = this.handleChange.bind(this);
		this.handlePos = this.handlePos.bind(this);
	}

	componentDidMount() {
		markdownEl = findDOMNode(this).querySelector('textarea');
	}

	handleChange(revent) {
		var event = revent.nativeEvent;
		this.setState({
			value: event.target.value,
			selectionStart: event.target.selectionStart,
			selectionEnd: event.target.selectionEnd
		});
	}

	handlePos(rEvent) {
		var event = rEvent.nativeEvent;
		this.setState({
			selectionStart: event.target.selectionStart,
			selectionEnd: event.target.selectionEnd
		});
		this.props.editorPosChanged({
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
				pattern: nextProps.insert.pattern,
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
					onKeyUp={this.handlePos}
					onMouseUp={this.handlePos}
					/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Md);
