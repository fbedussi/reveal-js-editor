import React from 'react';
import {connect} from 'react-redux';
import {openFilePath} from '../actions/actions';
import {getLabels, getSlideBgImage} from '../selectors';
import Label from './Label';
import Button from './Button';
import InputWrapper from './InputWrapper';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	currentSettings: getSlideBgImage(state)
});

const mapDispatchToProps = dispatch => ({
	openFilePath: (fileType, finalAction) => dispatch(openFilePath(fileType, finalAction))
});

class OpenImage extends React.Component {
	render() {
		return (
			<InputWrapper name={this.props.name}>
				<Label inputId="filePath" text={this.props.label}/>

				<Button
					clickHandler={() => this.props.openFilePath(this.props.fileType, this.props.finalAction)}
					text={this.props.buttonText}
				/>

				<input id="filePath" type="text"
					placeholder={this.props.labels['File path']}
					value={this.props.value}
					onChange={(e) => this.props.handler(e.target.value)}/>

				<button className="resetInput"
					onClick={(e) => this.props.handler('')}
				>
					<span className="icon"></span>
					<span className="text button-text">{this.props.labels['Reset']}</span>
				</button>
			</InputWrapper>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
