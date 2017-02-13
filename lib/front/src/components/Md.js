import React from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {mdChanged, editorPosChanged} from '../actions/actions';
import {insertReplaceAtCursor} from '../utils/editorUtils';
import {getMd, getInsert} from '../selectors';

const mapStateToProps = (state) => ({
	value: getMd(state),
	insert: getInsert(state)
});

const mapDispatchToProps = dispatch => ({
	mdEdited: (mdValue) => dispatch(mdChanged(mdValue)),
	editorPosChanged: (payload) => dispatch(editorPosChanged(payload))
});

var markdownEl;

class Md extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value
		};

		this.handleChange = this.handleChange.bind(this);
		this.handlePos = this.handlePos.bind(this);
	}

	componentDidMount() {
		markdownEl = findDOMNode(this).querySelector('textarea');
	}

	handleChange(rEvent) {
		var event = rEvent.nativeEvent;
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
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
			return;
		}

		if (nextProps.insert) {
			var insertResult = {
				text: this.state.value,
				selectionEnd: this.state.selectionEnd,
				selectionStart: this.state.selectionStart
			}

			while (nextProps.insert.length) {
				var insertItem = nextProps.insert.pop();

				insertResult = insertReplaceAtCursor({
					value: insertItem.insert,
					pattern: insertItem.pattern,
					text: insertResult.text,
					selectionEnd: insertResult.selectionEnd,
					selectionStart: insertResult.selectionStart
				});
			}

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
			this.props.mdEdited(this.state.value);
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
