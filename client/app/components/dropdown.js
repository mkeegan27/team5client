import React from 'react';

export default class Dropdown extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selected: this.props.value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.setState({selected: this.props.value})
  }

  handleChange(e) {
      if (this.props.onChange) {
          var change = {
            oldValue: this.state.selected,
            newValue: e.target.value
          }
          this.props.onChange(change);
      }
      this.setState({selected: e.target.value});
  }


  render() {
    var self = this;
      var options = self.props.options.map(function(option) {
          return (
              <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                  {option[self.props.labelField]}
              </option>
          )
      });
      return (
          <select id={this.props.id}
                  className='form-control'
                  value={this.state.selected}
                  onChange={this.handleChange}>
              {options}
          </select>
      )
  }




}
//rewrite it all in correct format
