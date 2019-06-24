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
 * Returns object containing headers with authorization related data
 */
const getAuthHeaders = () => {
  return {Authorization: "Bearer " + localStorage.getItem('AccessToken')}
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
      localStorage.setItem('AccessToken', res.data.accessToken)
      resolve();
    }).catch(error => {
      console.log('Login failed ' + error)
      reject(error.response);
    })
  })
}

const logout = () => {
  axios.post('/auth/logout', null, {headers: getAuthHeaders()}).then(res => {
    console.log('Logged out from server')
    window.location.reload()
  }).catch(error => {
    console.log('Error logging out from server ' + error)
    window.location.reload()
  })

  localStorage.removeItem('AccessToken')
}

module.exports = {
  getAccessToken,
  isSessionValid,
  getUserInfo,
  getAuthHeaders,
  login,
  logout
}