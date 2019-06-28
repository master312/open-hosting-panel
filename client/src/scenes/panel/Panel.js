import React, { Component } from 'react'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import { logout } from '../../services/Auth'

import './Panel.css'

import Header from '../../components/header/Header'

import Dashboard from './scenes/dashboard/Dashboard'
import Service from './scenes/service/Service'
import Settings from './scenes/settings/Settings'
import Messages from './scenes/messages/Messages'
import Reports from './scenes/reports/Reports'

/**
 * TODO: Rewrite whole navigation system
 * NEEDS RESEARCH FIRST!!
 * Prevent re-loading of whole page while navigating. Instead, only change components
 */

class Panel extends Component {

  getRootPath() {
    var rootPath = this.props.match.path
    rootPath = rootPath.substring(0, rootPath.indexOf(':'))
    return rootPath ? rootPath : this.props.match.path + '/'
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {/* Navigation menu */}
          <nav class="navbar navbar-expand-md navbar-light bg-light">
            <div class="container">
              <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav">
                  <a href={this.getRootPath() + "dashboard"} class="nav-item nav-link active">Dashboard</a>
                  <a href={this.getRootPath() + "settings" } class="nav-item nav-link">Settings</a>
                  <a href={this.getRootPath() + "messages" } class="nav-item nav-link">Messages</a>
                  <a href={this.getRootPath() + "reports" } class="nav-item nav-link disabled" tabindex="-1">Reports</a>
                </div>

                <div class="navbar-nav ml-auto">
                  <a href="/" onClick={()=>logout()} class="nav-item nav-link">Logout</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
    
        <BrowserRouter basename={this.getRootPath()}>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/service" component={Service} />
          <Route path="/settings" component={Settings} />
          <Route path="/messages" component={Messages} />
          <Route path="/reports" component={Reports} />
        </BrowserRouter>
      </div>
    )
  }
}

export default withRouter(Panel)