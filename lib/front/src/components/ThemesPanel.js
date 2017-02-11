import React from 'react';
import {connect} from 'react-redux';
import OpenFile from './OpenFile';
import {closeThemesPanel, setCustomCss} from '../actions/actions';
import {delCustomTheme, loadCustomTheme} from '../actions/fileActions';
import {getLabels, getThemesPanelStatus, getCustomThemes, getCustomCss} from '../selectors';
import Label from './Label';
import InputWrapper from './InputWrapper';
import Button from './Button';
import Panel from './Panel';

const mapStateToProps = (state) => ({
	labels: getLabels(state),
	customThemes: getCustomThemes(state),
	open: getThemesPanelStatus(state),
	customCss: getCustomCss(state)
});

const mapDispatchToProps = dispatch => ({
	closePanel: () => dispatch(closeThemesPanel()),
	delCustomTheme: (theme) => dispatch(delCustomTheme(theme)),
	loadCustomTheme: (theme) => dispatch(loadCustomTheme(theme)),
	setCustomCss: (css) => dispatch(setCustomCss(css))
});

class ThemesPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			customCss: this.props.customCss
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.open) {
			return;
		}

		if (nextProps.customCss !== this.state.customCss) {
			this.setState({customCss: nextProps.customCss});
		}
	}

	handleChange(e) {
		this.setState({customCss: e.target.value});
		this.props.setCustomCss(e.target.value);
	}

	render() {
		return (
			<Panel name='rightPanel themesPanel' closePanel={this.props.closePanel}>
				<Button
					clickHandler={() => this.props.loadCustomTheme(this.props.fileType, this.props.loadCustomTheme)}
					text={this.props.labels['Load a custom theme css file']}
				/>

				<p>{this.props.labels['Custom themes']}</p>
				<ul>
					{this.props.customThemes.map(theme => <li key={theme}><span>{theme}</span><Button text={this.props.labels['Delete']} clickHandler={() => this.props.delCustomTheme(theme)}></Button></li>)}
				</ul>
				<p>{this.props.labels['Custom CSS']}</p>
				<textarea value={this.state.customCss} onChange={(e) => this.handleChange(e)}></textarea>
			</Panel>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesPanel);
