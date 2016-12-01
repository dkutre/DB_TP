var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 250,
  host            : 'localhost',
  user            : 'root',
  password        : 'mysqlpass',
  database        : 'myDataBase'
});

module.exports = pool;