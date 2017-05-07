import React from 'react';
import Checkbox from './checkbox';
import {getTotalDataLifetime} from '../server.js';
import {Bubble} from 'react-chartjs-2';
import Dropdown from './dropdown';


var selectedCheckboxes = new Set();
var selectedProperty1 = "totalWriteIOsHistVlun"
var selectedProperty2 = "totalWriteIOsHistVlun"
var selectedName1 = "Total Writes"
var selectedName2 = "Total Writes"
export default class DataCompGraphPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "items": [
        'squidboy',
        'poundcakes',
        'peepers',
        'wareagle',
        'squirrel-girl'
      ],
      "labels": [],
      "datasets": [],
      "property1": 'totalWriteIOsHistVlun',
      "property2": 'totalWriteIOsHistVlun',
      "name1": 'Total Writes',
      "name2": 'Total Writes',
    }
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dropDownOnChange1 = this.dropDownOnChange1.bind(this);
    this.dropDownOnChange2 = this.dropDownOnChange2.bind(this);
  }

  componentWillMount(){
     selectedCheckboxes = new Set();
     selectedProperty1 = "totalWriteIOsHistVlun"
     selectedProperty2 = "totalWriteIOsHistVlun"
     selectedName1 = 'Total Writes'
     selectedName2 = 'Total Writes'
  }

  dropDownOnChange1(change) {
      console.log('onChangeForSelect:\noldValue: ' +
              change.oldValue +
              '\nnewValue: '
              + change.newValue);
      selectedProperty1 = change.newValue;
      if(selectedProperty1 == 'totalWriteIOsHistVlun'){
        selectedName1 = 'Total Writes';
      }
      else if (selectedProperty1 == 'cpuLatestTotalAvgPct'){
        selectedName1 = 'Latest CPU Average Percent'
      }
      else if (selectedProperty1 == 'portTotalAvgIOSizeKB'){
        selectedName1 = 'Average IO Size (KB)'
      }
      else if (selectedProperty1 == 'portWriteAvgIOSizeKB'){
        selectedName1 = 'Average IO Size (KB, Write only)'
      }
      else if (selectedProperty1 == 'portReadAvgIOSizeKB'){
        selectedName1 = 'Average IO Size (KB, Read only)'
      }
      else if (selectedProperty1 == 'portTotalBandwidthMBPS'){
        selectedName1 = 'Bandwidth of Read/Write (Mb/Sec)'
      }
      else if (selectedProperty1 == 'portWriteBandwidthMBPS'){
        selectedName1 = 'Bandwidth of Write (Mb/Sec)'
      }
      else if (selectedProperty1 == 'portReadBandwidthMBPS'){
        selectedName1 = 'Bandwidth of Read (Mb/Sec)'
      }
      else{
        selectedName1 = 'delAcks'
      }
  }

  dropDownOnChange2(change) {
      console.log('onChangeForSelect:\noldValue: ' +
              change.oldValue +
              '\nnewValue: '
              + change.newValue);
      selectedProperty2 = change.newValue;
      if(selectedProperty2 == 'totalWriteIOsHistVlun'){
        selectedName2 = 'Total Writes';
      }
      else if (selectedProperty2 == 'cpuLatestTotalAvgPct'){
        selectedName2 = 'Latest CPU Average Percent'
      }
      else if (selectedProperty2 == 'portTotalAvgIOSizeKB'){
        selectedName2 = 'Average IO Size (KB)'
      }
      else if (selectedProperty2 == 'portWriteAvgIOSizeKB'){
        selectedName2 = 'Average IO Size (KB, Write only)'
      }
      else if (selectedProperty2 == 'portReadAvgIOSizeKB'){
        selectedName2 = 'Average IO Size (KB, Read only)'
      }
      else if (selectedProperty2 == 'portTotalBandwidthMBPS'){
        selectedName2 = 'Bandwidth of Read/Write (Mb/Sec)'
      }
      else if (selectedProperty2 == 'portWriteBandwidthMBPS'){
        selectedName2 = 'Bandwidth of Write (Mb/Sec)'
      }
      else if (selectedProperty2 == 'portReadBandwidthMBPS'){
        selectedName2 = 'Bandwidth of Read (Mb/Sec)'
      }
      else{
        selectedName2 = 'delAcks'
      }
  }

  setLabels(sysNum){
    getTotalDataLifetime(sysNum, selectedProperty1, (info)=>{
      var labelArr = [];
      var toJSON = JSON.parse(info);
      for(var i = 0; i < toJSON.length; i++) {
        var obj = toJSON[i];
        labelArr.push(obj["to"].substring(0, 10));//take indices 0-9 inclusive
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
    if(selectedCheckboxes.size <1){
      this.setState({
        datasets: [],
        property1: selectedProperty1,
        property2: selectedProperty2,
        name1: selectedName1,
        name2: selectedName2
      });
    }
    var totalData = [];
    for (const checkbox of selectedCheckboxes) {
      this.setLabels(checkbox);
      getTotalDataLifetime(checkbox, selectedProperty1, (infoX)=>{//these two functions will be changed to take in the property
        //from selectedProperty1 and 2

          getTotalDataLifetime(checkbox, selectedProperty2, (infoY)=>{
            var arrayvar = totalData;
            var toJSONx = JSON.parse(infoX);
            var toJSONy = JSON.parse(infoY);
            //get the most recent value:
            var xval = toJSONx[toJSONx.length - 1][selectedProperty1];//this will also have to be generalized
            var yval = toJSONy[toJSONy.length - 1][selectedProperty2];
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
                data:[{x:xval,y:yval,r:5}]
              }
            );
            totalData = arrayvar;
            this.setState({
              datasets: totalData,
              property1: selectedProperty1,
              property2: selectedProperty2,
              name1: selectedName1,
              name2: selectedName2
            });
          });

      })
    }
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
        <h1>Data Comparison Graph Tool</h1>
        <p>Here you can create a new Data Comparison Graph, which allows you to view trends in two different properties across systems.</p>
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
                }​
                <Dropdown id='myDropdownX'
                options={options}
                value='totalWriteIOsHistVlun'
                labelField='description'
                valueField='code'
                onChange={this.dropDownOnChange1}/>

                <Dropdown id='myDropdownY'
                options={options}
                value='totalWriteIOsHistVlun'
                labelField='description'
                valueField='code'
                onChange={this.dropDownOnChange2}/>



                <button className="btn btn-default" type="submit">Display</button>
                </form>
                </th>
                  <th>
                  <div id="bloc2">
                    <h3>{this.state.name1 + " and " + this.state.name2  + " Comparison Graph"}</h3>
                    <Bubble data={obprop} />

                    </div>
                </th>
                  </tr>
                  </tbody>
              </table>

      </div>
    );
  }
}
