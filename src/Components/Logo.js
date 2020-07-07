import React from 'react';
import { Label } from 'semantic-ui-react';

function Logo(props) {
	return (
		<h2>
			<Label as="a" size="big">
				Shroom Map{' '}
				<span role="img" aria-label="tent">
					🍄
				</span>
			</Label>
		</h2>
	);
}

export default Logo;
