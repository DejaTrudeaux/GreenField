const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'BookSwap',
});

const checkUser = (obj, callback) => {
// do connection.query to check users table for that username, return that password
  const queryStr = `select password from users where username = '${obj.username}'`;
  connection.query(queryStr, (err, result) => {
    if (result.length) {
      console.log(result[0].password, 'RESULT!!!!!!!!');
      if (err) {
        console.log(err);
        callback(false);
        return;
      }
      if (result[0].password === obj.password) {
        callback(true);
        return;
      }
    }
    callback(false);
  });
// check that password to see if it matches
// if so, return true
// else return false
};

module.exports.checkUser = checkUser;
