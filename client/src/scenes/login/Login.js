import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.css'

import Header from '../../components/header/Header'

class Login extends Component {

  render() {
    return (
      <div>
        <Header />
        <h1> Login page </h1>
      </div>
    )
  }
}

export default withRouter(Login)