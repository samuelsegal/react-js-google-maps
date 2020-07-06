import React, { useState, useRef, useCallback, memo } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import mapStyles from '../Styles/mapStyles';
import './MapHeaderStyle.css';
import { GOOGLE_GEOCODE_API_KEY } from '../Constants';
import PlaceAutoComplete from './PlaceAutoComplete';
import Locate from './Locate';

const containerStyle = {
	position: 'absolute',
	width: '100%',
	height: '100%',
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true, //disable the controls
	zoomControl: true, //ad only controls we wanbt
};
const center = {
	lat: 32,
	lng: -81,
};

const libraries = ['places'];
function LocationMap() {
	const [markers, setMarkers] = useState([]);
	const [selected, setSelected] = useState(null);
	const onMapClick = useCallback((event) => {
		setMarkers((current) => [...current, { lat: event.latLng.lat(), lng: event.latLng.lng(), time: new Date() }]);
	}, []);
	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);
	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);
	return (
		<LoadScript googleMapsApiKey={GOOGLE_GEOCODE_API_KEY} libraries={libraries}>
			<h3>
				Gigs{' '}
				<span role="img" aria-label="tent">
					🐸
				</span>
			</h3>
			<PlaceAutoComplete panTo={panTo} />
			<Locate panTo={panTo} />
			<GoogleMap
				className="MapHeadStyle"
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{
					/* Child components, such as markers, info windows, etc. */
					markers.map((marker) => (
						<Marker
							key={marker.time.toISOString()}
							position={{ lat: marker.lat, lng: marker.lng }}
							icon={{
								url: '/frog.png',
								scaledSize: new window.google.maps.Size(30, 30),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(15, 15),
							}}
							onClick={() => {
								setSelected(marker);
							}}
						/>
					))
				}

				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseCLick={() => {
							setSelected(null);
						}}
					>
						<div>
							<h2>Mark a gig!</h2>
							<p>Arriving {formatRelative(selected.time, new Date())} </p>
						</div>
					</InfoWindow>
				) : (
					''
				)}

				<></>
			</GoogleMap>
		</LoadScript>
	);
}

export default memo(LocationMap);
