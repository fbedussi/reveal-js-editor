import React from 'react';

import { ScrollSync } from 'react-scroll-sync';

import Controls from './Controls';
import Md from './Md';
import Html from './Html';
import Preview from './Preview';

const Workarea = () => <div className='workarea'>
	<Controls />
	<div className="mainWrapper">
		<section className="editor">
			<ScrollSync>
				<section className="content">
					<Md />
					<Html />
				</section>
			</ScrollSync>
		</section>
	</div>
	<Preview />
</div>;

export default Workarea;
