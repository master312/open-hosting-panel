import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getAccessToken, validateSession } from '../../services/Auth'
import logo from './logo.svg'
import './Header.css'

class Header extends Component {

  componentDidUpdate() {
    validateSession()
  }

  onLogoClick() {
    this.props.history.push("/") 
  }

  render() {
    return (
        <header className="header-root">
          <img src={logo} className="header-logo" alt="logo" onClick={() => this.onLogoClick()} />
          <h1 className="header-title">Open hosting panel { getAccessToken() } </h1>
          
        </header>
    )
  }
}

export default withRouter(Header)