var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 30,
  host            : 'localhost',
  user            : 'root',
  password        : 'mysqlpass',
  database        : 'myDataBase'
});

module.exports = pool;