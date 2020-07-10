import React from 'react';
import LocationMap from './Components/Maps/LocationMap';
import { Container, Grid, Segment, SegmentGroup } from 'semantic-ui-react';
import MapWithAutocomplete from './Components/Maps/MapWithAutoComplete';
import MapWithStandaloneSearch from './Components/Maps/MapWithStandaloneSearch';
import MapWithDrawingManager from './Components/Maps/MapWithDrawingManager';

function App() {
	return (
		<div className="App">
			<Container fluid>
				<SegmentGroup>
					<Segment>
						<Grid>
							<Grid.Row>
								<Grid.Column width={6}>
									<LocationMap />
								</Grid.Column>
								<Grid.Column width={6}>
									<MapWithAutocomplete />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<MapWithDrawingManager />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</SegmentGroup>
			</Container>
		</div>
	);
}

export default App;
