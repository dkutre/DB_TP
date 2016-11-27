var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;


function details(dataObject, responceCallback) {
  if (!helper.checkFields(dataObject, ['user'])) {
    responceCallback(error.requireFields.code, error.requireFields.message);
    return;
  } else {
    helper.moreDetails(dataObject, responceCallback);
  }
}

module.exports = details;
