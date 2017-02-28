import React from 'react';
import {connect} from 'react-redux';

import {getPreviewPanelOpen, getPreviewWin, getHtml, getConfiguration, getCustomCss, getCurrentTheme, getCustomThemesList, isCustomTheme, getCustomThemePath} from '../selectors';

const mapStateToProps = (state) => ({
	panelOpen: getPreviewPanelOpen(state),
	previewWin: getPreviewWin(state),
	configuration: getConfiguration(state),
	customCss: getCustomCss(state),
	isCustomTheme: isCustomTheme(state),
	customThemePath: getCustomThemePath(state),
	currentTheme: getCurrentTheme(state),
	customThemesList: getCustomThemesList(state),
	html: getHtml(state)
});

var previewWin;

class Preview extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.panelOpen) {
			var message = {
				html: nextProps.html,
				configuration: nextProps.configuration,
				customCss: nextProps.customCss,
				currentTheme: nextProps.currentTheme,
				customTheme: nextProps.isCustomTheme,
				customThemePath: nextProps.customThemePath
			};

			this.ifr.contentWindow.postMessage(message, "*");
		}

		// if (nextProps.previewWin) {
		// 	var message = {
		// 		html: nextProps.html,
		// 		configuration: nextProps.configuration,
		// 		customCss: nextProps.customCss,
		// 		currentTheme: nextProps.currentTheme,
		// 		customTheme: nextProps.customThemesList.includes(nextProps.currentTheme)
		// 	};
		// 	window.addEventListener("message", (event) => {
		// 		previewWin.postMessage(message, "*");
		// 	});
		// 	previewWin = window.open('preview/preview.html');
		// }
	}

	//After the initial rendering updates are managed via messages
	shouldComponentUpdate(nextProps) {
		return false;
	}

	//Trigger a click on the iframe when is ready
	componentDidMount() {
		window.addEventListener("message", (event) => {
			this.ifr.focus();
		});
	}

	render() {
		return (
			<section className="preview">
				<iframe ref={(f) => this.ifr = f} src="preview/preview.html" width="100%" height="100%" frameBorder="0" scrolling="no"/>
         	</section>
      );
	}
};

export default connect(mapStateToProps)(Preview);
