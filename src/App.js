import React from 'react';
import './App.css';
import LocationMap from './Components/Maps/LocationMap';
import { Container } from 'semantic-ui-react';

function App() {
	return (
		<div className="App">
			<Container fluid>
				<LocationMap />
			</Container>
		</div>
	);
}

export default App;
