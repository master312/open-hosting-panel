const gitUserCredidentalModel = require('../model').git_user_credidental

/**
 * Returns array of credidental models for specified type
 * @param {*} type available types: git-user (only one for now)
 */
const get = async(userId, type) => {
  switch(type.toLowerCase()) {
    case 'git-user':
      break
    default:
      return null
  }
  return await gitUserCredidentalModel.findAll({
    where: {
      userId: userId
    }
  })
}

/**
 * Returns array of basic info about credidentals for specified type
 */
const getBasic = async(user, type) => {
  var credidentals = await get(user.id, type);
  if (credidentals == null) {
    return null;
  }
  var basicInfo = []
  credidentals.forEach(element => {
    basicInfo.push({
      id: element.id,
      name: element.username
    })
  });
  return basicInfo
}


module.exports = {
    get,
    getBasic
}