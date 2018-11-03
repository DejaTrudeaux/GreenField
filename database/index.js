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
  const queryStr = `select * from userbooklist where isbn_books = ${number}`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

const addBook = (bookObj, sessionUser, callback) => {
  // add book to books table
  const bookQueryStr = `insert into books (ISBN, title, description, author) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}')`;
  const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
  const findBookStr = `select * from books where ISBN = ${bookObj.isbn}`;
  connection.query(findBookStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      if (!result.length) {
        connection.query(bookQueryStr, (err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(result);
          }
        });
      }
      connection.query(userBookQueryStr, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(result);
        }
      });
    }
  });
};

module.exports.checkUser = checkUser;
module.exports.signupUser = signupUser;
module.exports.findBook = findBook;
module.exports.addBook = addBook;
