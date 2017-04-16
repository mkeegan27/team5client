import React from 'react';
import ReactDOM from 'react-dom';


import NavBar from './components/navbar';
import AlphaExample from './components/alphaexample';

class App extends React.Component {
	render() {
		return (
			<div>
			<NavBar />
				<div className="graph-test">
					<AlphaExample />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
