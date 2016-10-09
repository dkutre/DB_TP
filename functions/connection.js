var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 30,
  host            : 'localhost',
  user            : 'tpadmin',
  password        : 'password',
  database        : 'my_db'
});

module.exports.db = pool;