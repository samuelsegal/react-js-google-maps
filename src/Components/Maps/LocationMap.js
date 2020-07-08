import React from 'react';
import midnightCommander from '../../Styles/midnightCommander';
import Logo from '../Logo';
import BaseMap from './BaseMap';

const mapOptions = {
	styles: midnightCommander,
	disableDefaultUI: true, //disable the controls
	zoomControl: true, //ad only controls we wanbt
};

function LocationMap() {
	return <BaseMap addSearch addLocater logo={<Logo />} options={mapOptions} customMarker="ShroomMarker" />;
}

export default LocationMap;
