import React from 'react';
import ShadowDOM from 'react-shadow';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import {getHtml, getCustomCss, getCurrentTheme, getUiConf, getPreviewPanelOpen, getConfiguration} from '../selectors';

import initReveal from '../utils/initReveal';

const mapStateToProps = (state) => ({
	html: getHtml(state),
	customCss: getCustomCss(state),
	configuration: getConfiguration(state),
	currentTheme: getCurrentTheme(state),
	previewOpen: getPreviewPanelOpen(state),
	uiConf: getUiConf(state)
});

class Preview extends React.Component {

	render() {
		var styles = [];
		var themeFolder = this.props.uiConf.customThemes.includes(this.props.currentTheme) ? '../../lib/customThemes' : '../../node_modules/reveal.js/css/theme';
		var printCss = window.location.search.match(/print-pdf/gi) ? '../../node_modules/reveal.js/css/print/pdf.css' : '../../node_modules/reveal.js/css/print/paper.css';

		styles.push('../../node_modules/reveal.js/css/reveal.css');

		styles.push('../../node_modules/reveal.js/lib/css/zenburn.css');

		if (themeFolder && this.props.currentTheme) {
			styles.push(`${themeFolder}/${this.props.currentTheme}.css`);
		}

		styles.push(printCss);

		var js = ['../../node_modules/reveal.js/lib/js/head.min.js', '../../node_modules/reveal.js/js/reveal.js']

		if (typeof Reveal !== 'undefined') {
			initReveal(this.props.configuration);
		}

		return (
			<iframe>
				<html>
				<head>

				</head>
				<section className="preview reveal">
					<div >
						<style type="text/css">{this.props.customCss}</style>
						<div className="slides" dangerouslySetInnerHTML={{ __html: this.props.html }} />
					</div>
				</section>
				</html>
			</iframe>
		);
	}
};

export default connect(mapStateToProps)(Preview);
