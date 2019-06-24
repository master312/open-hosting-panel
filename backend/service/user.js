const userModel = require('../model').user

const getById = async(userId) => {
  return await userModel.findOne({
    where: {
      id: userId
    }
  })
}

const getByUsername = async(username) => {
  return await userModel.findOne({
    where: {
      username: username
    }
  })
}

const getByUsernameAndPassword = async(username, password) => {
  return await userModel.findOne({
    where: {
      username: username,
      password: password
    }
  })
}

module.exports = {
  getById,
  getByUsername,
  getByUsernameAndPassword
}