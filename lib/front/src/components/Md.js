import React from 'react';
var { findDOMNode } = require('react-dom');
import { connect } from 'react-redux';
import { mdChanged, editorPosChanged } from '../actions/actions';
import { insertReplaceAtCursor } from '../utils/editorUtils';
import { getMd, getPreviewPanelOpen, getInsert } from '../selectors';

import { ScrollSyncPane } from 'react-scroll-sync';


const mapStateToProps = (state) => ({
	value: getMd(state),
	previewPanelOpen: getPreviewPanelOpen(state),
	insert: getInsert(state)
});

const mapDispatchToProps = dispatch => ({
	mdEdited: (mdValue) => dispatch(mdChanged(mdValue)),
	//editorPosChanged: (payload) => dispatch(editorPosChanged(payload))
});

var markdownEl;

class Md extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	//value: this.props.value,
		// 	dirty: false
		// };

		this.state = {
			selectionEnd: 0,
			selectionStart: 0
		};

		this.handleChange = this.handleChange.bind(this);
		//this.handlePos = this.handlePos.bind(this);
	}

	componentDidMount() {
		markdownEl = findDOMNode(this).querySelector('textarea');
	}

	handleChange(rEvent) {
		var target = rEvent.nativeEvent.target;
		this.setState({
			//value: target.value,
			//dirty: true,
			selectionStart: target.selectionStart,
			selectionEnd: target.selectionEnd
		});
		this.props.mdEdited(target.value);
	}

	// handlePos(rEvent) {
	// 	var target = rEvent.nativeEvent.target;

	// 	//if value is different the position has already been updated by handleChange method
	// 	if (target.value !== this.state.value) {
	// 		return;
	// 	}

	// 	this.setState({
	// 		selectionStart: target.selectionStart,
	// 		selectionEnd: target.selectionEnd
	// 	});

	// 	window.requestIdleCallback(() => {
	// 		this.props.editorPosChanged({
	// 			selectionStart: target.selectionStart,
	// 			selectionEnd: target.selectionEnd
	// 		});
	// 	});
	// }

	componentWillReceiveProps(nextProps) {
		if (!nextProps.previewPanelOpen && this.props.previewPanelOpen) {
			markdownEl.focus();
		}

		// if (nextProps.value !== this.props.value) {
		// 	//this.setState({ value: nextProps.value });
		// 	return;
		// }

		if (nextProps.insert) {
			var insertResult = {
				text: this.props.value,
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
				//value: insertResult.text,
				selectionEnd: insertResult.selectionEnd,
				selectionStart: insertResult.selectionStart
			})

			this.props.mdEdited(insertResult.text);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		markdownEl.selectionEnd = this.state.selectionEnd;
		markdownEl.selectionStart = this.state.selectionStart;

		//this.state.dirty filters the case when the value changes because a new file is loaded
		// if (this.state.value !== prevState.value && this.state.dirty) {
		// 	window.requestIdleCallback(() => {
		// 		this.props.mdEdited(this.state.value);
		// 	});
		// }
	}

	render() {
		return (
			<div className="mdContainer">
				<div className="tabContainer">
					<div className="tab mdTab text">Markdown editor</div>
				</div>
				<ScrollSyncPane>
					<textarea
						className="raw-markdown"
						value={this.props.value}
						onChange={this.handleChange}
						//onKeyUp={this.handlePos}
						//onMouseUp={this.handlePos}
					/>
				</ScrollSyncPane>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Md);
