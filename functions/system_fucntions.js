var db = require('./connection');
var errors = require('./errors');

module.exports.getFullUser = function (email, callback) {
  if (!email) {
    errors.sendError(3, callback);
  }
  console.log('getFullUser');
  db.query(
    "SELECT about, email, users.id, isAnonymous, name, " +
    "GROUP_CONCAT(DISTINCT f1.followee_email SEPARATOR ', ') AS followers, " +
    "GROUP_CONCAT(DISTINCT f2.follower_email SEPARATOR ', ') AS following, " +
    "GROUP_CONCAT(DISTINCT thread_id SEPARATOR ', ') AS subscriptions, username " +
    "FROM users " +
    "LEFT JOIN subscribers ON email = user_email " +
    "LEFT JOIN followers AS f1 ON f1.follower_email = email " +
    "LEFT JOIN followers AS f2 ON f2.followee_email = email " +
    "WHERE email = ? " +
    "GROUP BY email;",
    [email], function (err, res) {
      if (err) {
        console.log(err);
        errors.sendSqlError(err, callback);
      } else {
        if (res) {
          res = Object.assign({}, res[0]);

          if (!res.subscriptions) {
            res.subscriptions = [];
          }
          if (!res.followers) {
            res.followers = [];
          }
          if (!res.following) {
            res.following = [];
          }

          //res = JSON.stringify(res);
       //   console.log(res);
          callback(0, res);
        } else {
          console.log('error_getFullUser');
          callback(1, 'error_getFullUser');
        }
      }
    }
  );
};


module.exports.getMathPath = function (post, callback) {
  if (!post.thread) {
    errors.sendError(3, callback);
  }
  //console.log('get_math_path_calling', post);
  if (!post.parent) {
    db.query('SELECT MAX(path) as max FROM posts WHERE thread_id = ? ORDER BY path;',
      [post.thread], function (err, res) {
        if (err) {
          errors.sendSqlError(err, callback);
        } else { // нашли максимальный сушетсвующий id у постов, увеличили  на 1 и вернули
          if (res[0].max === null) {
            console.log('res = 001');
            callback(0, '001'); // это первый пост, других нет
          } else {
            let path_int = parseInt(res[0].max, 10) + 1;
            console.log(res[0].max);
            console.log('res =', path_int);

            let path = '';
            if (path_int < 10) {
              path = '00' + path_int.toString();
            }
            if (10 <= path_int && path_int < 100) {
              path = '0' + path_int.toString();
            }
            if (100 < path_int) {/*nothing*/
            }
           // console.log('!parent path = ', path);
            callback(0, path);
          }
        }
      });
  } else {
    db.query('SELECT path FROM posts WHERE id = ? and thread_id = ?',
      [post.parent, post.thread],
      function (err, parent) {
        if (err) {
          console.log('get_math_path', err);
        } else {
          if (parent.length === 0) {
            console.log('get_math_path_error', err);
          } else {
            db.query('SELECT MAX(path) as max FROM posts WHERE parent = ? and thread_id = ?',
              [post.parent, post.thread],
              function (err, res) {
                if (err) {
                  console.log('get_math_path_error', err);
                  errors.sendSqlError(err, callback);
                } else {                   //          1.2.23.147.45
                 // console.log('posts = ', res);
                  if (res[0].max === null) { //посты вида 1\002\023\147\045\
                    // если у этого поста еще нет потомков, то сделаем первого потомка
                    callback(0, parent[0].path + '001');
                  } else {
                    //нашли максимального потомка

                    let max_path_int = parseInt(res[0].max) + 1;
                    let path = '';
                    if (max_path_int < 10) {
                      path = '00' + max_path_int.toString();
                    }
                    if (10 <= max_path_int && max_path_int < 100) {
                      path = '0' + max_path_int.toString();
                    }
                    if (100 < max_path_int) {/*nothing*/
                    }
                   // console.log('res =', parent[0].path + path);
                    callback(0, parent[0].path + path);
                  }
                }
              });
          }
        }
      });
  }
}