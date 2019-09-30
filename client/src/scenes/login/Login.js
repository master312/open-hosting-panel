import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.css'
import avatar from './avatar.png'
import { login, getSessionInfo } from '../../services/Auth'
import Alert from './components/Alert'

import Header from '../../components/header/Header'

/* TODO: Move this to config */
const USERNAME_MIN_LEN = 3
const PASSWORD_MIN_LEN = 3

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      inputDisabled: true,
    }
  }

  componentWillMount() {
    /* If already logged in, redirect to panel. */
    getSessionInfo().then((data) => {
      console.log('Already logged in. Redirecting...')  
      this.props.history.push('/panel')
    }).catch((error) => {
    })
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
  
    if (!this.state.username || !this.state.password) {
      this.refs.Alert.show('warning', 'Please enter username and password')
      return
    }
    
    if (this.state.username.length < USERNAME_MIN_LEN || this.state.password.length < PASSWORD_MIN_LEN) {
      this.refs.Alert.show('warning', 'Username or password are too short')
      return
    }

    /* Disable input */
    this.setInputState(false)
    this.refs.Alert.hide()

    login(this.state.username, this.state.password).then(() => {
      this.refs.Alert.show('success', 'Login successfull!')
      setTimeout(() => this.props.history.push('/'), 2000)
    }).catch((error) => {
      setTimeout(() => {
        this.setInputState(true)
        if (error.status === 401) {
          this.refs.Alert.show('danger', error.data)
        } else {
          this.refs.Alert.show('danger', "Server error code: " + error.status)
          console.log(error.data)
        }
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