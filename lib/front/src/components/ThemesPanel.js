import React from 'react';
import {connect} from 'react-redux';
import OpenFile from './OpenFile';
import {closeThemesPanel} from '../actions/actions';
import {delCustomTheme} from '../actions/fileActions';
import {getLabels, getThemesPanelStatus, getCustomThemes} from '../selectors';
import Label from './Label';
import InputWrapper from './InputWrapper';
import Button from './Button';
import Panel from './Panel';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	customThemes: getCustomThemes(state),
	open: getThemesPanelStatus(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeThemesPanel()),
	delCustomTheme: (theme) => dispatch(delCustomTheme(theme))
});

class ThemesPanel extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = this.props.conf;
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (!nextProps.open) {
	// 		return;
	// 	}

	// 	this.setState(nextProps.conf);
	// }

	// handleChange(event, key) {
	// 	var input = event.target;
	// 	var value = input.type === 'checkbox' ? input.checked : input.value;

	// 	var obj = {};
	// 	obj[key] = value;
	// 	this.recordChange(obj);
	// }

	// recordChange(newSetting) {
	// 	this.setState(Object.assign({}, this.state, newSetting));
	// 	this.props.setConfiguration(newSetting);
	// }

	render() {
		return (
			<Panel name='rightPanel themesPanel' closePanel={this.props.closePanel}>
				<OpenFile
					name='customThemesWrapper'
					label={this.props.labels['Custom theme css']}
					buttonText={this.props.labels['Select file']}
					//finalAction={(path) => setConfiguration({parallaxBackgroundImage: path})}
					fileType='css'
				/>
				<p>Custom themes</p>
				<ul>
					{this.props.customThemes.map(theme => <li key={theme}><span>{theme}</span><Button text="delete" clickHandler={() => this.props.delCustomTheme(theme)}></Button></li>)}
				</ul>
			</Panel>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesPanel);
