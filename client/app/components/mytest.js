import React from 'react';
import {Line} from 'react-chartjs-2';

const getState = () => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Apples',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Oranges',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(100,140,192,0.4)',
      borderColor: 'rgba(100,140,192,0.4)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(100,140,192,0.4)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(100,140,192,0.4)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [6, 5, 84, 90, 30, 50, 45]
    }

  ]
});


export default React.createClass({
  displayName: 'MyExample',

	getInitialState() {
		return getState();
	},

	componentWillMount() {
			this.setState(getState());
	},

  addMango(){
    var newArray = this.state.datasets.slice();
    newArray.push({
          label: 'Mango',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(50,190,50,0.4)',
          borderColor: 'rgba(50,190,50,0.4)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(50,190,50,0.4)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(50,190,50,0.4)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [60, 45, 82, 10, 40, 12, 100]
        });
    this.setState({datasets:newArray});
  },

  render() {
    return (
      <div>
        <h2>My example</h2>
        <Line data={this.state} />
        <button onClick={this.addMango}>Click this to add Mango</button>
      </div>
    );
  }
});
