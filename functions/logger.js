var fs = require('fs');

module.exports.dump = function (data) {
  fs.writeFileSync('/home/valera/repository/DB_TP/log.txt', data);
};