import React from 'react';
import { connect } from 'react-redux';

import { getSaveProjectRequest, getSaveProjectSuccess, getSaveProjectError, getOpenFIleError, getLabels } from '../selectors';

const mapStateToProps = (state) => ({
	saveProjectRequest: getSaveProjectRequest(state),
	saveProjectSuccess: getSaveProjectSuccess(state),
	saveProjectError: getSaveProjectError(state),
	openFileError: getOpenFIleError(state),
	labels: getLabels(state)
});

const Notification = ({saveProjectRequest, saveProjectSuccess, saveProjectError, openFileError, labels}) =>
	<div className="notificationArea">
		<span className={saveProjectRequest ? "notification notification-warning show" : "hide"}>{labels["Saving project"]}</span>
		<span className={saveProjectSuccess ? "notification notification-success show" : "hide"}>{labels["Project saved"]}</span>
		<span className={saveProjectError ? "notification notification-error show" : "hide"}>{labels["Saving project error"]}</span>
		<span className={openFileError ? "notification notification-error show" : "hide"}>{labels["Open file error"]}</span>
	</div>;

export default connect(mapStateToProps)(Notification);
