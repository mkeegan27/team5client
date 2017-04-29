import React from 'react';
import Checkbox from './checkbox';
import {getTotalDataLifetime} from '../server.js';
import {Line} from 'react-chartjs-2';
import Dropdown from './dropdown';
import CounterInput from 'react-bootstrap-counter';

var selectedCheckboxes = new Set();
var selectedProperty = 'totalWriteIOsHistVlun'
var scope = 0
export default class TimeGraphWidget extends React.Component {
  //props: scope (int), selectedCheckboxes (Set() of Strings), property (String)
  //like the DC widget, this will be used for the main page and will be passed some props to render it
  //does not have the ability to edit it like the timegraphpage
  //also note it has not been tested yet

  constructor(props){
    super(props);
    this.state = {
      "labels": [],
      "datasets": []
    }

    this.setLabels = this.setLabels.bind(this);
  }


  setLabels(sysNum){
    var property = this.props.property;
    getTotalDataLifetime(sysNum, property, (info)=>{
      var labelArr = [];
      var toJSON = JSON.parse(info);
      var scope = this.props.scope;
      if(scope == 0 || scope>toJSON.length){
        scope = toJSON.length
      }
      for(var i = toJSON.length-scope; i < toJSON.length; i++) {
        var obj = toJSON[i];
        labelArr.push(obj["to"]);
      }
      this.setState({
        labels: labelArr
      });
    });

  }

  componentWillMount(){
      this.setState({
        datasets: [],
        property: this.props.property
      });

    var totalData = [];

    for (const checkbox of this.props.selectedCheckboxes) {
      this.setLabels(checkbox);
      var property = selectedProperty;
      getTotalDataLifetime(checkbox, property, (info)=>{
          var arrayvar = totalData;
          var dataArr = [];
          var toJSON = JSON.parse(info);
          var currscope = toJSON.length;
          if(this.props.scope > 0 && this.props.scope<toJSON.length){
            currscope = this.props.scope;
          }
          for(var i = toJSON.length-currscope; i < toJSON.length; i++) {
            var obj = toJSON[i];
            dataArr.push(obj[property]);
          }
          var redColor = 150;
          var blueColor = 87;
          var greenColor = 87;
          arrayvar.push(
            {
              label: checkbox,
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
      })
    }
  }



  render() {
    var obprop ={};
    obprop["labels"] = this.state.labels;
    obprop["datasets"] = this.state.datasets;

    return (
      <div>

                    <h6>{this.props.property + " Time Graph"}</h6>
                    <Line data={obprop} />

      </div>
    );
  }
}
