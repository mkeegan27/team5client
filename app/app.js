import React from 'react';
import ReactDOM from 'react-dom';


import NavBar from './components/navbar';
import AlphaExample from './components/alphaexample';

class App extends React.Component {
	render() {
		return (
			<div>
			<NavBar />
			<AlphaExample />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
