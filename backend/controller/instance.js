const { logger } = require('../utils')
const service = require('../service').instance

// EXAMPLE: Extract json form data... {"user":{}, "content":{}} -> user, content
//const {user, content} = req.body 

const getAll = async(req, res, next) => {
  try {
    var instances = await service.getAll(req.auth.user)
    res.status(200)
    res.send(instances);
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const get = async(req, res, next) => {
  const { id } = req.params
  try {
    var instance = await service.getSingle(req.auth.user, id)
    res.status(200)
    res.send(instance);
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const getRunners = async(req, res, next) => {
  try {
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const newInstance = async(req, res, next) => {
  try {
    await service.newInstance(req.auth.user, req.body)
    res.sendStatus(200)
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const start = async(req, res, next) => {
  try {
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const stop = async(req, res, next) => {
  try {
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const restart = async(req, res, next) => {
  try {
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const deleteInstance = async(req, res, next) => {
  const { id } = req.params
  try {
    await service.deleteInstance(req.auth.user, id)
    res.sendStatus(200)
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

const edit = async(req, res, next) => {
  try {
    next()
  } catch(error) {
    logger.log(error.message, logger.EXCEPTION)
    res.sendStatus(500)
    next(error)
  }
}

module.exports = {
  getAll,
  get,
  getRunners,
  newInstance,
  start,
  stop,
  restart,
  deleteInstance,
  edit
}