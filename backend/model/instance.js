'use strict'

const instanceStateEnum = require('./enums/instance_state')

module.exports = (sequelize, DataTypes) => {
  var instance = sequelize.define('instance', {
    id:     { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.BIGINT, allowNull: false, unique: 'uniqueName' },
    runner: { type: DataTypes.BIGINT, allowNull: false },
    state:  { type: DataTypes.ENUM(Object.values(instanceStateEnum)), allowNull: false },
    name:   { type: DataTypes.STRING, allowNull: false, unique: 'uniqueName', validate: { len: [3, 35] } },
    domain: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { len: [1, 255] } },
    uptime: { type: DataTypes.BIGINT, allowNull: true }
  })

  return instance
}