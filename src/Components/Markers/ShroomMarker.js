import React from 'react';
import { Marker } from '@react-google-maps/api';

function ShroomMarker({ marker, setSelected }) {
	return (
		<Marker
			key={marker.time.toISOString()}
			position={{ lat: marker.lat, lng: marker.lng }}
			icon={{
				url: '/mushroom.svg',
				scaledSize: new window.google.maps.Size(30, 30),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(15, 15),
			}}
			onClick={() => setSelected}
		/>
	);
}

export default ShroomMarker;
