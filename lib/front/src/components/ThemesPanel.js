import React from 'react';
import {connect} from 'react-redux';
import OpenFile from './OpenFile';
import {closeThemesPanel} from '../actions/actions';
import {delCustomTheme, loadCustomTheme} from '../actions/fileActions';
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
	delCustomTheme: (theme) => dispatch(delCustomTheme(theme)),
	loadCustomTheme: (theme) => dispatch(loadCustomTheme(theme))
});

class ThemesPanel extends React.Component {
	render() {
		return (
			<Panel name='rightPanel themesPanel' closePanel={this.props.closePanel}>
				<Button
					clickHandler={() => this.props.loadCustomTheme(this.props.fileType, this.props.loadCustomTheme)}
					text={this.props.labels['Load a custom theme css file']}
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
