'use strict'

module.exports = (sequelize, DataTypes) => {
  var gitUserCredidental = sequelize.define('git_user_credidental', {
    id:         { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
    userId:     { type: DataTypes.BIGINT, allowNull: false, unique: 'uniqueName' },
    username:   { type: DataTypes.STRING, allowNull: false, unique: 'uniqueName' },
    password:   { type: DataTypes.STRING, allowNull: false },
  })

  gitUserCredidental.initRelations = function(models) {
    gitUserCredidental.belongsTo(models['user'], {foreignKey: 'userId'});
  }

  return gitUserCredidental
}
