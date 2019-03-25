const Sequelize = require('sequelize')
const logger = require('./core/logger')

/* TODO: Pull form config file */
const dbHost = 'balarama.db.elephantsql.com';
const dbName = 'mbmsczsc';
const dbUser = 'mbmsczsc';
const dbPass = 'vASPL8CVocZG3HbMj8KD0_zd1cEqOlrs';
const dbPool = {
  max: 10,
  min: 0,
  acquire: 30000,
  idle: 10000
};

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'postgres',
  pool: dbPool
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