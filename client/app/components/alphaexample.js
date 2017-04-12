import React from 'react';
import {Line} from 'react-chartjs-2';
import {getSampleDataSystem} from '../server.js';
import {getTotalWritesLifetime} from '../server.js';


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
    getTotalWritesLifetime(sysNum, (info)=>{
      var labelArr = [];
      var toJSON = JSON.parse(info);
      for(var i = 0; i < toJSON.length; i++) {
        var obj = toJSON[i];
        labelArr.push(obj["to"]);
      }
      this.setState({
        labels: labelArr
      });
    });

  },

  addSystem(sysNum){
    this.setLabels(sysNum);
    getTotalWritesLifetime(sysNum, (info)=>{
      var arrayvar = this.state.datasets.slice();
      var addedAlready = false;
      arrayvar.forEach(function(result, index) {
        if(result["label"] === 'System '+sysNum){
          addedAlready = true;
        }
      });
      if(!addedAlready){
        var dataArr = [];
        var toJSON = JSON.parse(info);
        for(var i = 0; i < toJSON.length; i++) {
          var obj = toJSON[i];
          dataArr.push(obj["totalWriteIOsHistVlun"]);
        }
        var redColor = 150;
        var blueColor = 87;
        var greenColor = 87;
        arrayvar.push(
          {
            label: sysNum,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(' + redColor +','+ greenColor +','+ blueColor +',0.4)',
            borderColor: 'rgba(' + redColor +','+ greenColor +','+ blueColor +',1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(' + redColor +','+ greenColor +','+ blueColor +',1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(' + redColor +','+ greenColor +','+ blueColor +',1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataArr
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
        <button onClick={this.addSystem.bind(this, "squidboy")}>Add Squid Boy!</button>
        <br />
        <button onClick={this.removeSystem.bind(this, 1)}>Remove Squid Boy!</button>
      </div>
    );
  }
});
