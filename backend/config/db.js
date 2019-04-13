
const host = 'balarama.db.elephantsql.com'
const name = 'mbmsczsc'
const user = 'mbmsczsc'
const pass = 'vASPL8CVocZG3HbMj8KD0_zd1cEqOlrs'
const forceSync = false
const pool = {
  max: 10,
  min: 0,
  acquire: 30000,
  idle: 10000
}

module.exports = {
    host,
    name,
    user,
    pass,
    forceSync,
    pool
}