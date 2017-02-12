import React from 'react';

const Label = ({inputId, text, children}) => <label htmlFor={inputId}>
										<span className='icon'>{children}</span>
										<span className='text'>{text}</span>
									</label>;

export default Label;
