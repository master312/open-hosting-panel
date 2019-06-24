const axios = require('axios')

/**
 * Returns access token or NULL if user is not logged in
 */
const getAccessToken = () => {
  return localStorage.getItem('AccessToken')
}

/**
 * Gets info about current session from backend
 */
const getSessionInfo = () => {
  if (!getAccessToken()) {
    return new Promise(function(resolve, reject) { reject("not logged in") });
  }
  return new Promise(function(resolve, reject) {
    axios.get('/auth/info', {headers: getAuthHeaders()}).then(res => {
      resolve(res.data)
    }).catch(error => {
      if (error.response.status === 401) {
        /* Session is invalid! Clear access token from local store */
        localStorage.removeItem('AccessToken')
      }
      console.log('Could not get session info. ' + error)
      reject(error.response)
    })
  })
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
      resolve()
    }).catch(error => {
      console.log('Login failed ' + error)
      reject(error.response)
    })
  })
}

/**
 * Ends user sesison. Clears local store and lets backedn know that user has logged out.
 */
const logout = (localStoreOnly) => {
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
  getSessionInfo,
  getAuthHeaders,
  login,
  logout
}