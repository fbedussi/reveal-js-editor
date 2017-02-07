import React from 'react';
import {connect} from 'react-redux';
import OpenFile from './OpenFile';
import {closeConfPanel, setConfiguration, setTempParallaxBgImage} from '../actions/actions';
import {getLabels, getRightPanelStatus, getConfiguration} from '../selectors';
import Label from './Label';
import InputWrapper from './InputWrapper';
import Button from './Button';
import Panel from './Panel';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	open: getRightPanelStatus(state),
	conf: getConfiguration(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeConfPanel()),
	setConfiguration: (newConf) => dispatch(setConfiguration(newConf))
});

class ConfPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.props.conf;
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.open) {
			return;
		}

		if (nextProps.conf.tempParallaxBgImage) {
			nextProps.conf.parallaxBackgroundImage = nextProps.conf.tempParallaxBgImage;
		}

		this.setState(nextProps.conf);
	}

	handleChange(event, key) {
		var input = event.target;
		var value = input.type === 'checkbox' ? input.checked : input.value;

		var obj = {};
		obj[key] = value;
		this.setState(Object.assign({}, this.state, obj));
	}

	handleSubmit() {
		this.props.setConfiguration(this.state);
		this.props.closePanel();
	}

	render() {
		return (
			<Panel name='confPanel' closePanel={this.props.closePanel}>
				<InputWrapper name='autoSlideWrapper'>
					<Label inputId="autoSlide" text={this.props.labels['Auto play velocity (0 to disable)']} />
					<input id="autoSlide" type="number" min="0" step="500"
						value={this.state.autoSlide}
						onChange={(e) => this.handleChange(e, 'autoSlide')}
					/>
				</InputWrapper>

				<InputWrapper name="viewDistanceWrapper">
					<Label inputId="viewDistance" text={this.props.labels['Number of slides preloaded in lazy load mode (0 to disable lazy load)']}/>
					<input id="viewDistance" type="number"
						value={this.state.viewDistance}
						onChange={(e) => this.handleChange(e, 'viewDistance')}
					/>
				</InputWrapper>

				<InputWrapper name="parallaxBackgroundSizeWrapper">
        			<Label inputId="parallaxBackgroundSize" text={this.props.labels['Parallax background size (CSS syntax, e.g. "2100px 900px"']}/>
        			<input id="parallaxBackgroundSize" type="text"
						value={this.state.parallaxBackgroundSize}
						onChange={(e) => this.handleChange(e, 'parallaxBackgroundSize')}
					/>
    			</InputWrapper>

				<OpenFile
					name='parallaxBackgroundImageWrapper'
					label={this.props.labels['Parallax background image']}
					buttonText={this.props.labels['Select image']}
					finalAction={(path) => setTempParallaxBgImage(path)}
					fileType='img'
					handler={
						imgPath => {
							this.setState(Object.assign({}, this.state, {parallaxBackgroundImage: imgPath, tempParallaxBgImage: null}));
						}
					}
					value={this.state['parallaxBackgroundImage']}
				/>

				<div className="buttonRow">
					<Button clickHandler={() => this.props.closePanel()} text={this.props.labels['Cancel']} />
					<Button clickHandler={() => this.handleSubmit()} text={this.props.labels['Save']} />
				</div>
			</Panel>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfPanel);
