import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './Dashboard.css'


class Dashboard extends Component {

  render() {
    return (
      <div>
        <h2 class="text-center">PajdoDashboard</h2>
      </div>
    )
  }
}

export default withRouter(Dashboard)