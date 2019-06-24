import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.css'
import avatar from './avatar.png'
import { login } from '../../services/Auth'
import Alert from './components/Alert'

import Header from '../../components/header/Header'

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      inputDisabled: true,
    }
  }

  componentDidMount() {
    /* Enable login after 500 ms */
    setTimeout(() => this.setInputState(true), 500)
  }

  setInputState(enabled) {
    this.setState(prevState => ({
      inputDisabled: !enabled
    }))
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  onSubmit(e) {
    e.preventDefault()
    if (this.state.inputDisabled) {
      /* Safety check: can not submit again while input is disabled */
      return
    }
  
    if (!this.state.username || this.state.username.length <= 1 || !this.state.password || this.state.password.length <= 1) {
      alert("Username or/and password are too short or missing")
      return
    }
    
    /* Disable input */
    this.setInputState(false)
    this.refs.Alert.hide()

    login(this.state.username, this.state.password).then(() => {
      this.refs.Alert.show('info', 'Login successfull!')
      setTimeout(() => this.props.history.push('/'), 2000)
    }).catch((error) => {
      setTimeout(() => {
        this.setInputState(true)
        this.refs.Alert.show('danger', error.data)
      }, 1000)
    })
  }

  render() {
    return (
      <div >
        <Header />
        <div class="login-form">
          <h2 class="text-center">Member Login</h2>
            <form noValidate onSubmit={(e) => this.onSubmit(e)}>
              <div class="avatar" >
                <img src={avatar} alt="Avatar" />
              </div>           
              <div class="form-group">
                <input type="text" disabled={this.state.inputDisabled} class="form-control input-lg" name="username" placeholder="Username" onChange={(e) => this.onChange(e)} />
              </div>
              <div class="form-group">
                <input type="password" disabled={this.state.inputDisabled} class="form-control input-lg" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
              </div>        
              <div class="form-group">
                <button type="submit" disabled={this.state.inputDisabled} class="btn btn-primary btn-lg btn-block login-btn">Sign in</button>
              </div>
              {/* <p class="hint-text">Don't have an account? <a href="/">Sign up here</a></p> */}          
              <Alert ref="Alert"/>
            </form>
            <div class="form-footer">Forgot Your Password? Sry, but you are screwed...</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)