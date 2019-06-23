import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logo from './logo.svg'
import './Header.css'

class Header extends Component {

  onClick() {
    this.props.history.push("/") 
  }

  render() {
    return (
        <header className="Header-root">
          <img src={logo} className="Header-logo" alt="logo" onClick={() => this.onClick()} />
          <h1 className="Header-title">Open hosting panel</h1>
        </header>
    )
  }
}

export default withRouter(Header)