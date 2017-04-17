import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "isChecked": false
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange(){

    this.setState(
      {
        "isChecked": !this.state.isChecked
      }
    );

    this.props.handleCheckboxChange(this.props.label);
  }

  render() {
    return (
      <div className="checkbox">
      <label>
        <input
          type="checkbox"
          value={this.props.label}
          checked={this.state.isChecked}
          onChange={this.toggleCheckboxChange}
        />

        {this.props.label}
      </label>
      </div>
    );
  }
}
