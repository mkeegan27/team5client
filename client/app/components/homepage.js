import React from 'react';
import {Link} from 'react-router';
import Widget from './widget.js';


export default class HomePage extends React.Component {

  render(){
    var newSet=new Set();
    newSet.add("squidboy");
    newSet.add("poundcakes");
    newSet.add("peepers");
    newSet.add("wareagle");
    newSet.add("squirrel-girl");

    var dataArray = [
      {
        "type":1,
        "prop1":"totalWriteIOsHistVlun",
        "prop2":"totalWriteIOsHistVlun",
        "scope":10,
        "servers":newSet
      },
      {
        "type":2,
        "prop1":"totalWriteIOsHistVlun",
        "prop2":"portTotalAvgIOSizeKB",
        "scope":10,
        "servers":newSet
      },
      {
        "type":1,
        "prop1":"portTotalBandwidthMBPS",
        "prop2":"portTotalBandwidthMBPS",
        "scope":25,
        "servers":newSet
      },
      {
        "type":2,
        "prop1":"cpuLatestTotalAvgPct",
        "prop2":"portTotalAvgIOSizeKB",
        "scope":0,
        "servers":newSet
      },
      {
        "type":1,
        "prop1":"totalWriteIOsHistVlun",
        "prop2":"totalWriteIOsHistVlun",
        "scope":100,
        "servers":newSet
      },
      {
        "type":2,
        "prop1":"totalWriteIOsHistVlun",
        "prop2":"totalWriteIOsHistVlun",
        "scope":0,
        "servers":newSet
      }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <h1>User Graphs</h1>
          <p>Here are all of the graphs of your systems which you've saved for quick access. To make another graph, use the buttons at the top of the page.</p>
        {/* taking these buttons out for now because the navbar does their job
          <Link to={"/time"}>
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-signal"></span> Make a Time Graph
          </button>
        </Link>
        <Link to={"/datacomp"}>
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-th"></span> Make a Data Comp Graph
          </button>
        </Link>*/}

        {/* for now, the below code just shows examples. later we'll load the user's actual saved graphs*/}
        <table className="graph-test cellpadding">
          <tbody>
            {dataArray.map((obj)=>{
              return(
                <tr><td></td><td>
                  <Widget type={obj.type} property1={obj.prop1} property2={obj.prop2} scope={obj.scope} servers={obj.servers} />
                </td></tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>

      </div>
    );
  }

}
