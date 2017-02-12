import React from 'react';
import { connect } from 'react-redux';
import OpenFile from './OpenFile';
import { closeBgSettingsPanel, insert, setBgImage, setBgVideo } from '../actions/actions';
import { getLabels, getInitialSlideBgSettings, getNewSlideBgSettings, getLeftPanelStatus } from '../selectors';
import Label from './Label';
import InputWrapper from './InputWrapper';
import Button from './Button';
import Panel from './Panel';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	open: getLeftPanelStatus(state),
	initial: getInitialSlideBgSettings(state),
	new: getNewSlideBgSettings(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeBgSettingsPanel()),
	insert: (stringsToInsert) => dispatch(insert(stringsToInsert)),
});

class BgPanel extends React.Component {
	constructor(props) {
		super(props);

		this.changedSettings = {};
		this.state = this.getBlankState();
	}

	getBlankState() {
		return {
			'background-color': '#000000',
			'background-image': '',
			'background-size': 'cover',
			'background-position': 'center center',
			'background-video': '',
			'background-video-loop': false,
			'background-video-muted': false,
			'background-iframe': ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.open) {
			return;
		}

		if (Object.keys(nextProps.new).length) {
			this.recordChange(nextProps.new);
			return
		}

		if (Boolean(nextProps.initial) && Object.keys(nextProps.initial).length) {
			var nextState = Object.assign({}, nextProps.initial);
			this.setState(nextState);
			return;
		}

		this.setState(this.getBlankState());
	}

	handleChange(event, key) {
		var input = event.target;
		var value = input.type === 'checkbox' ? input.checked : input.value;

		var obj = {};
		obj[key] = value;
		this.recordChange(obj);
	}

	recordChange(newSetting) {
		Object.assign(this.changedSettings, newSetting);
		this.setState(Object.assign({}, this.state, newSetting));
	}

	handleSubmit(e) {
		var stringsToInsert = Object.keys(this.changedSettings)
			.map(key => {
				// if (this.changedSettings[key] === '') {
				// 	return null;
				// }

				var insert = this.changedSettings[key] ? key + '="' + this.changedSettings[key] + '"' : '';
				var pattern = key + '="[^"]+"';

				return { insert, pattern };
			})
			//.filter(item => item)
			;

		this.props.insert(stringsToInsert);
		this.exit();
	}

	updateBgPos(e, axis) {
		var currentBgPos = this.state['background-position'].split(' ');
		var newBbPosBit = e.target.value;
		var newBgPos = currentBgPos;
		var updateIndex = (axis === 'x') ? 0 : 1;

		newBgPos[updateIndex] = newBbPosBit;
		Object.assign(this.changedSettings, { 'background-position': newBgPos.join(' ') });
	}

	exit() {
		this.changedSettings = {};
		this.props.closePanel();
	}

	render() {
		return (
			<Panel name='leftPanel bgOptionsPanel' closePanel={this.props.closePanel}>
				<InputWrapper name='colorWrapper'>
					<Label inputId='colorBg' text={this.props.labels['Background color']} />
					<input id='colorBg' type='color'
						onChange={(e) => this.handleChange(e, 'background-color')}
						value={this.state['background-color']} />
				</InputWrapper>

				<OpenFile
					name='imgBgWrapper'
					label={this.props.labels['Background image']}
					buttonText={this.props.labels['Select image']}
					finalAction={(path) => setBgImage(path)}
					fileType='img'
					handler={
						imgPath => {
							this.recordChange({ 'background-image': imgPath });
						}
					}
					value={this.state['background-image']}
				/>

				<InputWrapper name="bgSizeWrapper">
					<Label inputId="bgSize" text={this.props.labels['Background size']} />

					<input type="text"
						id="bgSize"
						placeholder="es: cover, contain, 3em, 10%, ecc."
						value={this.state['background-size']}
						onChange={(e) => this.handleChange(e, 'background-size')}
					/>
				</InputWrapper>

				<InputWrapper name="bgPositionXWrapper">
					<Label inputId="bgPositionX" text={this.props.labels['Background position x']} />

					<select id="bgPositionX" className="bgPositionPartial"
						onChange={(e) => this.updateBgPos(e, 'x')}
					>
						<option>center</option>
						<option>left</option>
						<option>right</option>
					</select>
				</InputWrapper>

				<InputWrapper name="bgPositionYWrapper">
					<Label inputId="bgPositionY" text={this.props.labels['Background position y']} />

					<select id="bgPositionY" className="bgPositionPartial"
						onChange={(e) => this.updateBgPos(e, 'y')}
					>
						<option>center</option>
						<option>top</option>
						<option>bottom</option>
					</select>
				</InputWrapper>

				<InputWrapper name="bgRepeatWrapper">
					<Label inputId="bgRepeat" text={this.props.labels['Background repeat']} />
					<select id="bgRepeat" onChange={(e) => this.handleChange(e, 'background-repeat')}>
						<option>no-repeat</option>
						<option>repeat</option>
						<option>repeat-x</option>
						<option>repeat-y</option>
						<option>inherit</option>
					</select>
				</InputWrapper>

				<OpenFile
					name='videoBgWrapper'
					label={this.props.labels['Background video']}
					buttonText={this.props.labels['Select video']}
					finalAction={(path) => setBgVideo(path)}
					fileType='video'
					handler={
						filePath => {
							this.recordChange({ 'background-video': filePath });
						}
					}
					value={this.state['background-video']}
				/>

				<InputWrapper name="videoBgLoopWrapper">
					<input id="videoBgLoop" type="checkbox"
						disabled={!this.changedSettings['background-video']}
						value={this.state['background-video-loop']}
						onChange={(e) => this.handleChange(e, 'background-video-loop')}
					/>
					<Label inputId="videoBgLoop" text={this.props.labels['Background video loop']} />
				</InputWrapper>

				<InputWrapper name="videoBgMutedWrapper">
					<input id="videoBgLoop" type="checkbox"
						disabled={!this.changedSettings['background-video']}
						value={this.state['background-video-muted']}
						onChange={(e) => this.handleChange(e, 'background-video-muted')}
					/>
					<Label inputId="videoBgLoop" text={this.props.labels['Background video muted']} />
				</InputWrapper>

				<InputWrapper name="iframeBgWrapper">
					<Label inputId="iframeBg" text={this.props.labels['Background web page']} />
					<input id="iframeBg" type="text" placeholder="http://www.example.com"
						onChange={(e) => this.handleChange(e, 'background-iframe')}
						value={this.state['background-iframe']}
					/>
					<Button data-input-id="iframeBg" text={this.props.labels['Reset']}
						clickHandler={() => this.recordChange({ 'background-iframe': '' })}
					/>
				</InputWrapper>


				<div className="buttonRow">
					<Button clickHandler={() => this.exit()} text={this.props.labels['Cancel']} />
					<Button clickHandler={(e) => this.handleSubmit(e)} text={this.props.labels['Save']} />
				</div>
			</Panel>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(BgPanel);
