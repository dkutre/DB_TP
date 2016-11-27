var errors = require('../errors');
var db = require('../connection');
var helper = require('../system_fucntions');
var threadDetails = require('./details');

function update(dataObject, responceCallback) {
  db.query('UPDATE thread SET message = ?, slug = ? WHERE id = ?;',
    [dataObject.message, dataObject.slug, dataObject.thread],
    function (err, res) {
      if (err) {
        err = helper.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        threadDetails({thread: dataObject.thread}, responceCallback);
      }
    }
  );
}

module.exports = update;
