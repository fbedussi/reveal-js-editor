import React from 'react';
import {connect} from 'react-redux';

import {getPreviewPanelOpen, getHtml, getConfiguration, getCustomCss, getCurrentTheme, getCustomThemesList} from '../selectors';

const mapStateToProps = (state) => ({
	open: getPreviewPanelOpen(state),
	configuration: getConfiguration(state),
	customCss: getCustomCss(state),
	currentTheme: getCurrentTheme(state),
	customThemesList: getCustomThemesList(state),
	html: getHtml(state)
});

class Preview extends React.Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.open || !this.props.html) {
			var message = {
				configuration: nextProps.configuration,
				customCss: nextProps.customCss,
				currentTheme: nextProps.currentTheme,
				customTheme: nextProps.customThemesList.includes(nextProps.currentTheme)
			};

			if (nextProps.html !== this.props.html) {
				message.html = nextProps.html;
			}

			// if (nextProps.configuration !== this.props.configuration) {
			// 	message.configuration = nextProps.configuration;
			// }

			this.ifr.contentWindow.postMessage(message, "*");
		}
	}

	render() {
		return (
			<section className="preview">
				<iframe ref={(f) => this.ifr = f} src="preview/preview.html" width="100%" height="100%" frameBorder="0" scrolling="no"/>
         </section >
      );
	}
};

export default connect(mapStateToProps)(Preview);
