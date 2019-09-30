const getAuthHeaders = require('./Auth').getAuthHeaders
const axios = require('axios')

/**
 * Gets info about current session from backend
 */
const getCredidentals = (type) => {
  return new Promise(function(resolve, reject) {
    axios.get('/api/credidentals/' + type, {headers: getAuthHeaders()}).then(res => {
      if (!Array.isArray(res.data)) {
        reject("Server response not array!")
        return
      }
      resolve(res.data)
    }).catch(error => {
      reject(error.response)
    })
  })
}

// TODO...
const newGitUserCredidentals = (username, password) => {

}

module.exports = {
  getCredidentals,
  newGitUserCredidentals
}