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
    if (err) {
      callback(false);
      return;
    } if (result.length) {
      // check that password to see if it matches
      if (result[0].password === obj.password) {
        // if so, return true
        callback(true);
        return;
      }
    }
    // else return false
    callback(false);
  });
};

const signupUser = (obj, callback) => {
  const queryStr = `insert into users (email, username, password) values ('${obj.email}', '${obj.username}', '${obj.password}')`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

const findBook = (number, callback) => {
  const queryStr = `select * from books where isbn = ${number}`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

const addBook = (bookObj, username, callback) => {
  const bookQueryStr = `insert into books (isbn, title, description, author) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}')`;
  // const userQueryStr = `insert into userbooklist ()`
  connection.query(bookQueryStr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  })
  console.log(bookObj, username, 'IN DATABASE!!!!!!!!!!!!!!!!!!');
};

module.exports.checkUser = checkUser;
module.exports.signupUser = signupUser;
module.exports.findBook = findBook;
module.exports.addBook = addBook;
