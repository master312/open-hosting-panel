import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

import Welcome from './scenes/welcome/Welcome';
import Login from './scenes/login/Login';

class App extends Component {
  render() {
    return (
      <Router >
        <div className="app">
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/panel" component={Welcome} />
        </div>
      </Router>
    )
  }
}

export default App