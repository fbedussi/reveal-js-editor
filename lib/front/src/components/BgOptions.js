import React from 'react';
import { connect } from 'react-redux';
import CloseBtn from './CloseBtn';
import OpenImage from './OpenImage';
import {closeBgSettingsPanel, insert} from '../actions/actions';
import {getLabels, getInitialSlideBgSettings, getLeftPanelStatus} from '../selectors';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	open: getLeftPanelStatus(state),
	currentSettings: getInitialSlideBgSettings(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeBgSettingsPanel()),
	insert: (stringsToInsert) => dispatch(insert(stringsToInsert)),
});

var changedSettings = {};

class BgOptions extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.getBlankState();
	}

	getBlankState() {
		return {
			'background-color': '#000000',
			'background-image': '',
			'background-size': 'cover',
			'background-position': 'center center'
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open && Object.keys(nextProps.currentSettings).length) {
			var nextState = Object.assign({}, nextProps.currentSettings);

			this.setState(nextState);
		} else {
			this.setState(this.getBlankState());
		}
	}

	handleChange(event, key) {
		var input = event.target;
		var value = input.type === 'checkbox'? input.checked : input.value;

		var obj = {};
		obj[key] = value;
		Object.assign(changedSettings, obj);
		this.setState(Object.assign({}, this.state, obj));
	}

	handleSubmit(e) {
		// var stringsToInsert = Object.keys(this.state)
		// 	.map(key => {
		// 		if (this.state[key] === '') {
		// 			return null;
		// 		}

		// 		var insert = this.state[key]? key + '="' + this.state[key] + '"' : '';
		// 		var pattern = key + '="[^"]+"';

		// 		return {insert, pattern};
		// 	})
		// 	.filter(item => item)

		var stringsToInsert = Object.keys(changedSettings)
			.map(key => {
				if (changedSettings[key] === '') {
					return null;
				}

				var insert = changedSettings[key]? key + '="' + changedSettings[key] + '"' : '';
				var pattern = key + '="[^"]+"';

				return {insert, pattern};
			})
			.filter(item => item)

		this.props.insert(stringsToInsert);

		this.props.closePanel();
	}

	reset() {
		this.props.closePanel();
	}

	updateBgPos(e, axis) {
		var currentBgPos = this.state['background-position'].split(' ');
		var newBbPosBit = e.target.value;
		var newBgPos = currentBgPos;
		var updateIndex = (axis === 'x')? 0 : 1;

		newBgPos[updateIndex] = newBbPosBit;
		Object.assign(changedSettings, {'background-position': newBgPos.join(' ')});
	}

	render() {
		return (
			<div className='bgOptionsPanel'>
				<CloseBtn clickHandler={this.props.closePanel}/>
				<div
					className="bgOptionsForm">
					<div className='inputWrapper colorWrapper'>
						<label htmlFor='colorBg'>
							<span className='icon'></span>
							<span className='text'>{this.props.labels['Background color']}</span>
						</label>
						<input id='colorBg' type='color'
							onChange={(e) => this.handleChange(e, 'background-color')}
							value={this.state['background-color']}/>
					</div>

					<OpenImage
						handler={
							imgPath => {
								this.setState(Object.assign({}, this.state, {'background-image': imgPath}))
							}
						}
						value={this.state['background-image']}
					/>

					<div className="inputWrapper bgSizeWrapper">
						<label htmlFor="bgSize">
							<span className="icon"></span>
							<span className="text">{this.props.labels['Background size']}</span>

							<input type="text"
								id="bgSize"
								placeholder="es: cover, contain, 3em, 10%, ecc."
								value={this.state['background-size']}
								onChange={(e) => this.handleChange(e, 'background-size')}
							/>
						</label>
					</div>

					<div className="inputWrapper bgPositionXWrapper">
						<label htmlFor="bgPositionX"><span className="icon"></span><span className="text">{this.props.labels['Background position x']}</span></label>
						<select id="bgPositionX" className="bgPositionPartial"
							onChange={(e) => this.updateBgPos(e, 'x')}
						>
							<option>center</option>
							<option>left</option>
							<option>right</option>
						</select>
					</div>

					<div className="inputWrapper bgPositionYWrapper">
						<label htmlFor="bgPositionY"><span className="icon"></span><span className="text">{this.props.labels['Background position y']}</span></label>
						<select id="bgPositionY" className="bgPositionPartial">
							<option>center</option>
							<option>top</option>
							<option>bottom</option>
						</select>
					</div>
					{/*<input id="bgPosition" type="text" hidden="true"
						value={this.state['background-position']}
						onChange={(e) => this.handleChange(e, 'background-position')}
					/>*/}

					<div className="buttonRow">
						<button id="resetButton" onClick={(e) => this.reset(e)}>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Cancel']}</span>
						</button>

						<button id="applyButton"
							onClick={(e) => this.handleSubmit(e)}
						>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Save']}</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(BgOptions);
