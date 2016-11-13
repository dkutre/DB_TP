var db = require('./connection');
var errors = require('./errors');

function clear(callback) {

  /* db.query("SET foreign_key_checks = 0;", [], function (err) {
   if (err) {
   console.log(err);
   }
   }); */
  db.query("SET FOREIGN_KEY_CHECKS = 0;", function (err) {
    if (err) {
      console.log(err);
      errors.sendSqlError(err, callback);
    } else {
      db.query("TRUNCATE TABLE subscribers;", function (err, res) {
        if (err) {
          console.log('user' + err);
          errors.sendSqlError(err, callback);
        } else {
          db.query("TRUNCATE TABLE followers;", function (err, res) {
            if (err) {
              console.log('forum' + err);
              errors.sendSqlError(err, callback);
            } else {
              db.query("TRUNCATE TABLE posts;", function (err, res) {
                if (err) {
                  console.log('thread' + err);
                  errors.sendSqlError(err, callback);
                } else {
                  db.query("TRUNCATE TABLE threads;", function (err, res) {
                    if (err) {
                      console.log('posts', err);
                      errors.sendSqlError(err, callback);
                    } else {
                      db.query("SET FOREIGN_KEY_CHECKS = 0;", function (err) {
                        if (!err) {
                          db.query("TRUNCATE TABLE forums;", function (err, res) {
                            if (err) {
                              console.log('followers', err);
                              errors.sendSqlError(err, callback);
                            } else {
                              db.query("TRUNCATE TABLE users;", function (err, res) {
                                if (err) {
                                  console.log('subsc', err);
                                  errors.sendSqlError(err, callback);
                                } else {
                                  db.query("SET FOREIGN_KEY_CHECKS = 1;", function (err, res) {
                                    if (err) {
                                      errors.sendSqlError(err, callback);
                                    }
                                    else {
                                      callback(0, "OK");
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

module.exports = clear;