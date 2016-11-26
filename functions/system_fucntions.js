var db = require('./connection');

var errors = require('./errors');

/**
 * Проверяет наличие и наполненность указанных свойств в объекте
 * @param  {[Object]} dataObject
 * @param  {[Array]} requriedFields
 * @return {Boolean}
 */
function checkFields(dataObject, requriedFields) {
  for (var i = 0; i < requriedFields.length; i++) {
    if ((dataObject.hasOwnProperty(requriedFields[i])) &&
      (dataObject[requriedFields[i]] === null)) {
      return false;
    }
  }
  return true;
}

module.exports.checkFields = checkFields;
/**
 * Проверяет все ли значения первого массива подходят под возможные значения второго и нет ли среди них лишних
 * @param  {Array} dataObject
 * @param  {Array} requriedFields
 * @return {Boolean}
 */
function possibleValuesForVarieble(dataObject, requriedFields) {
  if (!(dataObject instanceof Array)) dataObject = [dataObject];
  for (var j = 0; j < dataObject.length; j++) {
    var flag = false;
    for (var i = 0; i < requriedFields.length; i++) {
      if (requriedFields[i]===dataObject[j]) flag = true;
    }
    if (flag !== true) return false;
  }
  return true;
}

module.exports.possibleValuesForVarieble = possibleValuesForVarieble;

/**
 * Проверяет подходит ли значение под возможные варинаты
 * @param  {Array} dataObject
 * @param  {Array} possibleValues
 * @return {Boolean}
 */
function possibleValues(dataObject, possibleValues) {
  for (var key = 0; key < dataObject.length; key++) {
    //TODO улучшить через every
    //если не определенная переменная
    if (dataObject[key] === undefined) return true;
    for (var i = 0; i < possibleValues[key].length; i++) {
      if (dataObject[key] === possibleValues[key][i]) return true;
    }
  }
  return false;
}
module.exports.possibleValues = possibleValues;

/**
 * Проверяет содержится ли значение value в массиве dataArray
 * @param  {String}  value
 * @param  {Array}  dataArray
 * @return {Boolean}
 */
function isEntry(value, dataArray) {
  //на тот случай если dataArray не окажется массивом
  //преобразуем в массив
  if (!(dataArray instanceof Array)) dataArray = [dataArray];

  for (var i = 0; i < dataArray.length; i++) {
    if (value === dataArray[i]) return true;
  }
  return false;
}
module.exports.isEntry = isEntry;

/**
 * Ошибки и их коды
 */
errors = {
  requireFields: {
    code: 2,
    message: "Не хватает параметров в запросе"
  },
  unknown: {
    code: 4,
    message: "Неизвестная ошибка"
  },
  duplicateRecord: {
    code: 5,
    message: "Дублирующася запись в таблицу"
  },
  norecord: {
    code: 1,
    message: "Такой записи в таблице нет"
  },
  semantic: {
    code: 3,
    message: "Семантическая ошибка запроса"
  },
  notWrite: {
    code: 1,
    message: "Ошибка записи, почему-то не записалось(("
  },
  notMemory: {
    code: 4,
    message: "Алфавита не хватает для записи постов в этот уровень"
  }
};

module.exports.errors = errors;
/**
 * Интерпритатор ошибок из mysql
 * @param  {Number} errCode код ошибки из mysql
 * @return подбирает нужную ошибку из errors
 */
function mysqlError(errCode) {
  switch(errCode) {
    case 1062:
      return this.errors.duplicateRecord;
      break;
    case 1064:
      return this.errors.semantic;
      break;
    case 1327:
      return this.errors.semantic;
      break;
    default:
      //console.log(errCode);
      return this.errors.unknown;
      break;
  }
}

module.exports.mysqlError = mysqlError;

function getSQLForFollowers(target, wherefore, parameter) {
  /**
   * select followerEmail from followers JOIN user ON user.email = followers.followeeEmail WHERE followers.followeeEmail = 'example@mail.ru';
   */
  var sql = 'SELECT ' + target + ' FROM followers ';
  if (parameter.order !== 'asc') {
    parameter.order = 'desc';
  }
  if (parameter.since_id) {
    sql += '  JOIN user ON followers.' + target + ' = user.email ';
  }
  sql += ' WHERE ' + wherefore + ' = ? ';
  if (parameter.since_id) {
    sql += ' AND user.id >= ' + parameter.since_id
  }
  sql += ' ORDER BY ' + target + ' ' + parameter.order;
  if (parameter.limit) {
    sql += ' LIMIT ' + parameter.limit;
  }
  return sql;
}

module.exports.getSQLForFollowers = getSQLForFollowers;

function moreDetails(dataObject, responceCallback) {
  //TODO оптимизировать
  /*SELECT about, email, user.id, GROUP_CONCAT(DISTINCT f1.followeeEmail SEPARATOR ', ') AS followers, GROUP_CONCAT(DISTINCT f2.followerEmail SEPARATOR ', ') AS following, isAnonymous, name, GROUP_CONCAT(DISTINCT threadId SEPARATOR ', ') AS subscriptions, username
   FROM user
   LEFT JOIN subscribes ON email = userEmail
   LEFT JOIN followers AS f1 ON f1.followerEmail = email
   LEFT JOIN followers AS f2 ON f2.followeeEmail = email
   WHERE email = "example34@mail.ru"
   GROUP BY email;*/
  db.query("SELECT isAnonymous, username, about, email, user.id, GROUP_CONCAT(DISTINCT f1.followeeEmail SEPARATOR ', ') AS followers, GROUP_CONCAT(DISTINCT f2.followerEmail SEPARATOR ', ') AS following, isAnonymous, name, GROUP_CONCAT(DISTINCT threadId SEPARATOR ', ') AS subscriptions, username " +
    " FROM user " +
    " LEFT JOIN subscribes ON email = userEmail " +
    " LEFT JOIN followers AS f1 ON f1.followerEmail = email " +
    " LEFT JOIN followers AS f2 ON f2.followeeEmail = email " +
    " WHERE email = ? " +
    " GROUP BY email; ",
    [dataObject.user], function(err, res) {
      if (err)
        err = mysqlError(err.errno);
      else {
        if (res.length === 0) res = null;
      }
      if (res) {
        responceCallback(0, views.user(
          res[0],
          (res[0].followers ? res[0].followers.split(', ') : []),
          (res[0].following ? res[0].following.split(', ') : []),
          (res[0].subscriptions ? res[0].subscriptions.match( /\d/ig ).map(function(elem){ return +elem }) : [])
          )
        );
      } else {
        responceCallback(0, views.user({
          email: dataObject.user
        }, [], [], []));
      }

    });
}

module.exports.moreDetails = moreDetails;

/**
 * составитель запросов для user.ListPosts
 */
function getSQLforListPosts(dataObject) {
  sql = "SELECT date, dislikes, forumShortname, id AS postId, isApproved, isDeleted, isEdited, isHighlighted, isSpam, likes, message, parent, points, threadId, userEmail AS email FROM post "
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

module.exports.getSQLforListPosts = getSQLforListPosts;