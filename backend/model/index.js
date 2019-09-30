'use strict'

const fs = require('fs')
const path = require('path')
const sequelize = require('../database')
const basename  = path.basename(__filename);
var db = {}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].initRelations) {
    db[modelName].initRelations(db)
  }
})

db.sequelize = sequelize

if (sequelize.forceCreate) {
  sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
}


module.exports = db