import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Welcome.css'
import { getAccessToken } from '../../services/Auth'

import Header from '../../components/header/Header'

class Welcome extends Component {

  constructor() {
    super()

    this.state = {
      buttonText: getAccessToken() ? "Goto panel" : "Login"
    }
  }

  buttonClickFunction() {
    if (getAccessToken()) {
      this.props.history.push('/panel')
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1> Welcome page</h1>
        <button onClick={()=> this.buttonClickFunction() }> {this.state.buttonText} </button>
      </div>
    )
  }
}

export default withRouter(Welcome)