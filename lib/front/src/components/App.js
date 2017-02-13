import React from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import Menu from './Menu';
import Workarea from './Workarea';
import BgPanel from './BgPanel';
import ConfPanel from './ConfPanel';
import ThemesPanel from './ThemesPanel';
import {getCurrentFileName, getLeftPanelStatus, getPreviewPanelOpen, getCurrentTheme, getCustomCss,
	getConfiguration, getRightPanelStatus, getConfPanelStatus, getThemesPanelStatus, getUiConf} from '../selectors';
import initReveal from '../utils/initReveal';

const mapStateToProps = (state) => ({
	currentFileName: getCurrentFileName(state),
	leftPanelOpen: getLeftPanelStatus(state),
	previewOpen: getPreviewPanelOpen(state),
	currentTheme: getCurrentTheme(state),
	configuration: getConfiguration(state),
	rightPanelOpen: getRightPanelStatus(state),
	confPanelOpen: getConfPanelStatus(state),
	themesPanelOpen: getThemesPanelStatus(state),
	uiConf: getUiConf(state),
	customCss: getCustomCss(state)
});

class App extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.uiConf.labels;
	}

	render() {
		if (!this.props.uiConf.labels) {
			return null;
		}

		var classes = 'application';

		if (this.props.leftPanelOpen) classes += ' leftPanelOpen';
		if (this.props.rightPanelOpen) classes += ' rightPanelOpen';
		if (this.props.confPanelOpen) classes += ' confPanelOpen';
		if (this.props.themesPanelOpen) classes += ' themesPanelOpen';
		if (!this.props.uiConf.showButtonText) classes += ' hideButtonText';
		if (this.props.previewOpen) classes += ' previewOn';

		var styles = [{
			rel: 'stylesheet',
			href: 'style.css',
			type: 'text/css'
		}, {
			rel: 'stylesheet',
			href: `skins/${this.props.uiConf.currentColorScheme}.css`,
			type: 'text/css'
		}];

		if (this.props.previewOpen) {
			initReveal(this.props.configuration);
		}

		return (
			<div className={classes}>
				<Helmet
					title={`REMEDI${this.props.currentFileName.length? ' - ' + this.props.currentFileName : ''}`}
					link={styles}
				/>
				<Menu />
				<Workarea />
				<BgPanel />
				<ConfPanel />
				<ThemesPanel />
			</div>
		);
	}
};

export default connect(mapStateToProps)(App);

