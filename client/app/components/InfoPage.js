import React from 'react';


export default class InfoPage extends React.Component {

  render(){

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>A brief overview of the terms you will see </h1>
            <br></br>
            <p>
              <h4><b>totalWriteIOsHistVlun</b></h4> Total IOs across all Virtual Volumes.
            </p>
            <br></br>
            <p>
              <h4><b>cpuLatestTotalAvgPct</b></h4> The average percent CPU used since the last reading.
            </p>
            <br></br>
            <p>
              <h4><b>portReadBandwidthMBPS</b></h4> The bandwidth of reads to the system in Megabytes per second.
            </p>
            <br></br>
            <p>
              <h4><b>portWriteBandwidthMBPS</b></h4> The bandwidth of writes to the system in Megabytes per second.
            </p>
            <br></br>
            <p>
              <h4><b>portTotalBandwidthMBPS</b></h4> The bandwidth of both reads and writes to the system in Megabytes per second.
            </p>
            <br></br>
            <p>
              <h4><b>portReadAvgIOSizeKB</b></h4> The average size of IO being read from the system.
            </p>
            <br></br>
            <p>
              <h4><b>portWriteAvgIOSizeKB</b></h4> The average size of IO being written to the system.
            </p>
            <br></br>
            <p>
              <h4><b>portTotalAvgIOSizeKB</b></h4> The average size of IO being read from and written to the system.
            </p>
            <br></br>
            <p>
              <h4><b>delAck (also known as Delayed ACK)</b></h4>
              When data is written to a disk, it is acknowledged so that the application knows it was written.
              A delayed ACK occurs when it takes a long time to write to disk and the acknowledgement to the application is delayed.
              The number displayed is the count of delayed ACKs seen since the last perform file was generated.
            </p>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
