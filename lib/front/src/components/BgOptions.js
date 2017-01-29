import React from 'react';
import { connect } from 'react-redux';
import CloseBtn from './CloseBtn';
import {closeBgSettingsPanel, insert, setBgImage} from '../actions/actions';
import {getLabels, getCurrentSlideBgSettings, getLeftPanelStatus} from '../selectors';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	open: getLeftPanelStatus(state),
	currentSettings: getCurrentSlideBgSettings(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeBgSettingsPanel()),
	insert: (value, pattern) => dispatch(insert(value, pattern)),
	setBgImage: () => dispatch(setBgImage())
});

class BgOptions extends React.Component {
	getBlankState() {
		return {
			'background-color': {
				value: '#000000'
			},
			'background-image': {
				value: ''
			}
		};
	}

	resetBgImage(event) {
		event.preventDefault();
		this.setState(Object.assign({}, this.state, {
			'background-image': {
				value: ''
			}
		}))
	}

	constructor(props) {
		super(props);

		this.state = this.getBlankState();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetBgImage = this.resetBgImage.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open && nextProps.currentSettings) {
			var nextState = {};
			nextProps.currentSettings.forEach(setting => {
				nextState[setting.key] ={
					value: setting.value
				};
			});
			this.setState(nextState);
		} else {
			this.setState(this.getBlankState());
		}
	}

	handleChange(event) {
		var input = event.target;
		var value = input.type === 'checkbox'? input.checked : input.value;
		var stringToInsert = input.value? input.dataset.insert + '="' +value + '"' : '';
        var pattern = input.dataset.insert + '="[^"]+"';
		var obj = {};
		obj[input.dataset.insert] = {
			value,
			pattern,
			stringToInsert
		}
		this.setState(Object.assign({}, this.state, obj));
	}

	handleSubmit(event) {
		event.preventDefault();

		Object.keys(this.state).forEach(key => {
			this.props.insert(this.state[key].stringToInsert, this.state[key].pattern);
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
				<form
					onSubmit={this.handleSubmit}
					className="bgOptionsForm">
					<div className='inputWrapper colorWrapper'>
						<label htmlFor='colorBg'>
							<span className='icon'></span>
							<span className='text'>{this.props.labels['Background color']}</span>
						</label>
						<input id='colorBg' type='color' data-insert='background-color'
							onChange={this.handleChange}
							value={this.state['background-color'].value}/>
					</div>

					<div className="inputWrapper imageBgWrapper">
						<label htmlFor="imageBg">
							<span className="icon"></span>
							<span className="text">{this.props.labels['Background image']}</span>
						</label>

						<button id="imageBgButton"
							onClick={this.props.setBgImage}
						>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Select image']}</span>
						</button>

						<input id="imageBg" type="text" data-insert="background-image"
							placeholder={this.props.labels['File path']}
							value={this.state['background-image'].value}
							onChange={this.handleChange}/>
						<button className="resetInput" data-input-id="imageBg"
							onClick={this.resetBgImage}
						>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Reset']}</span>
						</button>
					</div>

					<div className="buttonRow">
						<button id="resetButton" onClick={this.reset.bind(this)}>
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Cancel']}</span>
						</button>

						<button id="applyButton" type="submit">
							<span className="icon"></span>
							<span className="text button-text">{this.props.labels['Save']}</span>
						</button>
					</div>
				</form>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(BgOptions);
