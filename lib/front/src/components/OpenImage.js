import React from 'react';
import { connect } from 'react-redux';
import {openBgImage, setBgImage} from '../actions/actions';
import {getLabels, getSlideBgImage} from '../selectors';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	currentSettings: getSlideBgImage(state)
});

const mapDispatchToProps = dispatch => ({
	openBgImage: () => dispatch(openBgImage()),
	setBgImage: () => dispatch(setBgImage())
});

class OpenImage extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = this.getBlankState();

	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.resetBgImage = this.resetBgImage.bind(this);
	// }

	// getBlankState() {
	// 	return {
	// 		'background-image': ''
	// 	};
	// }

	// resetBgImage(event) {
	// 	this.setState(this.getBlankState());
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.currentSettings && nextProps.currentSettings !== this.state) {
	// 		var nextState = nextProps.currentSettings;

	// 		this.setState(nextState);
	// 	} else {
	// 		this.setState(this.getBlankState());
	// 	}
	// }

	// handleChange(event) {
	// 	var input = event.target;
	// 	var value = input.value;


	// 	//this.setState({'background-image': value});
	// 	this.props.handler({'background-image': value});
	// }

	render() {
		return (
			<div className="inputWrapper imageBgWrapper">
				<label htmlFor="imageBg">
					<span className="icon"></span>
					<span className="text">{this.props.labels['Background image']}</span>
				</label>

				<button id="imageBgButton"
					onClick={this.props.openBgImage}
				>
					<span className="icon"></span>
					<span className="text button-text">{this.props.labels['Select image']}</span>
				</button>

				<input id="imageBg" type="text"
					placeholder={this.props.labels['File path']}
					value={this.props.value}
					onChange={(e) => this.props.handler(e.target.value)}/>
				<button className="resetInput" data-input-id="imageBg"
					onClick={this.resetBgImage}
				>
					<span className="icon"></span>
					<span className="text button-text">{this.props.labels['Reset']}</span>
				</button>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
