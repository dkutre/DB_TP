var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;


function details(dataObject, responceCallback) {
  /**
   *
   *
   * SELECT about, email, user.id, GROUP_CONCAT(DISTINCT f1.followeeEmail SEPARATOR ', ') AS followers, GROUP_CONCAT(DISTINCT f2.followerEmail SEPARATOR ', ') AS following, isAnonymous, name, GROUP_CONCAT(DISTINCT threadId SEPARATOR ', ') AS subscriptions, username  FROM user LEFT JOIN subscribes ON email = userEmail LEFT JOIN followers AS f1 ON f1.followerEmail = email LEFT JOIN followers AS f2 ON f2.followeeEmail = email WHERE email = "example34@mail.ru" GROUP BY email;
   *
   */
  if (!helper.checkFields(dataObject, ['user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  }
  helper.moreDetails(dataObject, responceCallback);
}

module.exports = details;
