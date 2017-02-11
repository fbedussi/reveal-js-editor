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
		var customCss = [{type: "text/css", cssText: ''}];
		if (this.props.leftPanelOpen) classes += ' leftPanelOpen';
		if (this.props.rightPanelOpen) classes += ' rightPanelOpen';
		if (this.props.confPanelOpen) classes += ' confPanelOpen';
		if (this.props.themesPanelOpen) classes += ' themesPanelOpen';
		if (!this.props.uiConf.showButtonText) classes += ' hideButtonText';
		if (this.props.previewOpen) {
			classes += ' previewOn';
			customCss[0].cssText = this.props.customCss;
		}

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
			var themeFolder = this.props.uiConf.customThemes.includes(this.props.currentTheme)? '../../lib/customThemes' : '../../node_modules/reveal.js/css/theme';
			var printCss = window.location.search.match(/print-pdf/gi) ? '../../node_modules/reveal.js/css/print/pdf.css' : '../../node_modules/reveal.js/css/print/paper.css';

			styles.push({
				rel: 'stylesheet',
				href: '../../node_modules/reveal.js/css/reveal.css',
				type: 'text/css',
				id: 'revealCss'
			});

			styles.push({
				rel: 'stylesheet',
				href: '../../node_modules/reveal.js/lib/css/zenburn.css',
				type: 'text/css',
				id: 'zenBurnCss'
			})

			styles.push({
				rel: 'stylesheet',
				href: `${themeFolder}/${this.props.currentTheme}.css`,
				type: 'text/css',
				id: 'themeCss'
			})

			styles.push({
				rel: 'stylesheet',
				href: printCss,
				type: 'text/css',
				id: 'printCss'
			})
		}

		return (
			<div className={classes}>
				<Helmet
					title={`REMEDI - ${this.props.currentFileName}`}
					link={styles}
					style={customCss}
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

