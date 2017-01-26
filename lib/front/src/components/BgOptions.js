import React from 'react';
import { connect } from 'react-redux';
import CloseBtn from './CloseBtn';
import {closeBgSettingsPanel} from '../actions/actions';


const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeBgSettingsPanel())
});

var inputChanged = [];

class BgOptions extends React.Component {

	registerInputChange(e) {
		var id = e.nativeEvent.target.it;
		if (!inputCanged.includes(id)) {
			inputChanged.push(id);
			console.log(inputChanged);
		}
	}

	render() {
		return (
			<div className='bgOptionsPanel'>
				<CloseBtn clickHandler={this.props.closePanel}/>
				<form>
					<div className='inputWrapper colorWrapper'>
						<label htmlFor='colorBg'>
							<span className='icon'></span>
							<span className='text'>Background color</span>
						</label>
						<input id='colorBg' type='color' data-insert='background-color' onChange={this.registerInputChange}/>
					</div>

				</form>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(BgOptions);
