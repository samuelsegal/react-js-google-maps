import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import BaseMap from './BaseMap';
import { DrawingManager } from '@react-google-maps/api';
import { Slider } from 'react-semantic-ui-range';
import { Input, Label } from 'semantic-ui-react';

const MapWithDrawingManager = (props) => {
	const onLoad = useCallback((drawingManager) => {
		console.log('DRAWINGMANAGER', drawingManager);
	}, []);
	const onCircleComplete = useCallback((circle) => {
		console.log('circle: ', circle);
	}, []);
	const [value, setValue] = useState(5);
	const settings = {
		start: 2,
		min: 0,
		max: 10,
		step: 1,
		onChange: (value) => {
			console.log(value);
			setValue(value);
		},
	};

	const handleValueChange = (e) => {
		let value = parseInt(e.target.value);
		if (!value) {
			value = 0;
		}
		setValue(e.target.value);
	};

	return (
		<div>
			<BaseMap>
				<DrawingManager onLoad={onLoad} onCircleComplete={onCircleComplete} drawingMode="circle" />
			</BaseMap>
			<Slider value={value} color="red" settings={settings} />
			<Input placeholder="Enter Value" onChange={handleValueChange} />
			<Label color="red">{value}</Label>
		</div>
	);
};

MapWithDrawingManager.propTypes = {};

export default MapWithDrawingManager;
