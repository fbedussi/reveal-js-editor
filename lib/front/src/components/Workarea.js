import React from 'react';
import { connect } from 'react-redux';

import Controls from './Controls';
import Md from './Md';
import Html from './Html';
import Preview from './Preview';

const mapStateToProps = (state) =>({});

class Workarea extends React.Component {
	render() {
		return (
			<div className='workarea'>
				<Controls />
				<div className="mainWrapper">
					<section className="editor">
						<section className="content">
							<Md />
							<Html />
						</section>
					</section>
					<Preview />
				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps)(Workarea);

