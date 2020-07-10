import React from 'react';
import './Maps/MapHeaderStyle.css';
import { Search } from 'semantic-ui-react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

function PlaceAutoComplete({ panTo }) {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 32, lng: () => -81 },
			radius: 200,
		},
	});
	return ready ? (
		<div className="search">
			<Search
				onResultSelect={async (e, { result }) => {
					const { description } = result;
					const address = description;
					setValue(address, false);
					clearSuggestions();
					try {
						const results = await getGeocode({ address });
						const { lat, lng } = await getLatLng(results[0]);
						panTo({ lat, lng });
					} catch (error) {
						console.log('error searching places for autocomplete: ', error);
					}
				}}
				onSearchChange={(e) => {
					setValue(e.target.value);
				}}
				results={data}
				value={value}
			/>
		</div>
	) : (
		<div></div>
	);
}

export default PlaceAutoComplete;
