'use strict'

var db = require('../connection');
var func = require('../system_fucntions');
var async = require('async');
var views = require('../views');
var error = func.errors;

class loadPostData {
  constructor() {
    this.dataToLoad = "values ";
    this.counter = 0;
    this.upperBoundery = 100;
    this.empty = true;
    this.checked = false;
  }

  changeState(empty_, checked) {
    this.checked = checked;
    this.empty = empty_;
  }

  notLoaded(callback) {
    if (this.checked) {
      //  console.log('fast');
      callback(null, this.checked);
    } else {
      var func = this.changeState.bind(this);
      //   console.log('slow');
      db.query('SELECT COUNT(*) as number FROM post;', function (err, res) {
        if (err) {
          console.log(err);
        } else {
          debugger;
          //  console.log(this);
          let empty = (res[0].number === 0);
          func(empty, true);
          callback(null, empty);
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

module.exports.loadPostData = loadPostData;