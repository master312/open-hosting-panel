import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './Service.css'


class Service extends Component {

  render() {
    return (
      <div>
        <h2 class="text-center">PajdoService</h2>
      </div>
    )
  }
}

export default withRouter(Service)