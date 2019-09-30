'use strict'

module.exports = (sequelize, DataTypes) => {
  var session = sequelize.define('auth_session', {
    id:         { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
    token:      { type: DataTypes.STRING, allowNull: false },
    startTime:  { type: DataTypes.BIGINT, allowNull: false },
    userId:     { type: DataTypes.BIGINT, allowNull: false }
  })

  return session
}
