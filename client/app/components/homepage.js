import React from 'react';
import {Link} from 'react-router';


export default class HomePage extends React.Component {
  render(){
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
      </div>
    );
  }

}
