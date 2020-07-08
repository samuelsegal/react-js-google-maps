import React, { useState, useRef, useCallback, memo } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import PropTypes from 'prop-types';

import { GOOGLE_GEOCODE_API_KEY } from '../../Constants';
import PlaceAutoComplete from '../PlaceAutoComplete';
import Locate from '../Locate';
import mapStyles from '../../Styles/mapStyles';
import './MapHeaderStyle.css';
import ShroomMarker from '../Markers/ShroomMarker';
import BasicMarker from '../Markers/BasicMarker';
import _ from 'lodash';
import BasicWindow from '../InfoWindows/BasicWindow';
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
	customMarker,
}) {
	const [markers, setMarkers] = useState([]);
	const [selected, setSelected] = useState(null);
	const onMarkerClick = useCallback((e) => {
		return console.log(e);
	});
	const onMapClick = useCallback((event) => {
		console.log(event);
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
				{
					/* Child components, such as markers, info windows, etc. */
					markers.map((marker) => {
						/**
						 * TODO: Look into more dynamic solution for providing
						 * self defined markers that can use setSelected.
						 * Also currently all the markers are rendering for
						 * every click. THis is no bueno
						 */
						const key = _.random(2, 3, true);
						console.log(marker);
						switch (customMarker) {
							case 'ShroomMarker':
								return <ShroomMarker key={key} marker={marker} onClick={() => setSelected(marker)} />;
							case 'BasicMarker':
								return <BasicMarker key={key} marker={marker} onClick={() => setSelected(marker)} />;
							default:
								return <BasicMarker key={key} marker={marker} onClick={() => setSelected(marker)} />;
						}
					})
				}

				{selected ? (
					//TODO: Need to be able to add custom infoWindows.
					<BasicWindow
						key={_.random()}
						position={{ lat: selected.lat, lng: selected.lng }}
						onClick={() => setSelected(null)}
						onCloseClick={() => setSelected(null)}
					>
						<div>
							<h2>Mark a gig!</h2>
							<p>Arriving {formatRelative(selected.time, new Date())} </p>
						</div>
					</BasicWindow>
				) : (
					''
				)}

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
