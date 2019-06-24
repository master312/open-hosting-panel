import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './Panel.css'

import Header from '../../components/header/Header'


class Panel extends Component {

  render() {
    return (
      <div>
        <Header />
        <h2 class="text-center">PajdoPanel</h2>
      </div>
    )
  }
}

export default withRouter(Panel)