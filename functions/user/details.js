var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;


function details(dataObject, responceCallback) {
  if (!func.checkFields(dataObject, ['user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  } else {
    func.moreDetails(dataObject, responceCallback);
  }
}

module.exports = details;
