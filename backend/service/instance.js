const enumInstanceState = require('../model/enums/instance_state')
const instanceModel = require('../model').instance

const getAll = async(user) => {
  return await instanceModel.findAll({
    where: {
      userId: user.id
    }
  })
}

const getSingle = async(user, id) => {
  return await instanceModel.findAll({
    where: {
      id: id,
      userId: user.id
    }
  })
}

const getRunners = async(userId, id) => {
    
}

const newInstance = async(user, model) => {
  /* TODO: Handle inavlid model data exceptions */
  model.id = null
  model.state = enumInstanceState.uninitialized
  await instanceModel.create(model)
}

const start = async(userId, id) => {
  
}

const stop = async(userId, id) => {
  
}

const restart = async(userId, id) => {
  
}

const edit = async(userId, id) => {
  
}

const deleteInstance = async(user, id) => {
  await instanceModel.destroy({
    where: {
      id: id,
      userId: user.id
    }
  })
}

module.exports = {
  getAll,
  getSingle,
  getRunners,
  newInstance,
  start,
  stop,
  restart,
  edit,
  deleteInstance
}