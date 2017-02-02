import React from 'react';
import { connect } from 'react-redux';
import CloseBtn from './CloseBtn';
import OpenImage from './OpenImage';
import {closeBgSettingsPanel, insert} from '../actions/actions';
import {getLabels, getCurrentSlideBgSettings, getLeftPanelStatus} from '../selectors';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	open: getLeftPanelStatus(state),
	currentSettings: getCurrentSlideBgSettings(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeBgSettingsPanel()),
	insert: (stringsToInsert) => dispatch(insert(stringsToInsert)),
});

class BgOptions extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.getBlankState();
	}

	getBlankState() {
		return {
			'background-color': '',
			'background-image': ''
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

		this.setState(Object.assign({}, this.state, obj));
	}

	handleSubmit(e) {
		var stringsToInsert = Object.keys(this.state).map(key => {
			var insert = this.state[key]? key + '="' + this.state[key] + '"' : '';
        	var pattern = key + '="[^"]+"';

			return {insert, pattern};
        })
		this.props.insert(stringsToInsert);

		this.props.closePanel();
	}

	reset() {
		this.props.closePanel();
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
