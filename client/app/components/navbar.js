import React from 'react';
import {Link} from 'react-router';


export default class NavBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {Username: "Username"}
    this.changeUsername = this.changeUsername.bind(this);
  }

  changeUsername(name){
    this.setState({Username: name});
  }

  render(){

    const names = ["Company 1", "Company 2"];
    const companyList = names.map((names) =>
      <li onClick={()=>this.changeUsername(names)}><a href="#">{names}</a></li>
    );

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
                <Link to={"/info"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-globe"></span> Info
                  </button>
                </Link>
                </div>
              </div>
            </div>
            <div className="nav navbar-nav navbar-right">
              <div className="btn-toolbar pull-right" role="toolbar">
                <div className="btn-group" role="group">
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-user"></span> {this.state.Username}
                  </button>
                </div>
                <div className="btn-group" role="group">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn navbar-btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                  {companyList}
                  <li><a onClick={()=>this.changeUsername("Username")} href="#">Log out...</a></li>
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
