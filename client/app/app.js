import React from 'react';
import ReactDOM from 'react-dom';

import {IndexRoute,Router, Route, browserHistory } from 'react-router';
import NavBar from './components/navbar';
import DataCompGraphPage from './components/datacompgraphpage';
import TimeGraphPage from './components/timegraphpage';
import HomePage from './components/homepage';


class Home extends React.Component {
  render() {
    return (
      <HomePage user={1}/>
    );
  }
}

class TimeGraph extends React.Component {
	render() {
		return (
			<TimeGraphPage />
		);
	}
}

class DataCompGraph extends React.Component {
	render() {
		return (
			<DataCompGraphPage />
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
			<NavBar />
					{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
			<Route path="/time" component={TimeGraph} />
			<Route path="/datacomp" component={DataCompGraph} />
    </Route>
  </Router>
),document.getElementById('app'));
