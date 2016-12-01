var errors = require('../errors');
var db = require('../connection');
var func = require('../system_fucntions');
var threadDetails = require('./details');


function vote(dataObject, responceCallback) {
  db.query('UPDATE thread SET points = points + ?,  likes = likes + IF(? = 1, 1, 0),  dislikes = dislikes + IF(? = -1, 1, 0) WHERE id = ?;',
    [dataObject.vote, dataObject.vote, dataObject.vote, dataObject.thread],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      } else {
        responceCallback(0, dataObject);
      }
    }
  );
}
module.exports = vote;
