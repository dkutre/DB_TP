var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var error = func.errors;

function create(dataObject, responceCallback) {
  if (!dataObject.hasOwnProperty('parent')) {
    dataObject.parent = '';
  }
  else if (dataObject.parent === null) {
    dataObject.parent = '';
  }
  if (!dataObject.hasOwnProperty('isSpam')) {
    dataObject.isSpam = false;
  }
  if (!dataObject.hasOwnProperty('isApproved')) {
    dataObject.isApproved = false;
  }
  if (!dataObject.hasOwnProperty('isEdited')) {
    dataObject.isEdited = false;
  }
  if (!dataObject.hasOwnProperty('isHighlighted')) {
    dataObject.isHighlighted = false;
  }
  if (!dataObject.hasOwnProperty('isDeleted')) {
    dataObject.isDeleted = false;
  }
  if (dataObject.parent < 0) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!func.checkFields(dataObject, ['date', 'thread', 'message', 'user', 'forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }

  async.parallel([
      function (callback) {
        db.query("SELECT materPath FROM post WHERE (id = ?);",
          [dataObject.parent],
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              var parentMathPath;
              if (res.length === 0) {
                parentMathPath = '';
              } else {
                parentMathPath = res[0].materPath;
              }
              db.query('SELECT materPath AS max FROM post WHERE (threadId = ?) AND (parent = ?) ORDER BY materPath DESC LIMIT 1',
                [dataObject.thread, dataObject.parent],
                function (err, res) {
                  if (err) {
                    callback(func.mysqlError(err.errno), null);
                  }
                  else {
                    var newMaterPath;
                    if (res.length === 0) {
                      newMaterPath = parentMathPath + '00';
                    } else {
                      var tmp = res[0].max.slice(-2);
                      tmp = (parseInt(tmp, 36) + 1).toString(36);
                      while (tmp.length < 2) {
                        tmp = '0' + tmp;
                      }
                      if (tmp.length > 2) {
                        callback(error.notMemory, null);
                      }
                      newMaterPath = parentMathPath + tmp;
                    }
                    db.query("INSERT INTO post (isApproved, isDeleted, isEdited, isHighlighted, isSpam, message, parent, threadId, date, forumShortname, userEmail, materPath) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                      [dataObject.isApproved, dataObject.isDeleted, dataObject.isEdited,
                        dataObject.isHighlighted, dataObject.isSpam, dataObject.message, dataObject.parent,
                        dataObject.thread, dataObject.date, dataObject.forum, dataObject.user, newMaterPath],
                      function (err, res) {
                        if (err) {
                          callback(func.mysqlError(err.errno), null);
                        }
                        else {
                          callback(null, res);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      },
      function (callback) {
        db.query('UPDATE thread SET posts = posts + 1 WHERE id = ?;',
          [dataObject.thread],
          function (err, res) {
            if (err) {
              callback(func.mysqlError(err.errno), null);
            }
            else {
              callback(null, res);
            }
          });
      },
      function (callback) {
        db.query('INSERT INTO userOnForum (userEmail, forumShortname) values (?, ?);',
          [dataObject.user, dataObject.forum],
          function (err, res) {
            //if (err) //{
             // console.log(err);
            //  callback(err, null);
              //callback(func.mysqlError(err.d), null);
            //}
            //else {
              callback(null, true);
            //}
          }
        );
      }
    ],
    function (err, results) {
      if (err) {
       // console.log(err);
        responceCallback(err.code, err.message);
      }
      else {
        var responce = views.post(dataObject, dataObject.forum, dataObject.thread, dataObject.user);
        responce.id = results[0].insertId;
        responceCallback(0, responce);
      }
    }
  );
}

module.exports = create;
