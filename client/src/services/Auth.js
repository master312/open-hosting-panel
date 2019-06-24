const axios = require('axios')

/**
 * Returns access token or NULL if user is not logged in
 */
const getAccessToken = () => {
  return localStorage.getItem('AccessToken')
}

/**
 * Checks with backend, wether current user session is stil valid
 */
const isSessionValid = () => {
  /* TODO */
  return true;
}

/**
 * Returns details about currently logged in user, or null if not logged in
 */
const getUserInfo = () => {
  /* TODO */
}

/**
 * Sends login request to backend. Saves access token to local store if login was successfull.
 * Promises response, wether loggedin or failed
 * @param {*} username
 * @param {*} password 
 */
const login = (username, password) => {
  const model = {
    username: username,
    password: password
  }

  return new Promise(function(resolve, reject) {
    axios.post('/auth/login', model).then(res => {
      localStorage.setItem('AccessToken', res.data)
      resolve();
    }).catch(error => {
      console.log('Login failed ' + error)
      reject(error.response);
    })
  })
}

const logout = () => {
  localStorage.removeItem('AccessToken')
  window.location.reload()
  /* TODO: Send logout to server! */
}

module.exports = {
  getAccessToken,
  isSessionValid,
  getUserInfo,
  login,
  logout
}