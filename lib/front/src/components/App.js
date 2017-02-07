import React from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import Menu from './Menu';
import Workarea from './Workarea';
import BgPanel from './BgPanel';
import ConfPanel from './ConfPanel';
import {getCurrentFileName, getLeftPanelStatus, getPreviewPanelOpen, getCurrentTheme,
	getConfiguration, getRightPanelStatus} from '../selectors';
import initReveal from '../utils/initReveal';

const mapStateToProps = (state) => ({
	currentFileName: getCurrentFileName(state),
	leftPanelOpen: getLeftPanelStatus(state),
	previewOpen: getPreviewPanelOpen(state),
	currentTheme: getCurrentTheme(state),
	configuration: getConfiguration(state),
	confPanelOpen: getRightPanelStatus(state)
});

class App extends React.Component {
	render() {
		var classes = 'application';
		if (this.props.leftPanelOpen) classes += ' leftPanelOpen';
		if (this.props.previewOpen) classes += ' previewOn';
		if (this.props.confPanelOpen) classes += ' rightPanelOpen';

		var styles = [{
			rel: 'stylesheet',
			href: 'style.css',
			type: 'text/css'
		}, {
			rel: 'stylesheet',
			href: 'skins/dark.css',
			type: 'text/css'
		}];

		if (this.props.previewOpen) {
			initReveal(this.props.configuration);
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
				href: `../../node_modules/reveal.js/css/theme/${this.props.currentTheme}.css`,
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
				/>
				<Menu />
				<Workarea />
				<BgPanel />
				<ConfPanel />
			</div>
		);
	}
};

export default connect(mapStateToProps)(App);

