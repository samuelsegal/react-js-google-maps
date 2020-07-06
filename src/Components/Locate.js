import React from 'react';
import { Icon } from 'semantic-ui-react';
const locate = ({ panTo }) => {
	return (
		<div className="locate-ctrl">
			<Icon
				name="compass"
				onClick={() => {
					navigator.geolocation.getCurrentPosition(({ coords }) => {
						panTo({
							lat: coords.latitude,
							lng: coords.longitude,
						});
					});
				}}
			/>
		</div>
	);
};

export default locate;
