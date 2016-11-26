var db = require('../connection');
var helper = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = helper.errors;

function listPosts(dataObject, responceCallback) {
  db.query(helper.getSQLforListPosts(dataObject), [],
    function(err, res) {
      if (err) err = helper.mysqlError(err.errno)
      else {
        if (res.length === 0) err = error.norecord;
      }
      if (err) responceCallback(err.code, err.message);
      else {
        res = res.map(function(node){
          //чтобы работал единый стандарт вывода
          node['id'] = node.postId;
          return views.post(node, node.forumShortname, node.threadId, node.email);
        });
        responceCallback(0, res);
      }
    });
}
module.exports = listPosts;
