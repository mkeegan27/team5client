import React from 'react';
import Checkbox from './checkbox';
import {getTotalDataLifetime} from '../server.js';
import {Line} from 'react-chartjs-2';
import Dropdown from './dropdown';
import CounterInput from 'react-bootstrap-counter';

var selectedCheckboxes = new Set();
var selectedProperty = 'totalWriteIOsHistVlun'
var scope = 0
export default class TimeGraphPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "items": [
        'squidboy',
        '1',
        '2'
      ],
      "labels": [],
      "datasets": [],
      "property": 'totalWriteIOsHistVlun'
    }
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dropDownOnChange = this.dropDownOnChange.bind(this);
    this.changeScope = this.changeScope.bind(this);


  }

  dropDownOnChange(change) {
      console.log('onChangeForSelect:\noldValue: ' +
              change.oldValue +
              '\nnewValue: '
              + change.newValue);
      selectedProperty = change.newValue;
  }

  setLabels(sysNum){
    var property = this.state.property;
    getTotalDataLifetime(sysNum, property, (info)=>{
      var labelArr = [];
      var toJSON = JSON.parse(info);
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


  toggleCheckbox(label){
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit(formSubmitEvent){
    formSubmitEvent.preventDefault();
      this.setState({
        datasets: [],
        property: selectedProperty
      });

    var totalData = [];

    for (const checkbox of selectedCheckboxes) {
      this.setLabels(checkbox);
      var property = selectedProperty;
      getTotalDataLifetime(checkbox, property, (info)=>{
          var arrayvar = totalData;
          var dataArr = [];
          var toJSON = JSON.parse(info);
          var currscope = toJSON.length;
          if(scope > 0 && scope<toJSON.length){
            currscope = scope;
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
            datasets: arrayvar,
            property: selectedProperty
          });
      })
    }
  }

  changeScope(newScope){
    scope = newScope;
  }


  render() {
    var obprop ={};
    obprop["labels"] = this.state.labels;
    obprop["datasets"] = this.state.datasets;
    var options = [
        {
            description: 'total writes',
            code: 'totalWriteIOsHistVlun'
        },
        {
            description: 'cpu latest total',
            code: 'cpuLatestTotalAvgPct'
        },
        {
            description: 'port total avg io',
            code: 'portTotalAvgIOSizeKB'
        },
        {
            description: 'total bandwidth',
            code: 'portTotalBandwidthMBPS'
        }
    ];
    return (
      <div className="container">
              <table width="100%">
                <tbody>
                <tr>
                  <th>
                    <form onSubmit={this.handleFormSubmit}>
              {
                this.state.items.map((label)=>{
                    return(
                      <div>
                            <div id="bloc1"><Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} /></div>
                      </div>
                    )
                  })
                }
                <Dropdown id='myDropdown'
                options={options}
                value='totalWriteIOsHistVlun'
                labelField='description'
                valueField='code'
                onChange={this.dropDownOnChange}/>
              <br />
              <p>Show me the __ most recent data points:</p>
              <CounterInput value={940} min={1} max={1000} onChange={ (value) => { this.changeScope(value) } } />
              <br />
              <button className="btn btn-default" type="submit">Display</button>
                </form>


                </th>
                  <th>
                  <div id="bloc2">
                    <h2>{this.state.property + " Time Graph"}</h2>
                    <Line data={obprop} />

                    </div>
                </th>
                  </tr>
                  </tbody>
              </table>

      </div>
    );
  }
}
