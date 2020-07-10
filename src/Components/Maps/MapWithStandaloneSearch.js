import React, { Component } from 'react';
import { StandaloneSearchBox, GoogleMap, LoadScript } from '@react-google-maps/api';
import { GOOGLE_GEOCODE_API_KEY } from '../../Constants';

const mapContainerStyle = {
	position: 'relative',
	height: '400px',
	width: '100%',
};

const center = {
	lat: 38.685,
	lng: -115.234,
};

class MapWithStandaloneSearch extends Component {
	constructor(props) {
		super(props);

		this.autocomplete = null;

		this.onLoad = this.onLoad.bind(this);
		this.onPlaceChanged = this.onPlaceChanged.bind(this);
		this.googleAPIKey = GOOGLE_GEOCODE_API_KEY;
	}

	onLoad(autocomplete) {
		console.log('autocomplete: ', autocomplete);

		this.autocomplete = autocomplete;
	}

	onPlaceChanged() {
		if (this.autocomplete !== null) {
			console.log(this.autocomplete.getPlace());
		} else {
			console.log('Autocomplete is not loaded yet!');
		}
	}

	render() {
		return (
			<LoadScript googleMapsApiKey={this.googleAPIKey} libraries={['places']}>
				<GoogleMap id="searchbox-example" mapContainerStyle={mapContainerStyle} zoom={2.5} center={center}>
					<StandaloneSearchBox onLoad={this.onLoad} onPlacesChanged={this.onPlaceChanged}>
						<input
							type="text"
							placeholder="Customized your placeholder"
							style={{
								boxSizing: `border-box`,
								border: `1px solid transparent`,
								width: `240px`,
								height: `32px`,
								padding: `0 12px`,
								borderRadius: `3px`,
								boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
								fontSize: `14px`,
								outline: `none`,
								textOverflow: `ellipses`,
								position: 'absolute',
								left: '50%',
								marginLeft: '-120px',
							}}
						/>
					</StandaloneSearchBox>
				</GoogleMap>
			</LoadScript>
		);
	}
}

export default MapWithStandaloneSearch;
