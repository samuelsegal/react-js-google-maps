import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
/**
 * Probabky it is unnecessary to wrap the info window, but it is donw anyway
 * @param {*} param0
 */
function BasicWindow({ onClick, onCloseClick, position, children }) {
	console.log(onCloseClick);
	return (
		<InfoWindow position={position} onCloseClick={onCloseClick} onClick={onClick}>
			{children}
		</InfoWindow>
	);
}
BasicWindow.defaultProps = {
	children: <div>Empty Window: provide some html as child objects for Window</div>,
};
BasicWindow.propTypes = {
	onClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	position: PropTypes.object.isRequired,
	children: PropTypes.any,
};
export default BasicWindow;
