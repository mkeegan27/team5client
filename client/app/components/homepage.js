import React from 'react';
import {Link} from 'react-router';
import Widget from './widget.js';


export default class HomePage extends React.Component {
  render(){
    var newSet=new Set();
    newSet.add("squidboy");
    return (
      <div>
        <Link to={"/time"}>
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-signal"></span> Make a Time Graph
          </button>
        </Link>
        <Link to={"/datacomp"}>
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-th"></span> Make a Data Comp Graph
          </button>
        </Link>

        {/* for now, the below code just shows examples. later we'll load the user's actual saved graphs*/}
        <div className="graph-test">
        <table>
  <tr>
    <th><Widget type={1} property1={"totalWriteIOsHistVlun"} property2={"totalWriteIOsHistVlun"} scope={10} servers={newSet} /></th>
    <th><Widget type={2} property1={"totalWriteIOsHistVlun"} property2={"portTotalAvgIOSizeKB"} scope={0} servers={newSet} /></th>
  </tr>
  <tr>
    <td><Widget type={2} property1={"cpuLatestTotalAvgPct"} property2={"portTotalAvgIOSizeKB"} scope={0} servers={newSet} /></td>
    <td><Widget type={1} property1={"portTotalBandwidthMBPS"} property2={"portTotalBandwidthMBPS"} scope={25} servers={newSet} /></td>
  </tr>
</table>
</div>
      </div>
    );
  }

}
