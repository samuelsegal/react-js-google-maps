import React from 'react';
import { Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
const ShroomMarker = (props) => {
	const { marker, onClick } = props;
	return (
		<Marker
			position={{ lat: marker.lat, lng: marker.lng }}
			icon={{
				url: '/mushroom.svg',
				scaledSize: new window.google.maps.Size(30, 30),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(15, 15),
			}}
			onClick={onClick}
		/>
	);
};
ShroomMarker.propTypes = {
	marker: PropTypes.object,
	onClick: PropTypes.func,
};
export default ShroomMarker;
