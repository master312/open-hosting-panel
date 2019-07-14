import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import './Panel.css'

import Header from '../../components/header/Header'

import Navigation from './components/Navigation'

import Dashboard from './scenes/dashboard/Dashboard'
import Service from './scenes/service/Service'
import Settings from './scenes/settings/Settings'
import Messages from './scenes/messages/Messages'
import Reports from './scenes/reports/Reports'

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
        <Navigation />

        <Route exact path={this.getRootPath()} render={() => (
            <Redirect to={this.getRootPath() + "dashboard"} />
        )}/>
        <Route exact path={this.getRootPath() + "dashboard"} component={Dashboard} />
        <Route exact path={this.getRootPath() + "service"} component={Service} />
        <Route exact path={this.getRootPath() + "settings"} component={Settings} />
        <Route exact path={this.getRootPath() + "messages"} component={Messages} />
        <Route exact path={this.getRootPath() + "reports"} component={Reports} />
      </div>
    )
  }
}

export default withRouter(Panel)