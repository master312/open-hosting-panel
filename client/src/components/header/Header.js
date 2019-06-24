import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logout } from '../../services/Auth'
import logo from './logo.svg'
import './Header.css'

class Header extends Component {

  onLogoClick() {
    this.props.history.push("/") 
  }

  onLogoutClick() {
    logout();
  }

  render() {
    return (
        <header className="header-root">
          <img src={logo} className="header-logo" alt="logo" onClick={() => this.onLogoClick()} />
          <button onClick={() => this.onLogoutClick()} >LOGOUT</button>
          <h1 className="header-title">Open hosting panel </h1>
          
        </header>
    )
  }
}

export default withRouter(Header)