import React from 'react';

const Button = ({clickHandler, text, children}) => <button onClick={clickHandler}>
												<span className="icon">{children}</span>
												<span className="text button-text">{text}</span>
											</button>;

export default Button;
