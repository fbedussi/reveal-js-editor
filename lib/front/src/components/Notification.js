import React from 'react';
import { connect } from 'react-redux';

import { getSaveProjectRequest, getSaveProjectSuccess, getSaveProjectError, getLabels } from '../selectors';

const mapStateToProps = (state) => ({
	saveProjectRequest: getSaveProjectRequest(state),
	saveProjectSuccess: getSaveProjectSuccess(state),
	saveProjectError: getSaveProjectError(state),
	labels: getLabels(state)
});

const Notification = ({saveProjectRequest, saveProjectSuccess, saveProjectError}) =>
	<div className="notificationArea">
		<span className={saveProjectRequest ? "notification notification-warning show" : "hide"}>saving project</span>
		<span className={saveProjectSuccess ? "notification notification-success show" : "hide"}>project saved</span>
		<span className={saveProjectError ? "notification notification-error show" : "hide"}>saving project error</span>
	</div>;

export default connect(mapStateToProps)(Notification);
