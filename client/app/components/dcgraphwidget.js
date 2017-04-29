import React from 'react';
import Checkbox from './checkbox';
import {getTotalDataLifetime} from '../server.js';
import {Bubble} from 'react-chartjs-2';
import Dropdown from './dropdown';




export default class DCGraphWidget extends React.Component {
  //this class will display just a widget of a saved graph
  //(without all the options to edit it from the DC graph page)
  //needs to be passed in two properties (Strings) and which servers are in the graph (Set() of strings)
  //but the main page can just be a group of these and the time widgets
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
    getTotalDataLifetime(sysNum, this.props.property1, (info)=>{
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

  }



  componentWillMount(){
    if(this.props.selectedCheckboxes.size <1){
      this.setState({
        datasets: []
      });
    }
    var totalData = [];
    for (const checkbox of this.props.selectedCheckboxes) {
      this.setLabels(checkbox);
      getTotalDataLifetime(checkbox, this.props.property1, (infoX)=>{//these two functions will be changed to take in the property
        //from selectedProperty1 and 2

          getTotalDataLifetime(checkbox, this.props.property2, (infoY)=>{
            var arrayvar = totalData;
            var toJSONx = JSON.parse(infoX);
            var toJSONy = JSON.parse(infoY);
            //get the most recent value:
            var xval = toJSONx[toJSONx.length - 1][this.props.property1];//this will also have to be generalized
            var yval = toJSONy[toJSONy.length - 1][this.props.property2];
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
                data:[{x:xval,y:yval,r:5}]
              }
            );
            totalData = arrayvar;
            this.setState({
              datasets: totalData
            });
          });

      })
    }
  }


  render() {
    var obprop = {};
    obprop["labels"] = this.state.labels;
    obprop["datasets"] = this.state.datasets;

    return (
      <div>
                    <h5>{this.props.property1 + " and " + this.props.property2  + " Comparison Graph"}</h5>
                    <Bubble data={obprop} />
      </div>
    );
  }
}
