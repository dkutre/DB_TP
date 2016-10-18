functions = require('../system_fucntions');

function details(data, callback) {
  console.log(data);
  functions.getFullUser(data.user, callback);
  //callback(0, "ok");
}

module.exports = details;
