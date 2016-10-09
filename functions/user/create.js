var db = require('../connection');

function create(data, callback) {
  /*
  создание юзера
   */
  var res = {
    code: 0,
    response: {
      about: data.about,
      email: data.email,
      id: 0,
      isAnonymous: false,
      name: data.name,
      username: data.username
    }
  };
  callback(0, res);
}

module.exports = create;
