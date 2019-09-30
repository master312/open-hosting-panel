const service = require('../service/credidental_provider')
const exception = require('../exception')

const get = async(req, res, next) => {
  try {
    const { type } = req.params
    if (type === null) {
      throw new exception.badRequest('type not specified')
    }
    var credidentalsArray = await service.getBasic(req.auth.user, type)
    if (credidentalsArray === null) {
      // Not found
      res.status(400)
      res.send("Invalid type... probably")
      next()
      return
    }
    res.status(200)
    res.send(credidentalsArray);
    next()
  } catch(error) {
    next(error)
  }
}


module.exports = {
  get,
}