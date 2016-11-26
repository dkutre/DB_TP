var fs = require('fs');

var file = './log_responses.txt';

function myObjPrintf(data, indent) {
//  console.log('myObjPrintf');
  var tab = '';
  for (let i = 0; i < indent; i++) {
    tab = tab + " ";
  }

  for (property in data) {
    if (typeof(data[property]) === "object") {
      fs.appendFile(file, tab + property + ':\n', (err) => {});
      myObjPrintf(data[property], indent + 2);
    } else {
      if (data[property] != ' = ') {
        fs.appendFile(file, tab + property + ': ' + data[property] + '\n', (err) => {});
      }
    }
  }
}

function response(res) {
  return function (code, response) {
    res.status(200);
    try {
      myObjPrintf(response, 0);
      fs.appendFile(file, '======================================\n', (err) => console.log('printf_err', err));
      res.json({
        "code": code,
        "response": response
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = response;
