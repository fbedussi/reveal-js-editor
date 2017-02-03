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
					onClick={(e) => this.props.handler('')}
				>
					<span className="icon"></span>
					<span className="text button-text">{this.props.labels['Reset']}</span>
				</button>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
