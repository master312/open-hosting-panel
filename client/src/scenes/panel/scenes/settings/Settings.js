import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './Settings.css'


class Settings extends Component {

  render() {
    return (
      <div>
        <h2 class="text-center">PajdoSettings</h2>
      </div>
    )
  }
}

export default withRouter(Settings)