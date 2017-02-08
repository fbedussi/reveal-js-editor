import React from 'react';
import {connect} from 'react-redux';
import OpenFile from './OpenFile';
import {closeConfPanel, setConfiguration, setDefaultExtraConf} from '../actions/actions';
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
	setConfiguration: (newConf) => dispatch(setConfiguration(newConf)),
	setDefaultExtraConf: () => dispatch(setDefaultExtraConf())
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

		this.setState(nextProps.conf);
	}

	handleChange(event, key) {
		var input = event.target;
		var value = input.type === 'checkbox' ? input.checked : input.value;

		var obj = {};
		obj[key] = value;
		this.recordChange(obj);
	}

	recordChange(newSetting) {
		this.setState(Object.assign({}, this.state, newSetting));
		this.props.setConfiguration(newSetting);
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
					<Label inputId="viewDistance" text={this.props.labels['Number of slides preloaded in lazy load mode']}/>
					<input id="viewDistance" type="number"
						value={this.state.viewDistance}
						onChange={(e) => this.handleChange(e, 'viewDistance')}
					/>
				</InputWrapper>

				<InputWrapper name="parallaxBackgroundSizeWrapper">
        			<Label inputId="parallaxBackgroundSize" text={this.props.labels['Parallax background size (CSS syntax, e.g. \'2100px 900px\')']}/>
        			<input id="parallaxBackgroundSize" type="text"
						value={this.state.parallaxBackgroundSize}
						onChange={(e) => this.handleChange(e, 'parallaxBackgroundSize')}
					/>
    			</InputWrapper>

				<OpenFile
					name='parallaxBackgroundImageWrapper'
					label={this.props.labels['Parallax background image']}
					buttonText={this.props.labels['Select image']}
					finalAction={(path) => setConfiguration({parallaxBackgroundImage: path})}
					fileType='img'
					handler={
						imgPath => {
							this.recordChange({parallaxBackgroundImage: imgPath});
						}
					}
					value={this.state['parallaxBackgroundImage']}
				/>

				<InputWrapper name="parallaxBackgroundWrapper">
					<p className="text">{this.props.labels['Number of pixels to move the parallax background per slide']}</p>
					<div className="parallaxBackgroundInputWrapper">
						<Label inputId="parallaxBackgroundHorizontal"  text={this.props.labels['Horizontal']}/>
						<input id="parallaxBackgroundHorizontal" type="number"
							value={this.state.parallaxBackgroundHorizontal || ''}
							onChange={(e) => this.handleChange(e, 'parallaxBackgroundHorizontal')}
						/>
					</div>
					<div className="parallaxBackgroundInputWrapper">
						<Label inputId="parallaxBackgroundVertical" text={this.props.labels['Vertical']}/>
						<input id="parallaxBackgroundVertical" type="number"
							value={this.state.parallaxBackgroundVertical || ''}
							onChange={(e) => this.handleChange(e, 'parallaxBackgroundVertical')}
						/>
					</div>
				</InputWrapper>

				<div className="buttonRow">
					<Button clickHandler={() => this.props.setDefaultExtraConf()} text={this.props.labels['Revert to default']} />
				</div>
			</Panel>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfPanel);
