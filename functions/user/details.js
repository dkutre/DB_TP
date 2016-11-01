var functions = require('../system_fucntions');
var errors = require('../errors');

function details(data, callback) {
  console.log(data);
  if (!data.user) {
    errors.sendError(3, callback);
  }
  functions.getFullUser(data.user, callback);
  //callback(0, "ok");
}

module.exports = details;
