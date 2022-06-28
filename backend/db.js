const dbconfig = require('./dbconfig.json');
const Pool = require("pg").Pool;
const pool = new Pool(dbconfig)

module.exports = pool;