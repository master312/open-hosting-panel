const Sequelize = require('sequelize')
const config = require('./config/db')
const { logger } = require('./utils')

const sequelize = new Sequelize(config.name, config.user, config.pass, {
  host: config.host,
  dialect: 'postgres',
  pool: config.pool
});

sequelize.authenticate()
  .then(() => {
    logger.log('Connection has been established successfully.', logger.INFO);
  })
  .catch(err => {
    logger.log('Unable to connect to the database:' + err, logger.EXCEPTION);
  });

module.exports = sequelize




// TODO: Remove. DB model example.
// const Sequelize = require('sequelize')
// var User = db.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });
// TODO: Remove. DB automatic creation of tables.
// db.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   }) 
