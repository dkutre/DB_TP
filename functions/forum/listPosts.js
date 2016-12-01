var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;
var postDetails = require('../post/details')

function getSQLforListPosts(dataObject) {
  var sql = ' SELECT id FROM post ';
  sql += ' WHERE (post.forumShortname = "' + dataObject.forum + '") ';
  if (dataObject.since) {
    sql += ' AND (post.date >= "' + dataObject.since + '") ';
  }
  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql += ' ORDER BY post.date ' + dataObject.order;
  if (dataObject.limit) {
    sql += ' LIMIT ' + dataObject.limit;
  }
  return sql;
}

function listPosts(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  else {
    db.query(getSQLforListPosts(dataObject), [], function (err, res) {
        if (err) {
          err = func.mysqlError(err.errno);
          responceCallback(err.code, err.message);
        }
        else {
          console.log(res);
          res = res.map((node) => {
            return function (callback) {
              postDetails({post: node.id, related: dataObject.related}, function (code, res) {
                callback(null, res);
              });
            }
          });
          console.log(res);
          async.parallel(res, function (err, res) {
            if (err) {
              responceCallback(err.code, err.message);
            } else {
              responceCallback(0, res);
            }
          });
        }
      }
    );
  }
}

module.exports = listPosts;
