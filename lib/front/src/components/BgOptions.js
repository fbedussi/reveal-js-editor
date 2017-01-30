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
	constructor(props) {
		super(props);

		this.state = this.getBlankState();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetBgImage = this.resetBgImage.bind(this);
	}

	getBlankState() {
		return {
			'background-color': '#000000',
			'background-image': ''
		};
	}

	resetBgImage(event) {
		event.preventDefault();
		this.setState(Object.assign({}, this.state, {
			'background-image': ''
		}))
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
							value={this.state['background-image']}
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
