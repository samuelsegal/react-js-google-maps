import React, { useRef, useCallback, memo } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

import { GOOGLE_GEOCODE_API_KEY } from '../../Constants';
import PlaceAutoComplete from '../PlaceAutoComplete';
import Locate from '../Locate';
import mapStyles from '../../Styles/mapStyles';
import './MapHeaderStyle.css';
import Logo from '../Logo';
const libraries = ['places'];
function BaseMap({
	addSearch,
	addLocater,
	logo,
	options,
	containerStyle,
	googleAPIKey,
	zoom,
	center,
	customComponents,
}) {
	const onMapClick = useCallback((e) => {
		console.log('LAT', e.latLng.lat);
		var marker = new window.google.maps.Marker({
			position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
			map: mapRef.current,
			click: () => console.log('wtf'),
		});
		var yourContent = new window.google.maps.InfoWindow({
			content: 'blah blah',
		});

		console.log(marker);
		marker.setMap(mapRef.current);
		window.google.maps.event.addListener(marker, 'click', function () {
			yourContent.open(mapRef.current, marker);
		});
		return marker;
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
		<LoadScript googleMapsApiKey={googleAPIKey} libraries={libraries}>
			{logo}
			{addSearch ? <PlaceAutoComplete panTo={panTo} /> : ''}
			{addLocater ? <Locate panTo={panTo} /> : ''}
			{customComponents.map((component) => component)}

			<GoogleMap
				className="MapHeadStyle"
				mapContainerStyle={containerStyle}
				center={center}
				zoom={zoom}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{/* Child components, such as markers, info windows, etc. */}

				<></>
			</GoogleMap>
		</LoadScript>
	);
}

const defaultContainerStyle = {
	position: 'absolute',
	width: '100%',
	height: '100%',
};
const defaultOptions = {
	styles: mapStyles,
	disableDefaultUI: true, //disable the controls
	zoomControl: true, //ad only controls we wanbt
};
const center = {
	lat: 32,
	lng: -81,
};

BaseMap.defaultProps = {
	zoom: 10,
	options: defaultOptions,
	center: center,
	containerStyle: defaultContainerStyle,
	googleAPIKey: GOOGLE_GEOCODE_API_KEY,
	logo: '',
	customComponents: [],
	customMarker: 'BasicMarker',
};

BaseMap.propTypes = {
	addSearch: PropTypes.bool,
	addLocater: PropTypes.bool,
	logo: PropTypes.objectOf(Logo),
	options: PropTypes.object,
	containerStyle: PropTypes.object,
	googleAPIKey: PropTypes.string,
	zoom: PropTypes.number,
	center: PropTypes.object,
	customComponents: PropTypes.any,
	customMarker: PropTypes.string,
};
export default memo(BaseMap);
