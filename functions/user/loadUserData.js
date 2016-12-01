'use strict'

var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;

class loadUserData {
  constructor() {
    this.dataToLoad = "values ";
    this.counter = 0;
    this.upperBoundery = 100;
    this.userEmpty = true;
    this.userChecked = false;
  }

  changeState(userEmpty, userChecked) {
    this.userChecked = userChecked;
    this.userEmpty = userEmpty;
  }

  notLoaded(callback) {
    if (this.userChecked) {
    //  console.log('fast');
      callback(null, this.userChecked);
    } else {
      var func = this.changeState.bind(this);
   //   console.log('slow');
      db.query('SELECT COUNT(*) as number FROM user;', function (err, res) {
        if (err) {
          console.log(err);
        } else {
          debugger;
        //  console.log(this);
          let userEmpty = (res[0].number === 0);
          func(userEmpty, true);
          callback(null, userEmpty);
        }
      });
    }
  }

  insert(dataObject) {
    if (!dataObject.username) {
      dataObject.username = '';
    }
    if (!dataObject.about) {
      dataObject.about = '';
    }
    if (!dataObject.name) {
      dataObject.name = '';
    }

    if (this.counter != 0) {
      this.dataToLoad += ',';
    }

    let params = "('" + dataObject.username + "','"
      + dataObject.about + "','"
      + dataObject.name + "','"
      + dataObject.email + "','"
      + dataObject.isAnonymous + "')";

    this.dataToLoad += params;
    this.counter++;
    if (this.counter === this.upperBoundery) {
      console.log('counter =', this.counter, this.dataToLoad);
    }
  }

  loadToDB() {
    if (this.counter === this.upperBoundery) {
      db.query("INSERT INTO user (username, about, name, email, isAnonymous) " + this.dataToLoad, function (err, res) {
        if (err) {
          console.log(err);
        }
      });
      this.counter = 0; // готовимся к след.считыванию
      this.dataToLoad = "values ";
    }
  }

  loadData(dataObject) {
    this.loadToDB();
    this.insert(dataObject);
  }
}

module.exports.loadUserData = loadUserData;