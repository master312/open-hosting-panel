import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Welcome.css'

import Header from '../../components/header/Header'

class Welcome extends Component {

  render() {
    return (
      <div>
        <Header />
        <h1> Welcome page</h1>
        <button onClick={()=> this.props.history.push('/login') }>Login</button>
      </div>
    )
  }
}

export default withRouter(Welcome)