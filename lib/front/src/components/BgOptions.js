import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

class BgOptions extends React.Component {
	render() {
		return (
			<div className='bgOptionsPanel'>
				<CloseBtn onClick='this.props.closePanel'/>
				<form>


				</form>
			</div>
		);
	}
};

export default connect(mapStateToProps)(mapDispatchToProps)(BgOptions);
