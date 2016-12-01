var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var postDetails = require('../post/details');

function vote(dataObject, responceCallback) {
  db.query('UPDATE post SET points = points + ?,  likes = likes + IF(? = 1, 1, 0),  dislikes = dislikes + IF(? = -1, 1, 0) WHERE id = ?;',
    [dataObject.vote, dataObject.vote, dataObject.vote, dataObject.post],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        postDetails(dataObject, responceCallback);
      }
    }
  );
}

module.exports = vote;
