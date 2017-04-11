import React from 'react';
import {Line} from 'react-chartjs-2';
import {getSampleDataSystem} from '../server.js';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [],
  datasets: []
  });

export default React.createClass({
  displayName: 'AlphaExample',

  getInitialState() {
    return getState();
  },

  setLabels(sysNum){
    getSampleDataSystem(sysNum, (info)=>{
      this.setState({
        labels: info["labels"]
      });
    });
  },

  addSystem(sysNum){
    this.setLabels(sysNum);
    getSampleDataSystem(sysNum, (info)=>{
      var arrayvar = this.state.datasets.slice();
      var addedAlready = false;
      arrayvar.forEach(function(result, index) {
        if(result["label"] === 'System '+sysNum){
          addedAlready = true;
        }
      });
      if(!addedAlready){
        arrayvar.push(
          {
            label: 'System '+sysNum,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(' + info["red"] +','+info["green"] +','+info["blue"] +',0.4)',
            borderColor: 'rgba(' + info["red"] +','+info["green"] +','+info["blue"] +',1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(' + info["red"] +','+info["green"] +','+info["blue"] +',1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(' + info["red"] +','+info["green"] +','+info["blue"] +',1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: info["data"]
          }
        );
      this.setState({
        datasets: arrayvar
      });
    }
    });
  },

  removeSystem(sysNum){
    var arrayvar = this.state.datasets.slice();
    arrayvar.forEach(function(result, index) {
      if(result["label"] === 'System '+sysNum){
        arrayvar.splice(index, 1);
      }
    });
    this.setState({
      datasets: arrayvar
    });
  },

	componentWillMount() {

	},

  render() {
    return (
      <div>
        <h2>System comparison graph over time</h2>
        <Line data={this.state} />
        <button onClick={this.addSystem.bind(this, 1)}>Add System 1!</button>
        <button onClick={this.addSystem.bind(this, 2)}>Add System 2!</button>
        <button onClick={this.addSystem.bind(this, 3)}>Add System 3!</button>
        <br />
        <button onClick={this.removeSystem.bind(this, 1)}>Remove System 1!</button>
        <button onClick={this.removeSystem.bind(this, 2)}>Remove System 2!</button>
        <button onClick={this.removeSystem.bind(this, 3)}>Remove System 3!</button>
      </div>
    );
  }
});
