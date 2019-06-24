'use strict'

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id:         { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
    firstName:  { type: DataTypes.STRING, allowNull: false },
    lastName:   { type: DataTypes.STRING, allowNull: false },
    email:      { type: DataTypes.STRING, allowNull: false },
    username:   { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [3, 35] } },
    password:   { type: DataTypes.STRING, allowNull: false },
    lastLogin:  { type: DataTypes.BIGINT, allowNull: true },
    lastIp:     { type: DataTypes.STRING, allowNull: true, validate: { len: [6, 16] } },
  })

  return user
}
