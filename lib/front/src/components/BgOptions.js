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
	insert: (value, pattern) => dispatch(insert(value, pattern)),
});

class BgOptions extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.getBlankState();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getBlankState() {
		return {
			'background-color': '#000000',
			'background-image': ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open && nextProps.currentSettings) {
			var nextState = Object.assign({}, this.state, nextProps.currentSettings);

			this.setState(nextState);
		} else {
			this.setState(this.getBlankState());
		}
	}

	handleChange(event) {
		var input = event.target;
		var value = input.type === 'checkbox'? input.checked : input.value;

		var obj = {};
		obj[input.dataset.insert] = value;

		this.setState(Object.assign({}, this.state, obj));
	}

	handleSubmit() {
		Object.keys(this.state).forEach(key => {
			var stringToInsert = this.state[key]? key + '="' + this.state[key] + '"' : '';
        	var pattern = key + '="[^"]+"';

			this.props.insert(stringToInsert, pattern);
        })

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
						<input id='colorBg' type='color' data-insert='background-color'
							onChange={this.handleChange}
							value={this.state['background-color']}/>
					</div>

					<OpenImage
						handler={
							bgImage => {
								console.log('bgimage', bgImage);
								console.log(this);
								this.setState(Object.assign({}, this.state, bgImage))
							}
						}
					/>

					<div className="buttonRow">
						<button id="resetButton" onClick={this.reset.bind(this)}>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Cancel']}</span>
						</button>

						<button id="applyButton"
							onClick={this.handleSubmit}
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
