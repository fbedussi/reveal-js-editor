import React from 'react';
import CloseBtn from './CloseBtn';

const Panel = ({name, closePanel, children}) =>	<div className={name}>
											<CloseBtn clickHandler={closePanel}/>
												<div className={'panelInner'}>
													{children}
												</div>
											</div>

export default Panel;
