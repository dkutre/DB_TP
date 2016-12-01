var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;

function getSQLforListPosts(dataObject) {
  let sql = "SELECT date, dislikes, forumShortname, id AS postId, isApproved, isDeleted, isEdited, isHighlighted, isSpam, likes, message, parent, points, threadId, userEmail AS email FROM post "
  sql += 'WHERE (userEmail = "' + dataObject.user + '") ';

  if (dataObject.since) {
    sql += ' AND (date >= "' + dataObject.since + '") ';
  }

  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql += ' ORDER BY date ' + dataObject.order;

  if (dataObject.limit) {
    sql += ' LIMIT ' + dataObject.limit;
  }
  return sql;
}

function listPosts(dataObject, responceCallback) {
  db.query(getSQLforListPosts(dataObject), [],
    function (err, res) {
      if (err) {
        err = func.mysqlError(err.errno);
        responceCallback(err.code, err.message);
      }
      else {
        if (res.length === 0) {
          err = error.norecord;
          responceCallback(err.code, err.message);
        } else {
          res = res.map((node) => {
            node['id'] = node.postId;
            return views.post(node, node.forumShortname, node.threadId, node.email);
          });
          responceCallback(0, res);
        }
      }
    }
  );
}

module.exports = listPosts;
