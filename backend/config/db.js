const Sequelize = require('sequelize')

/**
 * Force create DB tables.
 * WARNING: If set to true, all currently existing model tables will be droped!
 */
const forceCreate = false

/**
 * Real DB connection disabled... Using local SqlLite for developemnt
 * */
// const sequelize = new Sequelize(
//     /* Database name */ 'mbmsczsc',
//     /* Username */ 'mbmsczsc',
//     /* Password */ 'vASPL8CVocZG3HbMj8KD0_zd1cEqOlrs', 
//     {
//   host: 'balarama.db.elephantsql.com',
//   dialect: 'postgres',
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});

sequelize.forceCreate = forceCreate;

module.exports = sequelize;