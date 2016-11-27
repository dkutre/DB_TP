var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('./../views');
var error = helper.errors;

function create(dataObject, responceCallback) {
  if (!dataObject.hasOwnProperty('parent')) dataObject.parent = '';
  else if (dataObject.parent === null) dataObject.parent = '';
  if (!dataObject.hasOwnProperty('isSpam')) dataObject.isSpam = false;
  if (!dataObject.hasOwnProperty('isApproved')) dataObject.isApproved = false;
  if (!dataObject.hasOwnProperty('isEdited')) dataObject.isEdited = false;
  if (!dataObject.hasOwnProperty('isHighlighted')) dataObject.isHighlighted = false;
  if (!dataObject.hasOwnProperty('isDeleted')) dataObject.isDeleted = false;
  if (dataObject.parent < 0) {
    responceCallback(error.semantic.code, error.semantic.message);
    return;
  }
  if (!helper.checkFields(dataObject, ['date', 'thread', 'message', 'user', 'forum'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  async.parallel([
    function (callback) {
      /**
       * Примерный алгоритм Material Path
       * если нет предка, надо найти максимальный
       * найти math path предка
       * если предок есть, надо найти максимум по последнему уровню вложенности
       *
       * для MaterPath использую 36 систему счисления и 2 позиции в строке для уровня вложенности
       *
       */
      //получаем MaterPath родителя
      db.query("SELECT materPath FROM post WHERE (id = ?);",
        [dataObject.parent, dataObject.thread],
        function (err, res) {
          if (err) callback(helper.mysqlError(err.errno), null);
          else {
            var parentMathPath;
            if (res.length === 0) {
              parentMathPath = '';
            } else {
              parentMathPath = res[0].materPath;
            }
            //максимальный номер ребенка по маске из родителя
            db.query('SELECT materPath AS max FROM post WHERE (threadId = ?) AND (materPath LIKE ?) ORDER BY materPath DESC LIMIT 1',
              [dataObject.thread, parentMathPath + '__'],
              function (err, res) {
                if (err) callback(helper.mysqlError(err.errno), null);
                else {
                  //формирование следующего нового MaterPath
                  var newMaterPath;
                  if (res.length === 0) {
                    //предков этого parenta нет, поэтому создаем новый уровень вложенности
                    newMaterPath = parentMathPath + '00';
                  } else {
                    //2 последних символа строки на один уровень вложенности
                    var tmp = res[0].max.slice(-2);
                    tmp = (parseInt(tmp, 36) + 1).toString(36);
                    while (tmp.length < 2) tmp = '0' + tmp;
                    //больше чем 2 последних символа строки
                    if (tmp.length > 2) callback(error.notMemory, null);
                    newMaterPath = parentMathPath + tmp;
                  }
                  //записываем все что получилось
                  db.query("INSERT INTO post (isApproved, isDeleted, isEdited, isHighlighted, isSpam, message, parent, threadId, date, forumShortname, userEmail, materPath) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [dataObject.isApproved, dataObject.isDeleted, dataObject.isEdited, dataObject.isHighlighted, dataObject.isSpam, dataObject.message, dataObject.parent,
                      dataObject.thread, dataObject.date, dataObject.forum, dataObject.user, newMaterPath],
                    function (err, res) {
                      if (err) callback(helper.mysqlError(err.errno), null);
                      else callback(null, res);
                    });
                }
              });
          }
        });
    },
    function (callback) {
      db.query('UPDATE thread SET posts = posts + 1 WHERE id = ?;',
        [dataObject.thread],
        function (err, res) {
          if (err) callback(helper.mysqlError(err.errno), null);
          else callback(null, res);
        });
    }
  ], function (err, results) {
    if (err) responceCallback(err.code, err.message);
    else {
      var resp = views.post(dataObject, dataObject.forum, dataObject.thread, dataObject.user);
      resp.id = results[0].insertId
      responceCallback(0, resp);
    }
  });
}

module.exports = create;
