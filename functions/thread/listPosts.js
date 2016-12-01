var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');


function getSQLforListPosts(dataObject) {
  let sql;
  if (!dataObject.hasOwnProperty('sort')) {
    dataObject.sort = 'flat';
  }
  if (dataObject.order !== 'asc') {
    dataObject.order = 'desc';
  }
  sql = 'SELECT * FROM post WHERE (threadId = "' + dataObject.thread + '") ';
  if (dataObject.since) {
    sql += ' AND (date >= "' + dataObject.since + '") ';
  }
  switch (dataObject.sort + '_' + dataObject.order) {
    case 'flat_asc':
      sql += ' ORDER BY date ASC';
      if (dataObject.limit) {
        sql += ' LIMIT ' + dataObject.limit;
      }
      break;
    case 'flat_desc':
      sql += ' ORDER BY date DESC';
      if (dataObject.limit) {
        sql += ' LIMIT ' + dataObject.limit;
      }
      break;
    case 'tree_asc':
      sql += ' ORDER BY materPath ASC';
      if (dataObject.limit) {
        sql += ' LIMIT ' + dataObject.limit;
      }
      break;
    case 'tree_desc':
      sql += ' order by LPAD(materPath, 2, "") DESC, materPath ASC';
      if (dataObject.limit) {
        sql += ' LIMIT ' + dataObject.limit;
      }
      break;
    case 'parent_tree_asc':
      var tmp = String(dataObject.limit);
      while (tmp.length < 2) {
        tmp = '0' + tmp;
      }
      sql += ' AND (materPath < "' + tmp + '") ';
      sql += ' ORDER BY materPath ASC';
      break;
    case 'parent_tree_desc':
      var tmp = String(dataObject.limit);
      while (tmp.length < 2) {
        tmp = '0' + tmp;
      }
      sql += ' AND (materPath < "' + tmp + '") ';
      sql += ' order by LPAD(materPath, 2, "") DESC, materPath ASC';
      break;
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
        res = res.map((node) => {
          return views.post(node, node.forumShortname, node.threadId, node.userEmail);
          // {"materPath": node.materPath}
        });
        responceCallback(0, res);
      }
    }
  );
}

module.exports = listPosts;
