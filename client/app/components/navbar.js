import React from 'react';
import {Link} from 'react-router';


export default class NavBar extends React.Component{

  render(){
    return(
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="collapse navbar-collapse">
            <div className="nav navbar-nav navbar-left">
              <div className="btn-toolbar pull-left navbar-left" role="toolbar">
                <div className="btn-group" role="group">
                  <Link to={"/"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-home"></span> Home
                  </button>
                </Link>
                <Link to={"/time"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-signal"></span> Time Graph
                  </button>
                </Link>
                <Link to={"/datacomp"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-th"></span> Data Comparison Graph
                  </button>
                </Link>
                </div>
              </div>
            </div>
            <div className="nav navbar-nav navbar-right">
              <div className="btn-toolbar pull-right" role="toolbar">
                <div className="btn-group" role="group">
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-user"></span> Username
                  </button>
                </div>
                <div className="btn-group" role="group">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn navbar-btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                  <li><a href="#">Log out...</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
  }
}
