import React from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import Menu from './Menu';
import Workarea from './Workarea';
import BgOptions from './BgOptions';
import { getCurrentFileName, getLeftPanelStatus, getPreviewPanelOpen, getCurrentTheme } from '../selectors';
import initReveal from '../utils/initReveal';

const mapStateToProps = (state) => ({
	currentFileName: getCurrentFileName(state),
	leftPanelOpen: getLeftPanelStatus(state),
	previewOpen: getPreviewPanelOpen(state),
	currentTheme: getCurrentTheme(state)
});

//TODO: manage configuration
var configuration = {
	controls: true,
	progress: true,
	slideNumber: false,
	history: false,
	keyboard: true,
	overview: true,
	center: true,
	touch: true,
	loop: false,
	rtl: false,
	shuffle: false,
	fragments: true,
	embedded: false,
	help: true,
	showNotes: false,
	autoSlide: 0,
	autoSlideStoppable: true,
	//autoSlideMethod: Reveal.navigateNext,
	mouseWheel: false,
	hideAddressBar: true,
	previewLinks: false,
	transition: 'none',
	transitionSpeed: 'default',
	backgroundTransition: 'default',
	viewDistance: 3,
	parallaxBackgroundImage: '',
	parallaxBackgroundSize: '',
	parallaxBackgroundHorizontal: null,
	parallaxBackgroundVertical: null
};

class App extends React.Component {
	render() {
		var classes = 'application';
		if (this.props.leftPanelOpen) classes += ' leftPanelOpen';
		if (this.props.previewOpen) classes += ' previewOn';

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
			initReveal(configuration);
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
				<BgOptions />
			</div>
		);
	}
};

export default connect(mapStateToProps)(App);

