import React from 'react';
import { Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

function BasicMarker({ marker, onClick }) {
	return <Marker position={{ lat: marker.lat, lng: marker.lng }} onClick={onClick} />;
}

BasicMarker.propTypes = {
	marker: PropTypes.object,
	onClick: PropTypes.func,
};
export default BasicMarker;
