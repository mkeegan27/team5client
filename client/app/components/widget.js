import React from 'react';
import DCGraphWidget from './dcgraphwidget.js';
import TimeGraphWidget from './timegraphwidget.js';


export default class Widget extends React.Component {
    //needs to be passed the following props:
    //type: int, 1=time graph, 2=datacomp graph
    //property1: String, first property for DC graph, only property for time graph
    //property2: String, second property for DC graph, empty for time graph
    //scope: int, scope for time graph, nothing for DC graph
    //servers: set of servers for both types of graph
    //
    //

    render(){
      if(this.props.type == 1){
        return(
          <TimeGraphWidget scope={this.props.scope} property={this.props.property1} selectedCheckboxes={this.props.servers} />
        );
      }else{
        return(
          <DCGraphWidget property1={this.props.property1} property2={this.props.property2} selectedCheckboxes={this.props.servers} />
        );
      }
    }
}
