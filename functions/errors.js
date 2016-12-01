function sendSqlError(err_code, callback) {
  switch (err_code) {
    case 1062:
      callback(5, 'такой юзер уже существует');
      break;
    case 1064:
      callback(3, 'некорректный запрос (семантически)');
      break;
    case 1327:
      callback(3, 'некорректный запрос (семантически)');
      break;
    default:
      callback(4, 'неизвестная ошибка');
      break;
  }
}


var sendError = function (err_code, callback) {
  switch (err_code) {
    case 1:
      callback(1, 'запрашиваемый объект не найден');
      break;
    case 2:
      callback(2, 'невалидный запрос (например, не парсится json)');
      break;
    case 3:
      callback(3, 'некорректный запрос (семантически)');
      break;
    case 4:
      callback(4, 'неизвестная ошибка');
      break;
    case 5:
      callback(5, 'такой юзер уже существует');
      break;
  }
};


module.exports.sendError = sendError;
module.exports.sendSqlError = sendSqlError;
