import React from 'react';

import Controls from './Controls';
import Md from './Md';
import Html from './Html';
import Preview from './Preview';

const Workarea = () => <div className='workarea'>
				<Controls />
				<div className="mainWrapper">
					<section className="editor">
						<section className="content">
							<Md />
							<Html />
						</section>
					</section>
				</div>
				<Preview />
			</div>;
	
export default Workarea;
