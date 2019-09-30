import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './../../Service.css'


class New extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  render() {
    return (
      <div class="container-fluid">
        <h1>TODO: New service pageeee</h1> 
      </div>
    )
  }
}

export default withRouter(New)