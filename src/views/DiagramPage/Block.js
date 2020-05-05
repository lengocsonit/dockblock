import React, { Component } from 'react';

export default class Block extends Component {
    constructor(props) {
        super(props);
        
    }
    
  render() {
    return (
        <img onDoubleClick={this.props.onDoubleClick} src={this.props.imageSource} className="block" alt=""/>
    );
  }
}
