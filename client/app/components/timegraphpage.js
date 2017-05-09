import React from 'react';
import Checkbox from './checkbox';
import {getTotalDataLifetime} from '../server.js';
import {Line} from 'react-chartjs-2';
import Dropdown from './dropdown';
import CounterInput from 'react-bootstrap-counter';

var selectedCheckboxes = new Set();
var selectedProperty = 'totalWriteIOsHistVlun'
var selectedName3 = "select a server"
var scope = 0

var mapping = {};
mapping['totalWriteIOsHistVlun'] = "Total Writes";
mapping['cpuLatestTotalAvgPct'] = "Latest CPU Average Percent";
mapping['portTotalAvgIOSizeKB'] = "Average IO Size (KB)";
mapping['portWriteAvgIOSizeKB'] = "Average IO Size (KB, Write only)";
mapping['portReadAvgIOSizeKB'] = "Average IO Size (KB, Read only)";
mapping['portTotalBandwidthMBPS'] = "Bandwidth of Read/Write (Mb/Sec)";
mapping['portWriteBandwidthMBPS'] = "Bandwidth of Write (Mb/Sec)";
mapping['portReadBandwidthMBPS'] = "Bandwidth of Read (Mb/Sec)";

export default class TimeGraphPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "items": [
        {name:'select a server'},
        {name:'squidboy'},
        {name:'poundcakes'},
        {name:'peepers'},
        {name:'wareagle'},
        {name:'squirrel-girl'}
      ],
      "labels": [],
      "datasets": [],
      "property": 'totalWriteIOsHistVlun',
      "propertyreal": "Total Writes"
    }
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dropDownOnChange = this.dropDownOnChange.bind(this);
    this.changeScope = this.changeScope.bind(this);
    this.dropDownOnChange3 = this.dropDownOnChange3.bind(this);

  }

  dropDownOnChange(change) {
      console.log('onChangeForSelect:\noldValue: ' +
              change.oldValue +
              '\nnewValue: '
              + change.newValue);
      selectedProperty = change.newValue;
  }

  dropDownOnChange3(change){
    console.log('onChangeForSelect:\noldValue: ' +
            change.oldValue +
            '\nnewValue: '
            + change.newValue);
    selectedName3 = change.newValue;
    if(selectedName3 != 'select a server'){
      if(selectedCheckboxes.has(selectedName3)){
        selectedCheckboxes.delete(selectedName3);
      } else {
        selectedCheckboxes.add(selectedName3);
      }
    }
  }

  setLabels(sysNum){
    var property = this.state.property;
    getTotalDataLifetime(sysNum, property, (info)=>{
      var labelArr = [];
      var toJSON = JSON.parse(info);
      if(scope == 0 || scope>toJSON.length){
        scope = toJSON.length
      }
      for(var i = 0; i < scope; i++) {
        var obj = toJSON[i];
        labelArr.push(obj["to"].substring(0, 10));
      }
      this.setState({
        labels: labelArr
      });
    });

  }

  componentWillMount(){
     selectedCheckboxes = new Set();
     selectedProperty = 'totalWriteIOsHistVlun';
     scope = 0;
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
        property: selectedProperty,
        propertyreal: mapping[selectedProperty]
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
          for(var i = 0; i < currscope; i++) {
            var obj = toJSON[i];
            dataArr.push(obj[property]);
          }
          var redColor = Math.floor(Math.random()*255);
          var blueColor = Math.floor(Math.random()*255);
          var greenColor = Math.floor(Math.random()*255);
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
            property: selectedProperty,
            propertyreal: mapping[selectedProperty]
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
          description: 'port write Avg io',
          code: 'portWriteAvgIOSizeKB'
        },
        {
          description: 'port read Avg io',
          code: 'portReadAvgIOSizeKB'
        },
        {
            description: 'port total avg io',
            code: 'portTotalAvgIOSizeKB'
        },
        {
          description: 'write bandwidth',
          code: 'portWriteBandwidthMBPS'
        },
        {
          description: 'read bandwidth' ,
          code: 'portReadBandwidthMBPS'
        },
        {
            description: 'total bandwidth',
            code: 'portTotalBandwidthMBPS'
        },
        {
          description: 'delAcks' ,
          code: 'delAcks'
        }
    ];
    return (
      <div className="container">
        <h1>Time Graph Tool</h1>
        <p>Here you can create a new Time Graph, which will show you the progression of one property in different systems over time.</p>
              <table width="100%">
                <tbody>
                <tr>
                  <th>
                    <form onSubmit={this.handleFormSubmit}>
              <div>

                </div>
                <p> select a server to add to/remove from the graph:</p>
                <Dropdown id= 'myDropdownL'
                options={this.state.items}
                value='select a server'
                labelField='name'
                valueField='name'
                onChange={this.dropDownOnChange3}/>
                <br></br>
                <p> select the property to display on the graph:</p>
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
                    <h3>{this.state.propertyreal + " Time Graph"}</h3>
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
