import React from 'react';
import ReactDOM from 'react-dom';


import NavBar from './components/navbar';
import AlphaExample from './components/alphaexample';
import TimeGraphPage from './components/timegraphpage';


class App extends React.Component {
	render() {
		return (
			<div>
			<NavBar />
					<TimeGraphPage />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
